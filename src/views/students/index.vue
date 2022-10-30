<script setup>
  import { Modal } from "ant-design-vue";
  import { ref, createVNode } from "vue";
  import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

  //ta'lim turi
  const optionsEducationType = ref([
    { value: "Bakalavr" },
    { value: "Magistr" },
  ]);
  //to'lov shakli
  const optionsPaymentForm = ref([
    { value: "Davlat granti" },
    { value: "To'lov-shartnoma" },
  ]);
  //turar joy
  const optionsAccommadation = ref([
    { value: "O'z uyida" },
    { value: "Qarindoshining uyida" },
    { value: "Tanishining uyida" },
    { value: "Ijaradagi uyda" },
    { value: "Talabalar turar joyida" },
  ]);
  //semestr
  const optionsSemestr = ref([
    { value: "1-semestr" },
    { value: "2-semestr" },
    { value: "3-semestr" },
    { value: "4-semestr" },
  ]);
  // ta'lim shakli
  const optionsEducationForm = ref([
    { value: "Kunduzgi" },
    { value: "Qo'shma" },
    { value: "Maxsus sirtqi" },
    { value: "Sirtqi" },
    { value: "Kechki" },
    { value: "Masofaviy" },
    { value: "Ikkinchi oliy (s)" },
    { value: "Ikkinchi oliy (k)" },
  ]);
  // guruh
  const optionsGroup = ref([
    { value: "IO'M_19-2" },
    { value: "MO'M_20-2" },
    { value: "GO'M_21-1" },
    { value: "KO'M_21-3 (r)" },
  ]);
  //o'quv reja
  const optionsTrainingPlan = ref([
    { value: "IO'M_2021-2022" },
    { value: "MO'M_2021-2022" },
    { value: "GO'M_2021-2022" },
    { value: "FO'M_2021-2022" },
    { value: "JIM_2021-2022" },
    { value: "KO'M_2021-2022" },
  ]);
  //jadval talabalar
  const objStudents = [
    {
      id: 1,
      student: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
      sex: "Erkak",
      studentId: 123321123321,
      pasport: "AC0010010",
      specialtyId: 543543,
      paymentForm: "To'lov-shartnoma",
      typeOfEducation: "Bakalavr",
      formOfEducation: "Kunduzgi",
      academicYear: "2021-2022",
      groupName: "JIM_20/2",
      semestr: "2-semestr",
      course: "1-kurs",
      province: "Toshkent viloyati",
      district: "Bo'ka tumani",
      placeOfResidence: "Talabalar turar joyida",
      telNumber: "+998934215645",
    },
    {
      id: 2,
      student: "	NORIMBOYEV XAYOT XAYRULLA O‘G‘LI",
      sex: "Erkak",
      studentId: 123321123321,
      pasport: "AC0010010",
      specialtyId: 543543,
      paymentForm: "Davlat granti",
      typeOfEducation: "Bakalavr",
      formOfEducation: "Kunduzgi",
      academicYear: "2021-2022",
      groupName: "JIM_20/2",
      semestr: "2-semestr",
      course: "1-kurs",
      province: "Toshkent viloyati",
      district: "Bo'ka tumani",
      placeOfResidence: "O'z uyida",
      telNumber: "+998934215645",
    },

    {
      id: 3,
      student: "MUXAMEDEYEV SIYOVUSH MUROD O‘G‘LI",
      sex: "Erkak",
      studentId: 123321123321,
      pasport: "AC0010010",
      specialtyId: 543543,
      paymentForm: "To'lov-shartnoma",
      typeOfEducation: "Bakalavr",
      formOfEducation: "Kunduzgi",
      academicYear: "2021-2022",
      groupName: "JIM_20/2",
      semestr: "2-semestr",
      course: "1-kurs",
      province: "Toshkent viloyati",
      district: "Bo'ka tumani",
      placeOfResidence: "Talabalar turar joyida",
      telNumber: "+998934215645",
    },

    {
      id: 4,
      student: "MO‘MINOV YAXYOBEK SOYIBJON O‘G‘LI",
      sex: "Erkak",
      studentId: 123321123321,
      pasport: "AC0010010",
      specialtyId: 543543,
      paymentForm: "To'lov-shartnoma",
      typeOfEducation: "Bakalavr",
      formOfEducation: "Kunduzgi",
      academicYear: "2021-2022",
      groupName: "JIM_20/2",
      semestr: "2-semestr",
      course: "1-kurs",
      province: "Toshkent viloyati",
      district: "Bo'ka tumani",
      placeOfResidence: "Talabalar turar joyida",
      telNumber: "+998934215645",
    },

    {
      id: 5,
      student: "XAYDARALIYEVA AYSULU ADIL QIZI",
      sex: "Ayol",
      studentId: 123321123321,
      pasport: "AC0010010",
      specialtyId: 543543,
      paymentForm: "To'lov-shartnoma",
      typeOfEducation: "Bakalavr",
      formOfEducation: "Kunduzgi",
      academicYear: "2021-2022",
      groupName: "JIM_20/2",
      semestr: "2-semestr",
      course: "1-kurs",
      province: "Toshkent viloyati",
      district: "Bo'ka tumani",
      placeOfResidence: "Talabalar turar joyida",
      telNumber: "+998934215645",
    },

    {
      id: 6,
      student: "	PARDAYEV BEKZOD JO‘RABEK O‘G‘LI",
      sex: "Erkak",
      studentId: 123321123321,
      pasport: "AC0010010",
      specialtyId: 543543,
      paymentForm: "To'lov-shartnoma",
      typeOfEducation: "Bakalavr",
      formOfEducation: "Kunduzgi",
      academicYear: "2021-2022",
      groupName: "JIM_20/2",
      semestr: "2-semestr",
      course: "1-kurs",
      province: "Toshkent viloyati",
      district: "Bo'ka tumani",
      placeOfResidence: "Talabalar turar joyida",
      telNumber: "+998934215645",
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
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Siz rostdan shu bo'limni o'chirmoqchimisiz?",
      icon: createVNode(ExclamationCircleOutlined),
      content: "",
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",

      onOk() {
        console.log("OK");
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };
</script>

<template>
  <div class="studentListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Talabalar kontengenti</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="fa-solid fa-download me-2"></i>Yuklab olish
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="fa-solid fa-filter me-2"></i>Filtr
              </button>
            </div>
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
            <!-- //ta'lim turi  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsEducationType"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Ta'lim turini tanlang</label>
            </div>

            <!-- //to'lov shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsPaymentForm"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">To'lov shaklini tanlang</label>
            </div>

            <!-- //turar joy  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsAccommadation"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Turar joyni tanlang</label>
            </div>

            <!-- //ta'lim shakli  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsEducationForm"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Ta'lim shaklini tanlang</label>
            </div>

            <!-- //o'quv reja  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsTrainingPlan"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">O'quv rejani tanlang</label>
            </div>

            <!-- //semestr  -->
            <div class="my-2 col-md-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsSemestr"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">Semestrni tanlang</label>
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

            <!-- //izlash  -->
            <div class="my-2 col-md-6 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">F.I.Sh / Pasport / Kod bo'yicha qidirish</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-md-2">
              <button class="btn-search search-color">
                <i class="fa-solid fa-magnifying-glass me-2"></i>Qidirish
              </button>
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
                  <tr class="table-row-student-list">
                    <th>#</th>
                    <th>Talaba</th>
                    <th>Id/Pasport</th>
                    <th>Mutaxassislik</th>
                    <th>Ta'lim turi</th>
                    <th>O'quv yili</th>
                    <th>Semestr</th>
                    <th>Viloyat</th>
                    <th>Yashash joyi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-student-list"
                    v-for="element in objStudents"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      {{ element.student }} <br />
                      {{ element.sex }}
                    </td>
                    <td>
                      {{ element.studentId }} <br />
                      {{ element.pasport }}
                    </td>
                    <td>
                      {{ element.specialtyId }} <br />
                      {{ element.paymentForm }}
                    </td>
                    <td>
                      {{ element.typeOfEducation }} <br />
                      {{ element.formOfEducation }}
                    </td>
                    <td>
                      {{ element.academicYear }} <br />
                      {{ element.groupName }}
                    </td>
                    <td>
                      {{ element.semestr }} <br />
                      {{ element.course }}
                    </td>
                    <td>
                      {{ element.province }} <br />
                      {{ element.district }}
                    </td>
                    <td>
                      {{ element.placeOfResidence }} <br />
                      {{ element.telNumber }}
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
  .studentListPage {
    .table-row-student-list {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px auto 120px 140px 100px 100px 100px 140px 170px;
      @include mobile() {
        grid-template-columns: 50px 200px 120px 140px 100px 100px 100px 140px 170px;
      }
    }
  }

  .contengent-list .content-table {
    th,
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:nth-last-child(1) {
        justify-content: left;
        display: flex;
      }
      &:nth-child(1) {
        display: flex;
        justify-content: left;
      }
    }
  }
</style>
