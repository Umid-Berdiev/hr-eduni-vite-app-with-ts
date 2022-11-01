<script setup lang="ts">
  import { reactive, ref } from "vue";
  import Swal from "sweetalert2";
  import { facultiesList } from "@/utils/api/hei/faculty";

  const nameFaculty = ref("");
  // const nameFacultySort = ref("");

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
    data: [],
  });

  await fetchList();

  async function fetchList(page: number = 1) {
    const res = await facultiesList(page);
    Object.assign(apiData, res);
  }
</script>

<template>
  <div class="facultyPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Fakultet</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="butoon"
                class="btns c-save py-1.5 px-4"
                data-bs-toggle="modal"
                data-bs-target="#myModalFaculty"
              >
                <i class="fa-solid fa-plus me-2"></i>
                <span>Fakultet yaratish</span>
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
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                    <th><strong>Kodi</strong></th>
                    <th><strong>Nomi</strong></th>
                    <th><strong>Turi</strong></th>
                    <th><strong>Action</strong></th>
                    <th><strong>Faol</strong></th>
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
                      <td>
                        <a-checkbox v-model:checked1="checked"></a-checkbox>
                      </td>
                      <td>{{ element.kod }}</td>
                      <td>{{ element.name }}</td>
                      <td>{{ element.type }}</td>
                      <!-- ---------START ACTIONS-------------- -->
                      <td class="gridjs-td">
                        <ul class="list-inline mb-0">
                          <li class="list-inline-item">
                            <div class="edit__project">
                              <a
                                type="text"
                                data-bs-toggle="modal"
                                data-bs-target="#myModalFaculty"
                              >
                                <i class="bx bx-pencil font-size-18"></i>
                              </a>
                            </div>
                          </li>
                          <!-- <li class="list-inline-item">
                          <div class="edit__project">
                            <router-link to="/marketing/list-project">
                              <eva-icon
                                class="icon-md"
                                style="
                                  transform: translateY(-7px);
                                  font-size: 18px;
                                  line-height: 1;
                                  color: green;
                                "
                                name="eye-outline"
                              ></eva-icon>
                            </router-link>
                          </div>
                        </li> -->
                          <li class="list-inline-item">
                            <div class="delete__project">
                              <a
                                class="text-danger"
                                type="danger"
                                @click="onRemove"
                                ><i class="bx bx-trash-alt font-size-18"></i
                              ></a>
                            </div>
                          </li>
                        </ul>
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
              <div v-if="apiData.data.length" class="mt-2">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <span class="page-link"
                        ><i class="mdi mdi-chevron-left"></i
                      ></span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item active">
                      <span class="page-link">
                        2
                        <span class="sr-only">(current)</span>
                      </span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#"
                        ><i class="mdi mdi-chevron-right"></i
                      ></a>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-------------END PAGINATION-------------->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->

    <!-------START MODAL---------------------------------------->
    <FacultyFormModal />
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
