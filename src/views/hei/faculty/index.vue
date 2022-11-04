<script setup lang="ts">
  import { reactive, ref, watch } from "vue";
  import Swal from "sweetalert2";
  import { facultiesList } from "@/utils/api/hei/faculty";
  import { Modal } from "bootstrap";
  import Pagination from "@/components/partials/Pagination.vue";

  const selectedId = ref<number | null>(null);

  //actions delete
  function onRemove() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Aminmisiz?",
        text: "Siz buni qaytara olmaysiz!",
        icon: "warning",
        confirmButtonText: "Ha, o'chirish!",
        cancelButtonText: "Yo'q, bekor qilish!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "O'chirildi!",
            "Xabarni o'chirish muvaffaqiyatli amalga oshirildi!",
            "success"
          );
        }
      });
  }

  // jadval fakultet
  const apiData = reactive({
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
    Object.assign(apiData, res);
  }

  function openFormModal(id: number | null) {
    selectedId.value = id;
    const modal = Modal.getOrCreateInstance("#facultyFormModal");
    modal.show();
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
                <!-- <i class="fa-solid fa-plus me-2"></i> -->
                <VueIconify icon="feather:plus" class="me-2" />
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
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-fakulty">
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
                    <th>
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
                      class="table-row-fakulty"
                      v-for="element in apiData.data"
                      :key="element.id"
                    >
                      <td>{{ element.id }}</td>
                      <td>{{ element.code }}</td>
                      <td>{{ element.name }}</td>
                      <td>{{ element.type }}</td>
                      <!-- ---------START ACTIONS-------------- -->
                      <td class="">
                        <button
                          type="button"
                          class="btn btn-link"
                          @click="openFormModal(element.id)"
                        >
                          <i class="bx bx-pencil font-size-18"></i>
                        </button>
                        <button
                          type="button"
                          class="btn btn-link text-danger"
                          @click="onRemove(element.id)"
                        >
                          <i class="bx bx-trash-alt font-size-18"></i>
                        </button>
                      </td>
                      <!-- ---------END ACTIONS-------------- -->
                      <td>
                        <div class="form-check form-switch my-auto">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked
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
              <!-------------START PAGINATION-------------->
              <Pagination
                v-if="apiData.data.length"
                class="mt-2"
                v-model:current-page="apiData.current_page"
                :links="apiData.links"
              />
              <!-------------END PAGINATION-------------->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->

    <!-------START MODAL---------------------------------------->
    <FacultyFormModal :faculty-id="selectedId" @update:list="fetchList" />
    <!-------END MODAL------------------------------------------>
  </div>
</template>

<style lang="scss">
  @import "/src/assets/scss/_screenDimensions.scss";
  .facultyPage {
    .table-row-fakulty {
      width: 100% !important;
      display: grid;
      grid-gap: 0;
      grid-template-columns: 50px 40px 100px auto 200px 100px 70px;
      @include mobile() {
        grid-template-columns: 50px 40px 100px 200px auto 80px 60px !important;
      }
    }
  }
</style>
