<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from "vue";
  import { useI18n } from "vue-i18n";
  import Swal from "sweetalert2";
  import { Modal } from "bootstrap";
  import { useNotyf } from "@/composable/useNotyf";
  import type { SectionInterface } from "@/utils/interfaces";
  import { sectionsList, sectionTypeList } from "@/utils/api/hei/section";
  import { changeStatus, deleteDepartment } from "@/utils/api/hei/department";

  const selectedId = ref<number | null>(null);
  const { t } = useI18n();
  const notif = useNotyf();
  const isLoading = ref(false);

  const departmentTypeOptions = await sectionTypeList().then((res) => res.data);

  // jadval fakultet
  const apiData: {
    current_page: number;
    data: SectionInterface[];
    links: [];
  } = reactive({
    current_page: 1,
    data: [],
    links: [],
  });

  const apiParams = reactive({
    department_type_id: null,
    name: "",
    page: 1,
  });

  await fetchList();

  watch(
    () => apiData.current_page,
    async (newVal) => {
      if (Number(newVal)) {
        apiParams.page = Number(newVal);
        await fetchList();
      }
    }
  );

  async function fetchList() {
    const res = await sectionsList(apiParams);
    Object.assign(apiData, res.data);
  }

  function openFormModal(id: number | null) {
    selectedId.value = id;
    const modal = Modal.getOrCreateInstance("#sectionFormModal");
    modal.show();
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

  async function onSearch() {
    await fetchList();
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
</script>

<template>
  <div class="sectionPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Hei_section") }}</h5>
          <div class="panel-toggles gap-3">
            <button
              type="button"
              class="btns c-save py-1.5 px-4"
              @click="openFormModal(null)"
            >
              <BIcon icon="plus" />
              <span>{{ $t("Add_section") }}</span>
            </button>
            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
              <BIcon icon="filter" />
              <!-- <i class="fa-solid fa-filter me-2"></i> -->
              {{ $t("Filter") }}
            </button>
            <!-- <div class="buttons">
            </div> -->
            <!-- <div class="filterBlock">
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-select
                  v-model:value="apiParams.department_type_id"
                  :options="departmentTypeOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  allowClear
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Select_type") }}</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-input id="yu" v-model:value="apiParams.name" />
              </a-space>
              <label for="yu">{{ $t("Search_by_name") }}</label>
            </div>
            <div class="my-2 col-xl-2">
              <button type="submit" class="btn-search search-color">
                <i class="fa-solid fa-magnifying-glass me-2"></i>
                {{ $t("Search") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
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
                      <strong>{{ $t("Section_type") }}</strong>
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
                      <td>{{ element.type?.name }}</td>
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
                            @change="updateStatus(element.id)"
                          />
                        </div>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="6" class="py-5">
                        <h5 class="text-center">{{ $t("No_data") }}</h5>
                        <p class="text-center">
                          {{ $t("There_is_no_data_that_match_your_query") }}
                        </p>
                      </td>
                    </tr>
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
    <HeiSectionFormModal
      :section-id="selectedId"
      @update:list="fetchList"
      @close="onModalClose"
    />
    <!-------END MODAL------------------------------------------>
  </div>
</template>

<style lang="scss">
  // @import "/src/assets/scss/_screenDimensions.scss";
  // .sectionPage {
  //   .table-row-division {
  //     display: grid;
  //     width: 100% !important;
  //     grid-gap: 0;
  //     grid-template-columns: 50px 40px 90px auto 300px 80px 60px;
  //     @include mobile() {
  //       grid-template-columns: 50px 40px 90px 200px auto 80px 60px;
  //     }
  //   }
  //   .havola:hover {
  //     cursor: pointer;
  //   }
  // }

  .bg-custom-orange {
    background-color: #e87525;
  }
</style>
