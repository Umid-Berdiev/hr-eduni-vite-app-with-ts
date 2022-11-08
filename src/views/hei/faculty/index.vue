<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import Swal from "sweetalert2";
  import { Modal } from "bootstrap";
  import { useNotyf } from "@/composable/useNotyf";
  import type { FacultyInterface } from "@/utils/interfaces";
  import { facultiesList } from "@/utils/api/hei/faculty";
  import { changeStatus, deleteDepartment } from "@/utils/api/hei/department";

  const selectedId = ref<number | null>(null);
  const { t } = useI18n();
  const notif = useNotyf();
  const isLoading = ref(false);

  // jadval fakultet
  const apiData: {
    current_page: number;
    data: FacultyInterface[];
    links: [];
  } = reactive({
    current_page: 1,
    data: [],
    links: [],
  });

  await fetchList();

  watch(
    () => apiData.current_page,
    async (newVal) => {
      if (Number(newVal)) {
        await fetchList(Number(newVal));
      }
    }
  );

  async function fetchList(page: number = 1) {
    const res = await facultiesList({ page });
    Object.assign(apiData, res.data);
  }

  function openFormModal(id: number | null) {
    selectedId.value = id;
    const modal = Modal.getOrCreateInstance("#facultyFormModal");
    modal.show();
  }

  async function updateStatus(id: number) {
    try {
      isLoading.value = true;
      await changeStatus(id);
      await fetchList();
      notif.success("Data_stored_successfully");
    } catch (error: any) {
      notif.error(error.message);
    } finally {
      isLoading.value = false;
    }
  }

  //actions delete
  async function onRemove(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    try {
      const res = await swalWithBootstrapButtons.fire({
        title: t("Are_you_sure"),
        text: t("Action_irreversible"),
        icon: "warning",
        confirmButtonText: t("Yes, confirm the action!"),
        cancelButtonText: t("No, cancel the action!"),
        showCancelButton: true,
      });

      if (res.isConfirmed) {
        await deleteDepartment(id);
        await fetchList();

        swalWithBootstrapButtons.fire(
          t("Removed"),
          t("Record_deleted_successfully"),
          "success"
        );
      }
    } catch (error: any) {
      swalWithBootstrapButtons.fire(
        t("Something_went_wrong"),
        error.message,
        "error"
      );
    }
  }

  function onModalClose() {
    selectedId.value = null;
  }
</script>

<template>
  <div class="facultyPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Faculty") }}</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="button"
                class="btns c-save py-1.5 px-4"
                @click="openFormModal(null)"
              >
                <BIcon icon="plus" />
                <span>{{ $t("Add_faculty") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <div class="row">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive rounded-4">
              <table class="table">
                <thead
                  v-if="apiData.data.length"
                  class="text-white bg-custom-orange"
                >
                  <tr class="">
                    <th><strong>#</strong></th>
                    <th>
                      <strong>{{ $t("Code") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("Name") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("Type") }}</strong>
                    </th>
                    <th class="text-center">
                      <strong>{{ $t("Action") }}</strong>
                    </th>
                    <th>
                      <strong>{{ $t("Active") }}</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="apiData.data.length">
                    <tr
                      class=""
                      v-for="element in apiData.data"
                      :key="element.id"
                    >
                      <td>{{ element.id }}</td>
                      <td>{{ element.code }}</td>
                      <td>{{ element.name }}</td>
                      <td>{{ element.type }}</td>
                      <!-- ---------START ACTIONS-------------- -->
                      <td class="text-center">
                        <button
                          type="button"
                          class="btn btn-sm btn-link"
                          @click="openFormModal(element.id)"
                        >
                          <!-- <i class="bx bx-pencil font-size-18"></i> -->
                          <BIcon icon="pencil" />
                        </button>
                        <button
                          type="button"
                          class="btn btn-sm btn-link"
                          @click="onRemove(element.id)"
                        >
                          <!-- <i class="bx bx-trash-alt font-size-18"></i> -->
                          <BIcon icon="trash" color="danger" />
                        </button>
                      </td>
                      <!-- ---------END ACTIONS-------------- -->
                      <td>
                        <div class="form-check form-switch my-auto">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            :checked="element.status"
                            :disabled="isLoading"
                            @change="updateStatus(element.id)"
                          />
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <div class="py-5">
                      <h5 class="text-center">{{ $t("No_data") }}</h5>
                      <p class="text-center">
                        {{ $t("There_is_no_data_that_match_your_query") }}
                      </p>
                    </div>
                  </template>
                </tbody>
              </table>
            </div>
            <!-------------START PAGINATION-------------->
            <Pagination
              v-if="apiData.data.length"
              class="mt-2"
              v-bind="{ ...apiData }"
              v-model:current-page="apiData.current_page"
            />
            <!-------------END PAGINATION-------------->
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->

    <!-------START MODAL---------------------------------------->
    <FacultyFormModal
      :faculty-id="selectedId"
      @update:list="fetchList"
      @close="onModalClose"
    />
    <!-------END MODAL------------------------------------------>
  </div>
</template>

<style lang="scss">
  // @import "/src/assets/scss/_screenDimensions.scss";
  // .facultyPage {
  //   .table-row-fakulty {
  //     width: 100% !important;
  //     display: grid;
  //     grid-gap: 0;
  //     grid-template-columns: 50px 40px 100px auto 200px 100px 70px;
  //     @include mobile() {
  //       grid-template-columns: 50px 40px 100px 200px auto 80px 60px !important;
  //     }
  //   }
  // }
  .bg-custom-orange {
    background-color: #e87525;
  }
</style>
