<script setup lang="ts">
  defineProps({
    loading: false,
  });
</script>

<template>
  <button type="submit" class="btns c-save" :disabled="loading">
    <span
      class="spinner-border spinner-border-sm me-1"
      role="status"
      aria-hidden="true"
      v-if="loading"
    ></span>
    <slot>
      {{ $t("Save") }}
    </slot>
  </button>
</template>
