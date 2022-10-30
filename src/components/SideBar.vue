<script setup lang="ts">
  import { onMounted, reactive, ref, watch } from "vue";
  import MetisMenu from "metismenujs/dist/metismenujs";
  import { SimpleBar } from "simplebar-vue3";
  import { useRoute } from "vue-router";

  const props = defineProps({
    isCondensed: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  });
  const emits = defineEmits(["toggleMenu"]);

  const settings = reactive({
    minScrollbarLength: 60,
  });

  const route = useRoute();
  const isSimplebar = ref(null);

  watch(
    () => route,
    (newVal) => {
      onRouteChange();
    },
    { immediate: true, deep: true }
  );

  watch(
    () => props.type,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        switch (newVal) {
          case "default":
            document.body.setAttribute("data-sidebar-size", "lg");
            break;
          case "compact":
            document.body.setAttribute("data-sidebar-size", "md");
            document.body.classList.remove("vertical-collpsed");
            break;
          case "icon":
            document.body.setAttribute("data-sidebar-size", "sm");
            break;
          default:
            document.body.setAttribute("data-sidebar-size", "lg");
            break;
        }
      }
    },
    { immediate: true }
  );

  watch(
    () => props.width,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        switch (newVal) {
          case "boxed":
            document.body.setAttribute("data-layout-size", "boxed");
            break;
          case "fluid":
            document.body.setAttribute("data-layout-size", "fluid");
            break;
          default:
            document.body.setAttribute("data-layout-size", "fluid");
            break;
        }
      }
    },
    { immediate: true }
  );

  watch(
    () => props.color,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        switch (newVal) {
          case "light":
            document.body.setAttribute("data-sidebar", "light");
            break;
          case "dark":
            document.body.setAttribute("data-sidebar", "dark");
            break;
          case "brand":
            document.body.setAttribute("data-sidebar", "brand");
            break;
          default:
            document.body.setAttribute("data-sidebar", "dark");
            break;
        }
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    // eslint-disable-next-line no-unused-vars
    let menuRef;
    if (document.getElementById("side-menu"))
      menuRef = new MetisMenu("#side-menu");
    const links = document.getElementsByClassName("side-nav-link-ref");
    let matchingMenuItem = null;
    const paths = [];

    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]["pathname"]);
    }

    const itemIndex = paths.indexOf(window.location.pathname);

    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf("/");
      const item = window.location.pathname.substr(0, strIndex).toString();
      matchingMenuItem = links[paths.indexOf(item)];
    } else {
      matchingMenuItem = links[itemIndex];
    }

    if (matchingMenuItem) {
      // matchingMenuItem.classList.add("active");
      const parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      // if (parent) {
      //   parent.classList.add("mm-active");
      //   const parent2 = parent.parentElement.closest("ul");
      //   if (parent2 && parent2.id !== "side-menu") {
      //     parent2.classList.add("mm-show");

      //     const parent3 = parent2.parentElement;
      //     if (parent3) {
      //       parent3.classList.add("mm-active");
      //       const childAnchor = parent3.querySelector(".has-arrow");
      //       const childDropdown = parent3.querySelector(".has-dropdown");
      //       if (childAnchor) childAnchor.classList.add("mm-active");
      //       if (childDropdown) childDropdown.classList.add("mm-active");

      //       const parent4 = parent3.parentElement;
      //       if (parent4 && parent4.id !== "side-menu") {
      //         parent4.classList.add("mm-show");
      //         const parent5 = parent4.parentElement;
      //         if (parent5 && parent5.id !== "side-menu") {
      //           parent5.classList.add("mm-active");
      //           const childanchor = parent5.querySelector(".is-parent");
      //           if (childanchor && parent5.id !== "side-menu") {
      //             childanchor.classList.add("mm-active");
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
    }
  });

  function onRouteChange() {
    // setTimeout(() => {
    //   if (document.getElementsByClassName("mm-active").length > 0) {
    //     const currentPosition =
    //       document.getElementsByClassName("mm-active")[0].offsetTop;
    //     if (currentPosition > 500)
    //       if (isSimplebar.value)
    //         isSimplebar.value.value.getScrollElement().scrollTop =
    //           currentPosition + 300;
    //   }
    // }, 300);
  }

  function toggleMenu() {
    emits("toggleMenu");
  }
</script>

