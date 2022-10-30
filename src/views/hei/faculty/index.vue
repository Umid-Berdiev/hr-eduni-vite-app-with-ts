<script setup>
  import { reactive, ref } from "vue";
  import Swal from "sweetalert2";

  const nameFaculty = ref("");
  // const nameFacultySort = ref("");

  const handleFacultySort = (value) => {
    console.log(value);
    // console.log(nameFacultySort);
  };
  //actions delete
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

  // jadval fakultet
  const tableElement = [
    {
      id: 1,
      kod: "001-001",
      name: "Matematika va informatika",
      type: "Maxalliy",
    },
    {
      id: 2,
      kod: "001-002",
      name: "Pedagogika",
      type: "Maxalliy",
    },
    {
      id: 3,
      kod: "001-003",
      name: "Til va adabiyot",
      type: "Maxalliy",
    },
    {
      id: 4,
      kod: "001-004",
      name: "Gumanitar fanlar",
      type: "Maxalliy",
    },
    {
      id: 5,
      kod: "001-005",
      name: "Sanat va madaniyat",
      type: "Maxalliy",
    },
    {
      id: 6,
      kod: "001-006",
      name: "Tabiiy fanlar",
      type: "Maxalliy",
    },
  ];
  const optionsFacultySorts = ref([
    { value: "Maxalliy" },
    { value: "Qo'shma" },
    { value: "Bo'lim" },
    { value: "Boshqa" },
  ]);
  const formCreatFaculty = reactive({
    nameFaculty: "",
    kodFaculty: "",
    value: undefined,
  });
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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

    <!-------START MODAL---------------------------------------->
    <div
      id="myModalFaculty"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabelFaculty"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Fakultet yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form
              :model="formCreatFaculty"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                class="mb-3"
                name="nameFaculty"
                :rules="[
                  { required: true, message: `Fakultet nomini kiriting!` },
                ]"
              >
                <label for="fakulty-name-input" class="form-label">Nomi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatFaculty.nameFaculty"
                  placeholder="Fakultet nomini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="kodFaculty"
                :rules="[
                  { required: true, message: `Fakultet kodini kiriting!` },
                ]"
              >
                <label for="fakulty-kod-input" class="form-label">Kodi</label>
                <a-input
                  type="text"
                  class="select"
                  v-model:value="formCreatFaculty.kodFaculty"
                  placeholder="Fakultet kodini kiriting"
                />
              </a-form-item>

              <a-form-item
                class="mb-3"
                name="facultySort"
                :rules="[
                  { required: true, message: `Fakultet kodini kiriting!` },
                ]"
              >
                <label for="fakultet-sort-input" class="form-label">Turi</label>
                <a-select
                  autocomplete="off"
                  v-model:value="formCreatFaculty.facultySort"
                  :options="optionsFacultySorts"
                  style="width: 100%"
                  @change="handleFacultySort"
                >
                </a-select>
              </a-form-item>

              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  Yopish
                </button>
                <button class="btns c-delete me-1">O'chirish</button>
                <button class="btns c-save" type="submit">Saqlash</button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL------------------------------------------>

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
                  <tr
                    class="table-row-fakulty"
                    v-for="element in tableElement"
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
                            <a class="text-danger" type="danger" @click="cancel"
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
