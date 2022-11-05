<script setup lang="ts">
  export interface PaginationLinkInterface {
    active: boolean;
    label: string;
    url: string | null;
  }

  export interface PaginationProps {
    current_page: number;
    data: [];
    first_page_url?: string;
    from?: number;
    last_page?: number;
    links: PaginationLinkInterface[];
    next_page_url?: string | null;
    path?: string;
    per_page?: number;
    prev_page_url?: string | null;
    to?: number;
    total?: number;
  }

  const props = withDefaults(defineProps<PaginationProps>(), {
    links: () => [],
    currentPage: 1,
  });
  const emits = defineEmits<{
    (e: "update:currentPage"): void;
  }>();
</script>

<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li :class="['page-item', current_page === 1 && 'disabled']">
        <button class="page-link" @click="$emit('update:currentPage', 1)">
          <BIcon icon="chevron-double-left" />
        </button>
      </li>
      <li :class="['page-item', current_page === 1 && 'disabled']">
        <button
          class="page-link"
          @click="$emit('update:currentPage', current_page - 1)"
        >
          <BIcon icon="chevron-left" />
        </button>
      </li>
      <template v-for="page in last_page">
        <li :class="['page-item', page === current_page && 'active']">
          <button class="page-link" @click="$emit('update:currentPage', page)">
            {{ page }}
          </button>
        </li>
      </template>
      <li :class="['page-item', current_page === last_page && 'disabled']">
        <button
          class="page-link"
          @click="$emit('update:currentPage', current_page + 1)"
        >
          <BIcon icon="chevron-right" />
        </button>
      </li>
      <li :class="['page-item', current_page === last_page && 'disabled']">
        <button
          class="page-link"
          @click="$emit('update:currentPage', last_page)"
        >
          <BIcon icon="chevron-double-right" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
  li.disabled {
    cursor: not-allowed;
  }
</style>