<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <RouterLink to="/" class="logo logo-dark">
        <span class="logo-sm">
          <img src="/src/assets/images/logo-eduni.png" alt="" height="22" />
        </span>
        <span class="logo-lg">
          <img
            src="/src/assets/images/logo-eduni-mini.png"
            alt=""
            height="22"
          />
        </span>
      </RouterLink>

      <RouterLink to="/" class="logo logo-light">
        <span class="logo-lg">
          <img src="/src/assets/images/logo-eduni.png" alt="" height="35" />
        </span>
        <span class="logo-sm">
          <img
            src="/src/assets/images/logo-eduni-mini.png"
            alt=""
            height="30"
          />
        </span>
      </RouterLink>
    </div>

    <button
      type="button"
      class="btn btn-sm px-3 header-item vertical-menu-btn topnav-hamburger"
      @click="toggleMenu"
    >
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <SimpleBar data-simplebar class="sidebar-menu-scroll" ref="isSimplebar">
      <!--- Sidemenu -->
      <div class="d-flex flex-column align-content-between h-100">
        <div id="sidebar-menu">
          <!-- Left Menu Start -->
          <ul class="metismenu list-unstyled" id="side-menu">
            <!-- --------------------START OTM STRUKTURASI--------------------- -->
            <li>
              <a href="javascript: void(0);" class="has-arrow">
                <i class="fa-solid fa-building-columns"></i>
                <span class="menu-item" data-key="t-dashboards">{{
                  $t("sectionName.struktureOfHEI")
                }}</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/hei/about"
                    data-key="t-about"
                  >
                    <i class="fa-solid fa-circle-dot fa-1"></i>
                    {{ $t("About_hei") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/hei/faculty"
                    data-key="t-saas"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Faculty") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/hei/department"
                    data-key="t-sass"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Hei_department") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/hei/division"
                    data-key="t-sass"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Hei_division") }}
                  </RouterLink>
                </li>
              </ul>
            </li>
            <!-- --------------------END OTM STRUKTURASI--------------------- -->

            <!-- --------------------START XODIMLAR--------------------- -->
            <li>
              <a href="javascript: void(0);" class="has-arrow">
                <i class="fa-solid fa-briefcase"></i>
                <span class="menu-item" data-key="t-employee-information">{{
                  $t("sectionName.employeeInfo")
                }}</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/employee-information/employee-data"
                    data-key="t-employee-data"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Employees_base") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/employee-information/employee-list"
                    data-key="t-employee-list"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Employees_list") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/employee-information/teacher-list"
                    data-key="t-teacher-list"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Teacher_list") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/employee-information/employee-status"
                    data-key="t-employee-status"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Employees_status") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/employee-information/scientific-status"
                    data-key="t-scientific-status"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Scientific_status") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/employee-information/foreign-training"
                    data-key="t-foreign-training"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Foreign_training") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/employee-information/foreign-professor"
                    data-key="t-foreign-professor"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Foreign_teachers") }}
                  </RouterLink>
                </li>
              </ul>
            </li>
            <!-- --------------------END XODIMLAR--------------------- -->

            <!-- --------------------START TALABALAR--------------------- -->
            <li>
              <a href="javascript: void(0);" class="has-arrow">
                <i class="fa-solid fa-user-group"></i>
                <span class="menu-item" data-key="t-invoices">{{
                  $t("sectionName.studentInfo")
                }}</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/students/index"
                    data-key="t-invoice-list"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Students_contengent") }}
                  </RouterLink>
                </li>
              </ul>
            </li>
            <!-- --------------------START TALABALAR--------------------- -->

            <!-- --------------------START Akademik arxiv--------------------- -->
            <li>
              <a href="javascript: void(0);" class="has-arrow">
                <i class="fa-solid fa-box-archive"></i>
                <span class="menu-item" data-key="t-contacts">{{
                  $t("sectionName.archive")
                }}</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/archive/diplomas"
                    data-key="t-user-grid"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Diplomas_list") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/archive/circulation-sheet"
                    data-key="t-user-list"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Turnover_sheet") }}
                  </RouterLink>
                </li>
              </ul>
            </li>
            <!-- --------------------START Akademik arxiv--------------------- -->

            <!-- --------------------START xabarlar--------------------- -->
            <li>
              <a href="javascript: void(0);" class="has-arrow">
                <i class="fa-solid fa-envelope"></i>
                <span class="menu-item" data-key="t-messages">{{
                  $t("sectionName.messages")
                }}</span>
              </a>
              <ul class="sub-menu" aria-expanded="false">
                <!-- <li><RouterLink class="side-nav-link-ref" to="/messages/grid" data-key="t-p-grid"><i class="fa-solid fa-circle-dot"></i>Barcha xabarlar</RouterLink></li> -->
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/messages/index"
                    data-key="t-p-messageMyMessages"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("My_messages") }}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    class="side-nav-link-ref"
                    to="/messages/compose"
                    data-key="t-message-compose-new"
                  >
                    <i class="fa-solid fa-circle-dot"></i>
                    {{ $t("Compose_message") }}
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- Sidebar -->

        <div class="p-3 px-4 sidebar-footer">
          <p class="mb-1 main-title">
            {{ new Date().getFullYear() }} &copy; Eduni.
          </p>
        </div>
      </div>
    </SimpleBar>
  </div>
  <!-- Left Sidebar End -->
</template>

<style scoped lang="scss">
  .router-link-exact-active {
    color: #fff !important;
  }
</style>
