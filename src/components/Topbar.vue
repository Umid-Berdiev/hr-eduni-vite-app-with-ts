<!-- <script lang="ts">
  document.body.setAttribute("data-topbar", "light");
  document.body.removeAttribute("data-layout-size", "boxed");
</script> -->

<script setup lang="ts">
  import { ref, watch } from "vue";
  import { SimpleBar } from "simplebar-vue3";
  import LocaleSwitcher from "./LocaleSwitcher.vue";
  import UserProfileDropdown from "./dropdowns/UserProfileDropdown.vue";

  // const props = defineProps({
  //   type: {
  //     type: String,
  //     required: true,
  //   },
  //   layoutScrollable: {
  //     type: Boolean,
  //     required: true,
  //   },
  // });

  // const text = ref(null);
  // const flag = ref(null);
  // const value = ref(null);

  // watch(
  //   () => props.type,
  //   function (newVal, oldVal) {
  //     if (newVal !== oldVal) {
  //       switch (newVal) {
  //         case "dark":
  //           document.body.setAttribute("data-topbar", "dark");
  //           break;
  //         case "light":
  //           document.body.setAttribute("data-topbar", "light");
  //           document.body.removeAttribute("data-layout-size", "boxed");
  //           break;
  //         default:
  //           document.body.setAttribute("data-topbar", "dark");
  //           break;
  //       }
  //     }
  //   },
  //   { immediate: true }
  // );

  // watch(
  //   () => props.layoutScrollable,
  //   function (newVal, oldVal) {
  //     if (newVal !== oldVal) {
  //       switch (newVal) {
  //         case false:
  //           document.body.setAttribute("data-layout-scrollable", "false");
  //           break;
  //         case true:
  //           document.body.setAttribute("data-layout-scrollable", "true");
  //           break;
  //         default:
  //           document.body.setAttribute("data-layout-scrollable", "false");
  //           break;
  //       }
  //     }
  //   },
  //   { immediate: true }
  // );

  // function toggleRightSidebar() {
  //   this.$parent.toggleRightSidebar();
  // }

  // function logout() {
  //   if (import.meta.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  //     this.authLogout().then(() => {
  //       this.$router.push(
  //         this.$route.query.redirectFrom || {
  //           name: "login",
  //         }
  //       );
  //     });
  //   } else if (import.meta.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
  //     this.authFakeLogout().then(() => {
  //       this.$router.push(
  //         this.$route.query.redirectFrom || {
  //           name: "login",
  //         }
  //       );
  //     });
  //   }
  // }

  // function toggleMenu() {
  //   this.$parent.toggleMenu();
  // }
</script>

