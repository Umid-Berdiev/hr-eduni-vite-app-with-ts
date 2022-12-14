<script setup lang="ts">
  import { onMounted, reactive, ref, watchEffect } from "vue";
  import { useI18n } from "vue-i18n";
  import { Modal } from "bootstrap";
  import { useNotyf } from "@/composable/useNotyf";
  import {
    createCathedra,
    updateCathedraById,
    facultiesList,
  } from "@/utils/api/hei/cathedra";
  import { fetchDepartmentById } from "@/utils/api/hei/department";

  const props = defineProps({
    cathedraId: null,
  });

  const emits = defineEmits<{
    (e: "update:list"): void;
    (e: "close"): void;
  }>();

  const { t } = useI18n();
  const notif = useNotyf();
  const isLoading = ref(false);

  const facultyOptions = await facultiesList().then((res) => res.data);

  const formData = reactive({
    name: "",
    code: "",
    department_id: null,
  });

  const errors = reactive({
    name: [],
    code: [],
    department_id: [],
  });
  const modal = ref<Element>();

  onMounted(() => {
    const modalEl = document.getElementById("cathedraFormModal") as Element;
    modalEl?.addEventListener("hidden.bs.modal", (event) => {
      // do something...
      clearFields();
      clearErrors();
      emits("close");
    });
  });

  watchEffect(async () => {
    if (props.cathedraId) {
      const res = await fetchDepartmentById(props.cathedraId);
      Object.assign(formData, res.data);
    }
  });

  async function onSubmit() {
    try {
      isLoading.value = true;
      clearErrors();
      const res = props.cathedraId
        ? await updateCathedraById(props.cathedraId, formData)
        : await createCathedra(formData);
      Object.assign(formData, res);
      notif.success(t("Data_stored_successfully"));
      emits("update:list");
      closeModal();
    } catch (error: any) {
      Object.assign(errors, error.response?.data?.message);
      notif.error(t("Failed") + ": " + error.message);
    } finally {
      isLoading.value = false;
    }
  }

  function clearFields() {
    Object.assign(formData, {
      name: "",
      code: "",
      department_id: null,
    });
  }

  function clearErrors() {
    Object.assign(errors, {
      name: [],
      code: [],
      department_id: [],
    });
  }

  function closeModal() {
    const modal = Modal.getOrCreateInstance("#cathedraFormModal");
    modal.hide();
  }
</script>

<template>
  <div
    id="cathedraFormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="cathedraFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="cathedraFormModalLabel">
            <span>{{ $t("Add_faculty") }}</span>
          </h5>
          <button type="button" class="btn btn-sm btn-link" @click="closeModal">
            <BIcon icon="x-lg" color="white" />
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="cathedra-faculty" class="form-label fw-bold">
                {{ $t("Select_faculty") }}
              </label>
              <a-select
                id="cathedra-faculty"
                v-model:value="formData.department_id"
                :options="facultyOptions"
                :field-names="{ value: 'id', label: 'name' }"
              >
              </a-select>
            </div>
            <div class="mb-3">
              <label for="cathedra-name" class="form-label fw-bold">
                {{ $t("Name") }}
              </label>
              <a-input
                id="cathedra-name"
                v-model:value="formData.name"
                :placeholder="$t('Enter_name')"
              />
            </div>
            <div class="mb-3">
              <label for="cathedra-code" class="form-label fw-bold">
                {{ $t("Code") }}
              </label>
              <a-input
                id="cathedra-code"
                v-model:value="formData.code"
                :placeholder="$t('Enter_code')"
              />
              <span v-if="errors.code" class="text-danger small">
                {{ errors.code[0] }}
              </span>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-3">
              <button type="button" class="btns c-cancel" @click="closeModal">
                {{ $t("Close") }}
              </button>
              <button type="button" class="btns c-delete" @click="clearFields">
                {{ $t("Clear") }}
              </button>
              <button type="submit" class="btns c-save">
                {{ $t("Save") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ant-select {
    width: 100%;
    border-radius: 10px !important;
  }
</style>
