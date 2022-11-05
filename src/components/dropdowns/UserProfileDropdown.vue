<script setup lang="ts">
  import { useRouter } from "vue-router";
  import { useUserStore } from "@/stores/user";

  const router = useRouter();
  const { logoutUser, getUser } = useUserStore();

  async function logout() {
    await logoutUser();
    location.replace("/auth/login");
  }
</script>

<template>
  <div class="dropdown d-inline-block">
    <button
      type="button"
      class="btn header-item user text-start d-flex align-items-center"
      id="page-header-user-dropdown-v"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <img
        class="rounded-circle header-profile-user"
        src="/src/assets/images/users/avatar-6.jpg"
        alt="Header Avatar"
      />
    </button>
    <div class="dropdown-menu dropdown-menu-end pt-0">
      <div class="p-3 border-bottom">
        <h6 class="mb-0">
          {{ getUser?.fullname }}
        </h6>
        <p class="mb-0 font-size-11 text-muted">
          {{ getUser?.email }}
        </p>
      </div>
      <router-link class="dropdown-item" to="/profile"
        ><i
          class="mdi mdi-account-circle text-muted font-size-16 align-middle me-1"
        ></i>
        <span class="align-middle">Profile</span></router-link
      >
      <router-link class="dropdown-item" to="/messages/index"
        ><i
          class="mdi mdi-message-text-outline text-muted font-size-16 align-middle me-1"
        ></i>
        <span class="align-middle">Messages</span></router-link
      >
      <router-link class="dropdown-item" to=""
        ><i class="mdi mdi-lock text-muted font-size-16 align-middle me-1"></i>
        <span class="align-middle">Lock screen</span></router-link
      >
      <button class="dropdown-item" @click="logout">
        <i class="mdi mdi-logout text-muted font-size-16 align-middle me-1"></i>
        <span class="align-middle">{{ $t("Logout") }}</span>
      </button>
    </div>
  </div>
</template>
