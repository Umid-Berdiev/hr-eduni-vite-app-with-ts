<script setup lang="ts">
  import Topbar from "@/components/Topbar.vue";
  import Sidebar from "@/components/Sidebar.vue";
  import Footer from "@/components/Footer.vue";
  import { useRouter } from "vue-router";
  import { useLayoutStore } from "@/stores/layout";
  // import Rightsidebar from "@/components/right-sidebar.vue";

  document.body.removeAttribute("data-layout");
  const router = useRouter();
  const {
    // topbar,
    // layoutScrollable,
    leftSidebarType,
    layoutWidth,
    sidebarColor,
  } = useLayoutStore();

  function toggleMenu() {
    var currentSIdebarSize = document.body.getAttribute("data-sidebar-size");
    document.body.classList.toggle("sidebar-enable");
    if (window.screen.width >= 992) {
      // eslint-disable-next-line no-unused-vars
      router.afterEach((routeTo, routeFrom) => {
        document.body.classList.remove("sidebar-enable");
      });
      if (currentSIdebarSize == null) {
        document.body.getAttribute("data-sidebar-size") == null ||
        document.body.getAttribute("data-sidebar-size") == "lg"
          ? document.body.setAttribute("data-sidebar-size", "sm")
          : document.body.setAttribute("data-sidebar-size", "lg");
      } else if (currentSIdebarSize == "md") {
        document.body.getAttribute("data-sidebar-size") == "md"
          ? document.body.setAttribute("data-sidebar-size", "sm")
          : document.body.setAttribute("data-sidebar-size", "md");
      } else {
        document.body.getAttribute("data-sidebar-size") == "sm"
          ? document.body.setAttribute("data-sidebar-size", "lg")
          : document.body.setAttribute("data-sidebar-size", "sm");
      }
    } else {
      // eslint-disable-next-line no-unused-vars
      router.afterEach((routeTo, routeFrom) => {
        document.body.classList.remove("sidebar-enable");
      });
      document.body.classList.remove("vertical-collpsed");
    }
    // this.isMenuCondensed = !this.isMenuCondensed;
  }

  function toggleRightSidebar() {
    document.body.classList.toggle("right-bar-enabled");
  }

  function hideRightSidebar() {
    document.body.classList.remove("right-bar-enabled");
  }
</script>

<template>
  <!-- <div> -->
  <!-- Begin page -->
  <div id="layout-wrapper">
    <Topbar @toggle-menu="toggleMenu" />

    <Sidebar
      :type="leftSidebarType"
      :width="layoutWidth"
      :color="sidebarColor"
      @toggle-menu="toggleMenu"
    />
    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <RouterView v-slot="{ Component, route }">
            <template v-if="Component">
              <Transition mode="out-in">
                <!-- <KeepAlive> -->
                <Suspense>
                  <!-- main content -->
                  <component :is="Component" :key="route.fullPath" />

                  <!-- loading state -->
                  <template #fallback> Loading... </template>
                </Suspense>
                <!-- </KeepAlive> -->
              </Transition>
            </template>
          </RouterView>
        </div>
      </div>
      <Footer />
    </div>
    <!-- <Rightsidebar /> -->
  </div>
  <!-- </div> -->
</template>
