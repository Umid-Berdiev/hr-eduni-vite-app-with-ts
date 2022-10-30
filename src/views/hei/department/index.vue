<script setup>
  import { ref } from "vue";
  import Swal from "sweetalert2";

  //action delete
  function cancel() {
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

  //kafedra jadval
  const objDivision = [
    {
      id: 1,
      kod: "354-001",
      name: "Tasviriy san'at",
      type: "San'atshunoslik",
    },
    {
      id: 2,
      kod: "354-002",
      name: "Fakultetlar'aro ijtimoiy fanlar",
      type: "Gumanitar fanlar",
    },
    {
      id: 3,
      kod: "354-003",
      name: "Milliy g'oya, ma'naviyat asoslari va huquq ta'limi",
      type: "Gumanitar fanlar",
    },
    {
      id: 4,
      kod: "354-004",
      name: "Matematika o'qitish metodikasi va geometriya",
      type: "Matematika va informatika",
    },
    {
      id: 5,
      kod: "354-005",
      name: "Informatika va axborot texnologiyalari",
      type: "Matematika va informatika",
    },
    {
      id: 6,
      kod: "354-006",
      name: "Fizika va astronomiya o'qitish metodikasi",
      type: "Fizika va kimyo",
    },
    {
      id: 7,
      kod: "354-007",
      name: "Genetika va evolutsion biologiya",
      type: "Tabiiy fanlar",
    },
    {
      id: 8,
      kod: "354-008",
      name: "Fakultetlar'aro jismoniy tarbiya",
      type: "Sport va chaqiriqqacha harbiy ta'lim",
    },
    {
      id: 9,
      kod: "354-009",
      name: "Umumkasbiy va ixtisoslik fanlari",
      type: "Turizm",
    },
  ];
  const optionsDepartment = ref([
    { value: "Matematika va informatika" },
    { value: "Pedagogika" },
    { value: "Til va adabiyot" },
    { value: "Gumanitar fanlar" },
    { value: "Sanat va madaniyat" },
    { value: "Tabiiy fanlar" },
  ]);
  // const value = ref("");
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleBlur = () => {
    console.log("blur");
  };

  const handleFocus = () => {
    console.log("focus");
  };

  const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
</script>

<template>
  <div class="departmentPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Kafedra</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="button"
                class="btns c-save py-1.5 px-4 me-3"
                data-bs-toggle="modal"
                data-bs-target="#myModalDivision"
              >
                <i class="fa-solid fa-plus me-2"></i>Kafedra yaratish
              </button>
            </div>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="fa-solid fa-filter me-2"></i>Filtr
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsDepartment"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Fakultetni tanlang</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">Nomi bo'yicha qidirish</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="fa-solid fa-magnifying-glass me-2"></i>Qidirish
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>
    <!-------START MODAL---------------------------------------->
    <div
      id="myModalDivision"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Kafedra yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form>
              <div class="mb-1">
                <label for="division-name-select" class="form-label"
                  >Fakultetni tanlang</label
                >
                <a-select
                  v-model:value="value"
                  :options="optionsDepartment"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </div>
              <div class="mb-1">
                <label for="division-name-input" class="form-label">Nomi</label>
                <a-input
                  v-model:value="value2"
                  placeholder="Kafedra nomini kiriting"
                />
              </div>
              <div class="mb-3">
                <label for="division-kod-input" class="form-label">Kod</label>
                <a-input
                  v-model:value="value3"
                  placeholder="Kafedra kodini kiriting"
                />
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  Yopish
                </button>
                <button class="btns c-delete me-1">O'chirish</button>
                <button class="btns c-save">Saqlash</button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-division">
                    <th>#</th>
                    <th>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                    <th>Kod</th>
                    <th>Nomi</th>
                    <th>Fakultet</th>
                    <th>Actions</th>
                    <th>Faol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-division"
                    v-for="element in objDivision"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.kod }}</td>
                    <td>
                      <span
                        class="havola"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalDivision"
                        >{{ element.name }}</span
                      >
                    </td>
                    <td>{{ element.type }}</td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <a
                              type="text"
                              data-bs-toggle="modal"
                              data-bs-target="#myModalDivision"
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
                            <a class="text-danger" type="danger" @click="cancel"
                              ><i class="bx bx-trash-alt font-size-18"></i
                            ></a>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <!-- ---------END ACTIONS-------------- -->
                    <td>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <div class="mt-2">
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
  </div>
</template>

<style lang="scss">
  @import "/src/assets/scss/_screenDimensions.scss";
  .departmentPage {
    .table-row-division {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px 40px 90px auto 300px 80px 60px;
      @include mobile() {
        grid-template-columns: 50px 40px 90px 200px auto 80px 60px;
      }
    }
    .havola:hover {
      cursor: pointer;
    }
  }
</style>
