<script setup lang="ts">
  import { onMounted, reactive, ref, watchEffect } from "vue";
  import { useI18n } from "vue-i18n";
  import { Modal } from "bootstrap";
  import { useNotyf } from "@/composable/useNotyf";
  import {
    createSection,
    updateSectionById,
    sectionTypeList,
  } from "@/utils/api/hei/section";
  import { fetchDepartmentById } from "@/utils/api/hei/department";

  const props = defineProps({
    sectionId: null,
  });

  const emits = defineEmits<{
    (e: "update:list"): void;
    (e: "close"): void;
  }>();

  const { t } = useI18n();
  const notif = useNotyf();
  const isLoading = ref(false);

  const departmentTypeOptions = await sectionTypeList().then((res) => res.data);

  const formData = reactive({
    name: "",
    code: "",
    department_type_id: null,
  });

  const errors = reactive({
    name: [],
    code: [],
    department_type_id: [],
  });
  const modal = ref<Element>();

  onMounted(() => {
    const modalEl = document.getElementById("sectionFormModal") as Element;
    modalEl?.addEventListener("hidden.bs.modal", (event) => {
      // do something...
      clearFields();
      clearErrors();
      emits("close");
    });
  });

  watchEffect(async () => {
    if (props.sectionId) {
      const res = await fetchDepartmentById(props.sectionId);
      Object.assign(formData, res.data);
    }
  });

  async function onSubmit() {
    try {
      isLoading.value = true;
      clearErrors();
      const res = props.sectionId
        ? await updateSectionById(props.sectionId, formData)
        : await createSection(formData);
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
      department_type_id: null,
    });
  }

  function clearErrors() {
    Object.assign(errors, {
      name: [],
      code: [],
      department_type_id: [],
    });
  }

  function closeModal() {
    const modal = Modal.getOrCreateInstance("#sectionFormModal");
    modal.hide();
  }
</script>

<template>
  <div
    id="sectionFormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="sectionFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="sectionFormModalLabel">
            <span>{{ $t("Add_section") }}</span>
          </h5>
          <button type="button" class="btn btn-sm btn-link" @click="closeModal">
            <BIcon icon="x-lg" color="white" />
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="section-type" class="form-label fw-bold">
                {{ $t("Select_type") }}
              </label>
              <a-select
                id="section-type"
                v-model:value="formData.department_type_id"
                :options="departmentTypeOptions"
                :field-names="{ value: 'id', label: 'name' }"
              >
              </a-select>
              <span v-if="errors.department_type_id" class="text-danger small">
                {{ errors.department_type_id[0] }}
              </span>
            </div>
            <div class="mb-3">
              <label for="section-name" class="form-label fw-bold">
                {{ $t("Name") }}
              </label>
              <a-input
                id="section-name"
                v-model:value="formData.name"
                :placeholder="$t('Enter_name')"
              />
              <span v-if="errors.name" class="text-danger small">
                {{ errors.name[0] }}
              </span>
            </div>
            <div class="mb-3">
              <label for="section-code" class="form-label fw-bold">
                {{ $t("Code") }}
              </label>
              <a-input
                id="section-code"
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
