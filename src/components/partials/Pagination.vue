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
      <template v-for="(link, linkIndex) in links">
        <li
          :class="[
            'page-item',
            link.active && 'active',
            link.url == null && 'disabled',
          ]"
        >
          <button
            class="page-link"
            @click="$emit('update:currentPage', link.label)"
          >
            <span v-html="link.label"></span>
          </button>
        </li>
      </template>
    </ul>
  </nav>
</template>