<template>
  <header id="page-topbar" class="isvertical-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link to="/" class="logo logo-dark">
            <span class="logo-sm">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
            <span class="logo-lg">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
          </router-link>

          <router-link to="/" class="logo logo-light">
            <span class="logo-lg">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
            <span class="logo-sm">
              <img
                src="/src/assets/images/logo-eduni-mini.png"
                alt=""
                height="22"
              />
            </span>
          </router-link>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item vertical-menu-btn topnav-hamburger"
          @click="$emit('toggleMenu')"
        >
          <span class="hamburger-icon open">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div class="d-none d-sm-block ms-3 align-self-center">
          <h4 class="page-title">{{ $t("rolName") }}</h4>
        </div>
      </div>

      <div class="d-flex">
        <LocaleSwitcher />

        <!-- --------START FOIDALANUVCHI ROLLARI---------------- -->
        <div class="dropdown d-none d-lg-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <eva-icon class="icon-sm" name="grid-outline"></eva-icon>
          </button>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="m-0 font-size-15">Foydalanuvchi rollari</h5>
                </div>
              </div>
            </div>
            <div class="px-lg-4 pb-2">
              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img src="/src/assets/images/brands/kadr.png" alt="kadr" />
                    <span>Kadrlar bo'limi</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/super-admin.png"
                      alt="super-adimi"
                    />
                    <span>Super Adminstrator</span>
                  </a>
                </div>
              </div>
              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/bugalteria.jpg"
                      alt="dribbble"
                    />
                    <span>Bugalteriya</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/doctarantura.png"
                      alt="dropbox"
                    />
                    <span>Doktarantura bo'limi</span>
                  </a>
                </div>
              </div>
              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/ilmiy-bolim.png"
                      alt="mail_chimp"
                    />
                    <span>Ilmiy bo'lim</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/marketing.png"
                      alt="slack"
                    />
                    <span>Marketing</span>
                  </a>
                </div>
              </div>
              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/oquv-bolim.png"
                      alt="mail_chimp"
                    />
                    <span>O'quv bo'limi</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/teacher.png"
                      alt="slack"
                    />
                    <span>O'qituvchi</span>
                  </a>
                </div>
              </div>
              <div class="row g-0">
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/kafedra-mudiri.png"
                      alt="mail_chimp"
                    />
                    <span>Kafedra mudiri</span>
                  </a>
                </div>
                <div class="col">
                  <a class="dropdown-icon-item" href="#!">
                    <img
                      src="/src/assets/images/brands/raxbariyat.png"
                      alt="slack"
                    />
                    <span>Raxbariyat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ----------END FOIDALANUVCHI ROLLARI---------------- -->

        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon"
            id="page-header-notifications-dropdown-v"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <eva-icon class="icon-sm" name="bell-outline"></eva-icon>
            <span class="noti-dot bg-danger rounded-pill">3</span>
          </button>

          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
            aria-labelledby="page-header-notifications-dropdown-v"
          >
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="m-0 font-size-15">Bildirishnomalar</h5>
                </div>
              </div>
            </div>
            <SimpleBar data-simplebar style="max-height: 250px">
              <a href="#!" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <img
                      src="/src/assets/images/users/avatar-3.jpg"
                      class="rounded-circle avatar-sm"
                      alt="user-pic"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Sarvar Abdumuminov</h6>
                    <div class="font-size-13 text-muted">
                      <p class="mb-1">Yakunylar jadvali qachon chiqariladi.</p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i>
                        <span>1 soat oldin</span>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="#!" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <img
                      src="/src/assets/images/users/avatar-5.jpg"
                      class="rounded-circle avatar-sm"
                      alt="user-pic"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Gulmira Abdumuminova</h6>
                    <div class="font-size-13 text-muted">
                      <p class="mb-1">
                        M.Oʻ.M 19/1 guruh talabalari uchun shanba kuni quyilgan
                        4 paralik darsni oʻzgartirishlarizni soʻrayman.
                      </p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i>
                        <span>1 soat oldin</span>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
              <a href="#!" class="text-reset notification-item">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <img
                      src="/src/assets/images/users/avatar-1.jpg"
                      class="rounded-circle avatar-sm"
                      alt="user-pic"
                    />
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">Shodiya Abdumuminova</h6>
                    <div class="font-size-13 text-muted">
                      <p class="mb-1">Yakunylar jadvali qachon chiqariladi.</p>
                      <p class="mb-0">
                        <i class="mdi mdi-clock-outline"></i>
                        <span>1 soat oldin</span>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </SimpleBar>
            <div class="p-2 border-top d-grid">
              <a
                class="btn btn-sm btn-link font-size-14 btn-block text-center"
                href="javascript:void(0)"
              >
                <i class="uil-arrow-circle-right me-1"></i>
                <span>Ko'proq ko'rish..</span>
              </a>
            </div>
          </div>
        </div>

        <!-- <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle toggle-right"
            id="right-bar-toggle-v"
            @click="toggleRightSidebar"
          >
            <eva-icon
              class="icon-sm toggle-right"
              name="settings-outline"
            ></eva-icon>
          </button>
        </div> -->

        <UserProfileDropdown />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .language-switch {
    button {
      display: inline-flex;
      align-items: center;
      img {
        width: 24px;
        height: auto;
        margin-right: 6px;
      }
      span {
        text-transform: uppercase;
        font-weight: 600;
        color: #000;
      }
    }
  }
</style>
