<script setup>
  import trashMessage from "./components/trash.vue";
  import draftMessage from "./components/draft.vue";
  import sentMessage from "./components/sent.vue";
  import inboxMessage from "./components/inbox.vue";
  import allMessage from "./components/allMessage.vue";
</script>

<template>
  <div class="myMessagePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Mening xabarlarim</h5>
          <div class="panel-toggles">
            <router-link to="/messages/messageCompose"
              ><button type="submit" class="btns c-save py-1.5 px-4 me-3">
                <i class="fa-solid fa-comment-medical me-2"></i>Xabar yaratish
              </button></router-link
            >
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-search py-1.5 px-4">
                <i class="fa-solid fa-magnifying-glass me-1"></i>Qidirish
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
            <div class="my-2 col-xl-10 form--item">
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

    <!-- -----START MODAL Message-------------------------------------->
    <!-- <div
      id="messageContent"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0 avatar-sm me-3 d-sm-block d-none">
                <img
                  src="/src/assets/images/users/avatar-2.jpg"
                  alt=""
                  class="img-fluid d-block rounded-circle"
                />
              </div>
              <div class="flex-grow-1">
                <h5 class="font-size-16 mb-1 text-truncate">
                  <a href="#" class="text-dark">Jennie Sherlock</a>
                </h5>
              </div>
            </div>
          </div>
          <div class="modal-body">
            <ul class="list-unstyled mb-0">
              <li class="chat-day-title mb-4">
                <div class="lineDate">
                  <span class="title">10.12.2022 // 10:12:23</span>
                </div>
              </li>
              <li>
                <div class="messageDate">
                  <h5>IO'M_19/3 guruhi talabalaridan iltimosnoma</h5>
                  <p>
                    Kimdan: <span><b>Shodiya Abdumuminova</b></span>
                  </p>
                  <p>
                    Kimga: <span><b>Kadrlar bo'limi</b></span>
                  </p>
                </div>
                <div class="ctext-wrap">
                  <div class="ctext-wrap-content">
                    <p class="mb-0">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Libero voluptatem, fugit cum vero officiis obcaecati
                      temporibus iste reprehenderit asperiores? Molestiae.
                    </p>
                  </div>
                </div>
                <hr />
              </li>
            </ul>
            <div class="d-flex justify-content-between">
              <div>
                <button class="btns c-delete me-1">
                  <i class="fa-solid fa-trash-can me-2"></i>O'chirish
                </button>
                <button class="btns application-color">
                  <i class="fa-solid fa-print me-2"></i>Chop etish
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  Yopish
                </button>
                <button v-b-toggle.collapse-3 class="btns c-filter">
                  <i class="fa-solid fa-reply me-2"></i>Javob berish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-------END MODAL Message---------------------------------------->

    <div class="card">
      <!-- Nav tabs -->
      <div class="card-message">
        <ul class="nav nav-tabs nav-tabs-custom nav-justified" role="tablist">
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#tasks" role="tab">
              <i class="fa-solid fa-envelope me-2"></i
              ><span class="icon-text-none">Barcha xabarlar</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link active"
              data-bs-toggle="tab"
              href="#about"
              role="tab"
            >
              <i class="fa-solid fa-inbox me-2"></i
              ><span class="icon-text-none">Kiruvchi xabarlar</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#sent" role="tab">
              <i class="fa-solid fa-envelope me-2"></i
              ><span class="icon-text-none">Jo'natilgan</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              data-bs-toggle="tab"
              href="#messages-draft"
              role="tab"
            >
              <i class="fa-solid fa-file-lines me-2"></i
              ><span class="icon-text-none">Qoralama</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#trash" role="tab">
              <i class="fa-solid fa-trash-can me-2"></i
              ><span class="icon-text-none">Korzina</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- Tab content kiruvchi xabarlar -->
      <div class="tab-content p-4">
        <div class="tab-pane active" id="about" role="tabpanel">
          <div>
            <!-- ------------------start kiruvchi xabarlar---------------------------- -->
            <inbox-message />
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
            <!-- ------------------end kiruvchi xabarlar---------------------------- -->
          </div>
        </div>

        <!-- -----------------------jo'natilgan---------------------------- -->
        <div class="tab-pane" id="sent" role="tabpanel">
          <!-- ------------------start jo'natilgan xabarlar---------------------------- -->
          <sent-message />
          <!-- ------------------end jo'natilgan xabarlar---------------------------- -->
        </div>
        <!-- ----------------------------------------------------------- -->

        <div class="tab-pane" id="tasks" role="tabpanel">
          <div>
            <!--barcha xabarlar-->
            <all-message />
          </div>
        </div>

        <div class="tab-pane" id="messages-draft" role="tabpanel">
          <!-- ------------------start qoralama xabarlar---------------------------- -->
          <draft-message />
          <!-- ------------------end qoralama xabarlar---------------------------- -->
        </div>

        <div class="tab-pane" id="trash" role="tabpanel">
          <!-- ------------------start o'chirilgan xabarlar---------------------------- -->
          <trash-message />
          <!-- ------------------end o'chirilgan xabarlar---------------------------- -->
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="text-center my-3">
          <a href="javascript:void(0);" class="text-success"
            ><i class="bx bx-loader bx-spin font-size-18 align-middle me-2"></i>
            Load more
          </a>
        </div>
      </div>
      <!-- end col-->
    </div>
    <!-- end row -->
  </div>
</template>

<style lang="scss">
  @import "/src/assets/scss/_screenDimensions.scss";
  .myMessagePage {
    .table-row-message {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px 250px auto 120px 50px;
      @include mobile() {
        grid-template-columns: 50px 170px 300px 100px 50px;
      }
    }
  }
</style>
