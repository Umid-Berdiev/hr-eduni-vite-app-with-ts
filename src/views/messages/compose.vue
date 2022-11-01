<script setup>
  import CKEditor from "@ckeditor/ckeditor5-vue";
  import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
  import { ref } from "vue";
  import Layout from "../../layouts/main";

  //table xodimlar
  const objEmployees = [
    {
      id: 1,
      name: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
      department: "Fakultetlar'aro jismoniy tarbiya (Kafedra)",
    },
    {
      id: 2,
      name: "ABDURAXMANOV NIYATULLA ABDULLAYEVICH",
      department: "Buxgalteriya",
    },
    {
      id: 3,
      name: "TADJIBAYEV IKRAM URALBAYEVICH",
      department: "Texnologik ta'lim (Kafedra)",
    },
    {
      id: 4,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      department: "Jismoniy ma'daniyat (Kafedra)",
    },
    {
      id: 5,
      name: "ABDURAXMANOV NIYATULLA ABDULLAYEVICH",
      department: "O'zbek tilshunosligi (Kafedra)",
    },
    {
      id: 6,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      department: "Texnologik ta'lim (Kafedra)",
    },
  ];

  //students
  const objStudents = [
    {
      id: 1,
      name: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
      groupName: "TAR-20/1",
      department: "Fakultetlar'aro jismoniy tarbiya (Kafedra)",
    },
    {
      id: 2,
      name: "ABDURAXMANOV NIYATULLA ABDULLAYEVICH",
      groupName: "TAR-20/1",
      department: "Buxgalteriya",
    },
    {
      id: 3,
      name: "TADJIBAYEV IKRAM URALBAYEVICH",
      groupName: "TAR-20/1",
      department: "Texnologik ta'lim (Kafedra)",
    },
    {
      id: 4,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      groupName: "TAR-20/1",
      department: "Jismoniy ma'daniyat (Kafedra)",
    },
    {
      id: 5,
      name: "ABDURAXMANOV NIYATULLA ABDULLAYEVICH",
      groupName: "TAR-20/1",
      department: "O'zbek tilshunosligi (Kafedra)",
    },
    {
      id: 6,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      groupName: "TAR-20/1",
      department: "Texnologik ta'lim (Kafedra)",
    },
  ];

  //kafedra / bo'lim
  const optionsDepartment = ref([
    { value: "Sport va chaqiriqqacha harbiy ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Buxgalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "O'quv uslubiy boshqarma" },
  ]);
  //guruxlar
  const optionsGroup = ref([
    { value: "TAR-20/1" },
    { value: "TAR-20/1" },
    { value: "TAR-20/1" },
    { value: "TAR-20/1" },
    { value: "TAR-20/1" },
  ]);
  // const showDeleteConfirm = () => {
  //   Modal.confirm({
  //     title: "Siz rostdan shu bo'limni o'chirmoqchimisiz?",
  //     icon: createVNode(ExclamationCircleOutlined),
  //     content: "",
  //     okText: "Ha",
  //     okType: "danger",
  //     cancelText: "Yo'q",

  //     onOk() {
  //       console.log("OK");
  //     },

  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // };
</script>

<template>
  <div class="createMessageList">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Xabar yaratish</h5>
          <div class="panel-toggles">
            <router-link to="/messages/index"
              ><button class="btns c-save py-1.5 px-4" type="button">
                <i class="fa-solid fa-comments me-2"></i>Mening xabarlarim
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <div class="row">
      <div class="col-12">
        <div class="card">
          <div
            class="card-header bg-card-header justify-content-between d-flex align-items-center"
          >
            <h4 class="card-title">Yangi xabar yaratish</h4>
          </div>
          <div class="card-body">
            <a-form>
              <div class="row">
                <div class="col-md-8">
                  <div class="mb-3">
                    <a-input
                      v-model:value="value2"
                      type="text"
                      placeholder="Kimga"
                    />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="mb-3">
                    <button
                      class="btns student-c py-2 px-4 w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#myModalEmployees"
                    >
                      <i class="fa-solid fa-plus me-2"></i>Xodim
                    </button>
                  </div>
                  <!-- <div class="d-flex justify-content-between">
                    
                    
                  </div> -->
                </div>
                <div class="col-md-2">
                  <div class="mb-3">
                    <button
                      class="btns c-save py-2 px-4 w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#myModalStudents"
                    >
                      <i class="fa-solid fa-plus me-2"></i>Talaba
                    </button>
                  </div>
                </div>
                <div class="col-xl-12">
                  <div class="mb-3 mt-3">
                    <a-input
                      v-model:value="value2"
                      type="text"
                      placeholder="Mavzu"
                    />
                  </div>
                </div>
              </div>
            </a-form>
            <!-- Editor -->
            <ckeditor v-model="editorData" :editor="editor"></ckeditor>
            <!-- ----- -->
            <div class="mt-3 d-flex justify-content-between">
              <div>
                <button class="btns c-delete me-1 py-2 my-1">
                  <i class="fa-solid fa-trash-can me-2"></i>O'chirish
                </button>
                <button class="btns black-c py-2 my-1">
                  <i class="fa-solid fa-floppy-disk me-2"></i>Qoralamaga saqlash
                </button>
              </div>
              <div>
                <button
                  v-b-toggle.collapse-3
                  class="btns c-filter py-2 px-4 my-1"
                >
                  <i class="fa-solid fa-paper-plane me-2"></i>Xabarni jo'natish
                </button>
              </div>
            </div>

            <!-------START MODAL-xodim--------------------------------------->
            <div
              id="myModalEmployees"
              class="modal fade"
              tabindex="-1"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-card-header">
                    <h5 class="modal-title" id="myModalLabel">
                      Xodimni tanlang
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div class="modal-body">
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
                        <label for="yu">Kafedra / Bo'limni tanlang</label>
                      </div>
                      <div class="my-2 col-xl-5 form--item">
                        <a-input id="yu" class="form-control" />
                        <label for="yu"
                          >Ism / Pasport / Xodim bo'yicha qidirish</label
                        >
                      </div>
                      <div class="my-2 col-xl-2">
                        <button class="btn-search search-color">
                          <i class="fa-solid fa-magnifying-glass me-2"></i
                          >Qidirish
                        </button>
                      </div>
                    </div>

                    <div class="table-responsive">
                      <table class="content-table">
                        <tr class="table-row-create-message-list">
                          <th><b>#</b></th>
                          <th>
                            <a-checkbox v-model:checked1="checked"></a-checkbox>
                          </th>
                          <th><b>Nomi</b></th>
                          <th><b>Depaartment</b></th>
                        </tr>
                        <tbody>
                          <tr
                            class="table-row-create-message-list"
                            v-for="element in objEmployees"
                            :key="element.id"
                          >
                            <td>{{ element.id }}</td>
                            <td>
                              <a-checkbox
                                v-model:checked1="checked"
                              ></a-checkbox>
                            </td>
                            <td>{{ element.name }}</td>
                            <td>{{ element.department }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- ------------------------------------------------ -->
                    <div class="d-flex justify-content-between">
                      <div>
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
                      <div class="mt-3">
                        <button
                          type="button"
                          class="btns c-cancel me-1"
                          data-bs-dismiss="modal"
                        >
                          Yopish
                        </button>
                        <button class="btns c-save">Qo'shish</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-------END MODAL--xodim-------------------------------------->

            <!-------START MODAL-talaba--------------------------------------->
            <div
              id="myModalStudents"
              class="modal fade"
              tabindex="-1"
              aria-labelledby="myModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header bg-card-header">
                    <h5 class="modal-title" id="myModalLabel">
                      Talabani tanlang
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="my-2 col-xl-5 form--item">
                        <a-space>
                          <a-select
                            v-model:value="value"
                            :options="optionsGroup"
                            @change="handleChange"
                          >
                          </a-select>
                        </a-space>
                        <label for="yu">Guruhni tanlang</label>
                      </div>
                      <div class="my-2 col-xl-5 form--item">
                        <a-input id="yu" class="form-control" />
                        <label for="yu">Nom / Bo'inma bo'yicha qidirish</label>
                      </div>
                      <div class="my-2 col-xl-2">
                        <button class="btn-search search-color">
                          <i class="fa-solid fa-magnifying-glass me-2"></i
                          >Qidirish
                        </button>
                      </div>
                    </div>

                    <div class="table-responsive">
                      <table class="content-table">
                        <tr class="table-row-create-message-list">
                          <th><b>#</b></th>
                          <th>
                            <a-checkbox v-model:checked1="checked"></a-checkbox>
                          </th>
                          <th><b>Nomi</b></th>
                          <th><b>Depaartment</b></th>
                        </tr>
                        <tbody>
                          <tr
                            class="table-row-create-message-list"
                            v-for="element in objStudents"
                            :key="element.id"
                          >
                            <td>{{ element.id }}</td>
                            <td>
                              <a-checkbox
                                v-model:checked1="checked"
                              ></a-checkbox>
                            </td>
                            <td>{{ element.name }}</td>
                            <td>
                              {{ element.groupName }} ({{ element.department }})
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- ------------------------------------------------ -->
                    <div class="d-flex justify-content-between">
                      <div>
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
                      <div class="mt-3">
                        <button
                          type="button"
                          class="btns c-cancel me-1"
                          data-bs-dismiss="modal"
                        >
                          Yopish
                        </button>
                        <button class="btns c-save">Qo'shish</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-------END MODAL---------------------------------------->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "/src/assets/scss/_screenDimensions.scss";
  .createMessageList {
    .table-row-create-message-list {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 40px 50px 40% 60%;
    }
    table {
      th,
      td {
        &:nth-last-child(1) {
          justify-content: start;
        }
      }
    }
    .modal-dialog {
      max-width: $mobile;
    }
  }
</style>
