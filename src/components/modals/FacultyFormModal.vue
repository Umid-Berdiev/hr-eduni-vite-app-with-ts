<script setup lang="ts">
  import { useNotyf } from "@/composable/useNotyf";
  import {
    createFaculty,
    fetchFacultyById,
    updateFacultyById,
    facultyTypesList,
  } from "@/utils/api/hei/faculty";
  import { Modal } from "bootstrap";
  import { onMounted, reactive, ref, watchEffect } from "vue";
  import { useI18n } from "vue-i18n";

  const props = defineProps({
    facultyId: null,
  });

  const emits = defineEmits<{
    (e: "update:list"): void;
    (e: "close"): void;
  }>();

  const { t } = useI18n();
  const notif = useNotyf();
  const isLoading = ref(false);
  const facultyTypeOptions = await facultyTypesList().then((res) => res.data);

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

  onMounted(() => {
    const modalEl = document.getElementById("facultyFormModal") as Element;
    modalEl?.addEventListener("hidden.bs.modal", (event) => {
      clearFields();
      clearErrors();
      emits("close");
    });
  });

  watchEffect(async () => {
    if (props.facultyId) {
      const res = await fetchFacultyById(props.facultyId);
      Object.assign(formData, res);
    }
  });

  const onFinish = async (values: FormData) => {
    try {
      isLoading.value = true;
      clearErrors();
      const res = props.facultyId
        ? await updateFacultyById(props.facultyId, values)
        : await createFaculty(values);
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
  };

  const onFinishFailed = (errorInfo: string) => {
    console.log({ errorInfo });
  };

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
    const modal = Modal.getOrCreateInstance("#facultyFormModal");
    modal.hide();
  }
</script>

<template>
  <div
    id="facultyFormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="facultyFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="facultyFormModalLabel">
            <span>{{ $t("Add_faculty") }}</span>
          </h5>
          <button type="button" class="btn btn-sm btn-link" @click="closeModal">
            <BIcon icon="x-lg" color="white" />
            <!-- <i class="bi bi-x"></i> -->
          </button>
        </div>
        <div class="modal-body">
          <a-form
            layout="vertical"
            :model="formData"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              class="mb-3"
              name="name"
              :label="$t('Name')"
              :rules="[
                { required: true, message: $t('Faculty_name_required') },
              ]"
            >
              <!-- <label for="fakulty-name-input" class="form-label">Nomi</label> -->
              <a-input
                type="text"
                class="select"
                v-model:value="formData.name"
                :placeholder="$t('Enter_faculty_name')"
              />
              <span v-if="errors.name" class="text-danger small">
                {{ errors.name[0] }}
              </span>
            </a-form-item>

            <a-form-item
              class="mb-3"
              name="code"
              :label="$t('Code')"
              :rules="[
                { required: true, message: $t('Faculty_code_required') },
              ]"
            >
              <!-- <label for="fakulty-kod-input" class="form-label">Kodi</label> -->
              <a-input
                type="text"
                class="select"
                v-model:value="formData.code"
                :placeholder="$t('Enter_faculty_code')"
              />
              <span v-if="errors.code" class="text-danger small">
                {{ errors.code[0] }}
              </span>
            </a-form-item>

            <a-form-item
              class="mb-3"
              name="department_type_id"
              :label="$t('Type')"
              :rules="[
                { required: true, message: $t('Faculty_type_required') },
              ]"
            >
              <!-- <label for="fakultet-sort-input" class="form-label">{{
                $t("Type")
              }}</label> -->
              <a-select
                v-model:value="formData.department_type_id"
                :options="facultyTypeOptions"
                style="width: 100%"
                :field-names="{ value: 'id', label: 'name' }"
                :placeholder="$t('Enter_faculty_type')"
              />
              <span v-if="errors.department_type_id" class="text-danger small">
                {{ errors.department_type_id[0] }}
              </span>
            </a-form-item>

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
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
