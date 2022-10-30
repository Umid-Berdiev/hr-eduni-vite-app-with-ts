<script setup lang="ts">
  import { ref, watch } from "vue";

  const props = defineProps({
    imgUrl: String,
    // defaultScr: String,
  });

  const emits = defineEmits(["input"]);
  const src = ref("/src/assets/images/users/avatar-default.png");
  const fileUrl = ref("");
  const fileEl = ref(null);

  watch(
    () => props.imgUrl,
    (newVal) => {
      if (newVal) src.value = newVal;
    },
    {
      immediate: true,
    }
  );

  function browse() {
    fileEl.value.click();
  }

  function change(e: Event) {
    fileUrl.value = e.target?.files[0];
    emits("input", fileUrl.value);
    let reader = new FileReader();
    reader.readAsDataURL(fileUrl.value);
    reader.onload = (e) => {
      src.value = e.target.result;
    };
  }
</script>

<template>
  <div class="my-profile">
    <input
      type="file"
      accept="image/*"
      class="visually-hidden"
      ref="fileEl"
      @change="change"
    />
    <div class="position-relative inline-block avatar-contenet">
      <img :src="src" class="h-auto w-100 rounded" />
      <div
        class="position-absolute top-0 h-100 w-100 rounded d-flex justify-content-center align-items-center"
      >
        <button type="button" class="btn btn-link" @click="browse()">
          <i class="fa-solid fa-camera fa-5x"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .my-profile {
    .avatar-contenet {
      max-width: 300px;
      button {
        opacity: 0.1;
        transition: 0.4s ease;
        i {
          color: #f97525;
        }
      }
      &:hover {
        button {
          opacity: 1;
        }
      }
    }
  }
</style>
