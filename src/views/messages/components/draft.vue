<script setup>
  import Swal from "sweetalert2";

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
      messageSubject: "IO'M_19/3 guruhi talabalaridan iltimosnoma",
      message:
        "M.Oʻ.M 19/1 guruh talabalari uchun shanba kuni quyilgan 4 paralik darsni oʻzgartirishlarizni soʻrayman. Haftaning boshqa kunlarida bir paralik yoki ikki paralik darslar bor, oʻsha joylarga shanba kuni boʻladigan 4-paradagi inglis tili quyilganda yaxshi boʻlardi.",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 2,
      messageSender: "Gulmira Abdumuminova",
      messageSubject: "MI_20/3 gurux talabasi",
      message: "Yakunylar jadvali qachon chiqariladi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 3,
      messageSender: "Dildora Rahmonova",
      messageSubject: "MI_20/3 gurux talabasi",
      message:
        "Kontraktimmi to'laganman. lekin hemisda to'lnmagan ko'rsatayabdi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
    {
      id: 4,
      messageSender: "Elmira Rushanova",
      messageSubject: "MI_20/3 gurux talabasi",
      message: "Hemisdan olingan ma'lumotnoma hamma joyga o'tadimi",
      messageDate: "12-21-2022 12:00:54",
      messageSenderImageLink: "",
    },
  ];
</script>

<template>
  <div>
    <div class="post-type">
      <h5 class="font-size-16 mb-3">Qoralama</h5>
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
    <div class="table-responsive">
      <table class="content-table">
        <tbody>
          <tr
            class="table-row-message"
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
    </div>
  </div>
</template>
