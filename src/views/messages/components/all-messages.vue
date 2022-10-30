<script setup>
  import Swal from "sweetalert2";
  import { ref } from "vue";

  //xabar turi
  const optionsMessageType = ref([
    { value: "Jo'natilgan" },
    { value: "Qoralama" },
    { value: "Korzina" },
    { value: "Kiruvchi xabarlar" },
  ]);
  // ------------delete modal oyna--------------------
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
  //xabarlar jadvali
  const messeageAll = [
    {
      id: 1,

      messageSender: "Shodiya Abdumuminova",
      messageType: "Qoralama",
      messageSubject: "IO'M_19/3 guruhi talabalaridan iltimosnoma",
      message:
        "M.Oʻ.M 19/1 guruh talabalari uchun shanba kuni quyilgan 4 paralik darsni oʻzgartirishlarizni soʻrayman. Haftaning boshqa kunlarida bir paralik yoki ikki paralik darslar bor, oʻsha joylarga shanba kuni boʻladigan 4-paradagi inglis tili quyilganda yaxshi boʻlardi.",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 2,
      messageSender: "Gulmira Abdumuminova",
      messageType: "Jo'natilgan",
      messageSubject: "MI_20/3 gurux talabasi",
      message: "Yakunylar jadvali qachon chiqariladi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 3,
      messageSender: "Dildora Rahmonova",
      messageType: "Korzina",
      messageSubject: "MI_20/3 gurux talabasi",
      message:
        "Kontraktimmi to'laganman. lekin hemisda to'lnmagan ko'rsatayabdi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 4,
      messageSender: "Elmira Rushanova",
      messageType: "Kiruvchi xabarlar",
      messageSubject: "MI_20/3 gurux talabasi",
      message: "Hemisdan olingan ma'lumotnoma hamma joyga o'tadimi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
  ];
</script>

<template>
  <div>
    <div class="row mb-3 allMessage">
      <div class="col-xl-3">
        <div class="post-type">
          <h5 class="font-size-16 mb-3">Barcha xabarlar</h5>
          <ul class="list-inline">
            <li class="list-inline-item ms-3 number-posts">
              <i class="bx bx-chat me-1 font-size-16 align-middle"></i>
              {{ messeageAll.length }}
            </li>
            <li class="list-inline-item number-posts c-delete">
              <a type="text" @click="cancel"
                ><i class="fa-solid fa-trash-can"></i
              ></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="my-2 col-xl-3 form--item">
        <a-space>
          <a-select
            v-model:value="value"
            :options="optionsMessageType"
            @change="handleChange"
          >
          </a-select>
        </a-space>
        <label for="yu">Xabar turini tanlang</label>
      </div>
    </div>

    <div class="table-responsive">
      <table class="content-table">
        <tbody>
          <tr
            class="table-row-all-message"
            v-for="element in messeageAll"
            :key="element.id"
          >
            <td>
              <div class="form-check font-size-16 text-center">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="tasks-activeCheck2"
                />
                <label
                  class="form-check-label"
                  for="tasks-activeCheck2"
                ></label>
              </div>
            </td>
            <td>
              <!-- ------------------------------ -->
              <div v-if="element.messageSenderImageLink !== ''">
                <div class="avatar-group me-3">
                  <div class="avatar-group-item">
                    <a href="javascript: void(0);" class="d-inline-block">
                      <img
                        :src="element.messageSenderImageLink"
                        alt=""
                        class="rounded-circle avatar-sm"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="avatar-group-item me-3">
                  <a href="javascript: void(0);" class="d-inline-block">
                    <div class="avatar-sm">
                      <span
                        class="avatar-title rounded-circle bg-success text-white font-size-16"
                      >
                        {{ element.messageSender[0] }}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
              <!-- --------------------------------- -->
              <!-- <button
                          class="btns c-save py-1.5 px-4 me-3"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#messageContent"
                        >Xodim qo'shish
                        </button> -->
              <a
                type="text"
                data-bs-toggle="modal"
                data-bs-target="#myModalEmployees"
              >
                {{ element.messageSender }}
              </a>
              <!-- <a
                          type="danger"
                          data-bs-toggle="modal"
                          data-bs-target="#messageContent"
                          ></a
                        > -->
            </td>
            <td>
              <b>{{ element.messageType }}</b>
            </td>

            <td>
              {{ element.messageSubject }} <br />
              {{ element.message }}
            </td>

            <td>{{ element.messageDate }}</td>
            <td class="gridjs-td">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <div class="delete__project">
                    <a class="text-danger" type="danger" @click="cancel"
                      ><i class="bx bx-trash-alt font-size-18"></i
                    ></a>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- ----------------start pagenation-------------------- -->
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
              <a class="page-link" href="#">4</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">5</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">6</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#"
                ><i class="mdi mdi-chevron-right"></i
              ></a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- -----------------end-pagenation--------------------- -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "/src/assets/scss/_screenDimensions.scss";
  .table-row-all-message {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px 250px 150px auto 120px 50px;
    @include mobile() {
      grid-template-columns: 50px 170px 100px 300px 120px 50px;
    }
  }
</style>
