<script setup>
  import { ref } from "vue";
  import Swal from "sweetalert2";

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
        title: "Tasdiqni o'zgartirish?",
        icon: "warning",
        confirmButtonText: "Ha, tasdiqlash!",
        cancelButtonText: "Yo'q, bekor qilish!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "Tasdiq o'zgartirildi!",
            "Tasdiqni o'zgartirish muvaffaqiyatli amalga oshirildi!",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Bekor qilindi",
            "Tasdiqni o'zgartirish bekor qilindi :)",
            "error"
          );
        }
      });
  }
  //ta'lim turi
  const educationType = ref([{ value: "Bakalavr" }, { value: "Magistr" }]);
  //Ta'im shakli
  const educationForm = ref([
    { value: "Kunduzgi" },
    { value: "Kechgi" },
    { value: "Sirtqi" },
    { value: "Ikkinchi oliy ta'lim" },
  ]);
  //o'quv yili
  const optionsEducationYear = ref([
    { value: "2021-2022" },
    { value: "2020-2021" },
    { value: "2019-2020" },
    { value: "2018-2019" },
    { value: "2017-2018" },
  ]);
  //mutaxassisliklar
  const optionsSpecialty = ref([
    { value: "Maktabgacha ta’lim" },
    { value: "Fizika va astronomiya o‘qitish metodikasi" },
    { value: "Boshlang‘ich ta’lim va sport-tarbiyaviy ish" },
    { value: "Maxsus pedagogika, defektologiya (surdopedagogika)" },
    { value: "Maxsus pedagogika, defektologiya (surdopedagogika)" },
    { value: "O‘zbek tili va adabiyoti" },
  ]);
  // fakultetlar
  const optionsFaculty = ref([
    { value: "Gumanitar fanlar" },
    { value: "Pedagogika" },
    { value: "Sport va chaqiriqqacha harbiy ta'lim" },
    { value: "San'atshunoslik" },
    { value: "Maktabgacha ta'lim" },
    { value: "	Fizika va kimyo" },
  ]);
  // guruh
  const optionsGroup = ref([
    { value: "IO'M_19-2" },
    { value: "MO'M_20-2" },
    { value: "GO'M_21-1" },
    { value: "KO'M_21-3 (r)" },
  ]);

  //jadval aylanma varaqa
  const objCirculationSheet = [
    {
      id: 1,
      student: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
      studentId: "123321432234",
      studentStatus: "O'qimoqda",
      academicYear: "2021-2022",
      semestr: "3-semestr",
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      specialtyId: 5435435,
      groupName: "IO'M-20/2",
    },
    {
      id: 2,
      student: "	NORIMBOYEV XAYOT XAYRULLA O‘G‘LI",
      studentId: "123321432234",
      studentStatus: "O'qimoqda",
      academicYear: "2021-2022",
      semestr: "3-semestr",
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      specialtyId: 5435435,
      groupName: "IO'M-20/2",
    },

    {
      id: 3,
      student: "MUXAMEDEYEV SIYOVUSH MUROD O‘G‘LI",
      studentId: "123321432234",
      studentStatus: "Chetlashtirilgan",
      academicYear: "2021-2022",
      semestr: "3-semestr",
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      specialtyId: 5435435,
      groupName: "IO'M-20/2",
    },

    {
      id: 4,
      student: "XAYDARALIYEVA AYSULU ADIL QIZI",
      studentId: "123321432234",
      studentStatus: "Chetlashtirilgan",
      academicYear: "2021-2022",
      semestr: "3-semestr",
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      specialtyId: 5435435,
      groupName: "IO'M-20/2",
    },

    {
      id: 5,
      student: "XAYDARALIYEVA AYSULU ADIL QIZI",
      studentId: "123321432234",
      studentStatus: "O'qimoqda",
      academicYear: "2021-2022",
      semestr: "3-semestr",
      educationType: "Bakalavr",
      educationForm: "Kunduzgi",
      specialtyId: 5435435,
      groupName: "IO'M-20/2",
    },
  ];

  // --------------form-------------------------
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
  //-----------------------------------
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
  <div class="removeCirculationSheetPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/circulation-sheet"
              >Aylanma varaqa /
            </router-link>
            Aylanma varaqa qo'shish
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <button
                v-b-toggle.collapse-3
                class="btns c-filter py-1.5 px-4 me-3"
              >
                <i class="fa-solid fa-filter me-2"></i>Filtr
              </button>
            </div>
            <router-link to="/archive/circulation-sheet"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="fa-solid fa-arrow-left me-2"></i>Ortga
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <!-- //o'quv yili  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsEducationYear"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">O'quv yilini tanlang</label>
            </div>

            <!-- //fakultetlar  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsFaculty"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Fakultetni tanlang</label>
            </div>

            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="educationType"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Ta'lim turini tanlang</label>
            </div>

            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="educationForm"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Talim shaklini tanlang</label>
            </div>

            <!-- //mutaxassislikni  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsSpecialty"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Mutaxassislikni tanlang</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsGroup"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Guruxni tanlang</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-diploma-list">
                    <th>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                    <th>#</th>
                    <th>Talaba</th>
                    <th>O'quv yili</th>
                    <th>Ta'lim turi</th>
                    <th>Ta'lim shakli</th>
                    <th>Mutaxassislik</th>
                    <th>Guruh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-diploma-list"
                    v-for="element in objCirculationSheet"
                    :key="element.id"
                  >
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.id }}</td>
                    <td>
                      {{ element.student }} <br />
                      {{ element.studentId }} / {{ element.studentStatus }}
                    </td>
                    <td>
                      {{ element.academicYear }} <br />
                      {{ element.semestr }}
                    </td>
                    <td>
                      {{ element.educationType }}
                    </td>
                    <td>
                      {{ element.educationForm }}
                    </td>
                    <td>
                      {{ element.specialtyId }}
                    </td>
                    <td>
                      {{ element.groupName }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <div class="mt-2 d-flex justify-content-between">
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
                <div>
                  <button
                    class="btns c-save py-2 px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#myModalStudents"
                  >
                    <i class="fa-solid fa-plus me-2"></i>Qo'shish
                  </button>
                </div>
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
  .removeCirculationSheetPage {
    .table-row-diploma-list {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 40px 50px auto 100px 140px 150px 130px 120px;
      th,
      td {
        &:nth-last-child(1) {
          justify-content: start;
        }
      }
      @include mobile() {
        grid-template-columns: 40px 50px 200px 100px 140px 150px 130px 120px;
      }
    }
  }
</style>
