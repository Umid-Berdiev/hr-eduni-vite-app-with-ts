<script setup lang="ts">
  import { computed, onMounted, reactive, ref, watch, watchEffect } from "vue";
  import { isEmpty } from "lodash";
  import { useI18n } from "vue-i18n";
  import { Modal } from "bootstrap";
  import {
    academicDegreesList,
    academicTitlesList,
    nationsList,
  } from "@/utils/api/additional";
  import {
    countriesList,
    districtsList,
    regionsList,
    citizenshipList,
  } from "@/utils/api/additional";
  import AvatarInput from "../AvatarInput.vue";
  import SubmitButton from "../buttons/SubmitButton.vue";
  import { useNotyf } from "../../composable/useNotyf";
  import { createEmployee, updateEmployee } from "@/utils/api/employee";
  import BaseSelect from "../forms/BaseSelect.vue";
  import BaseInput from "../forms/BaseInput.vue";

  const props = defineProps(["formData"]);
  const emits = defineEmits(["update:formData"]);

  const notif = useNotyf();
  const { t } = useI18n();

  const formState = reactive({
    citizenship_id: "",
    passport_date: "",
    pinfl: "",
    passport_number: "",
    surname: "",
    name: "",
    patronymic: "",
    image: "",
    birthdate: "",
    gender: "",
    address_home: "",
    speciality: "",
    email: "",
    phone: "",
    work_count: "",
    status: "",
    country_id: "",
    region_id: "",
    district_id: "",
    nation_id: "",
    academic_degree_id: "",
    academic_title_id: "",
    recruitment_date: "",
    user_id: "",
  });

  const errors = reactive({
    citizenship_id: [],
    passport_date: [],
    pinfl: [],
    passport_number: [],
    surname: [],
    name: [],
    patronymic: [],
    image: [],
    birthdate: [],
    gender: [],
    address_home: [],
    speciality: [],
    email: [],
    phone: [],
    work_count: [],
    status: [],
    country_id: [],
    region_id: [],
    district_id: [],
    nation_id: [],
    academic_degree_id: [],
    academic_title_id: [],
    recruitment_date: [],
    user_id: [],
  });
  const optionsGender = ref([
    { id: 1, name: t("Male") },
    { id: 2, name: t("Female") },
  ]);
  const optionsAcademicDegree = ref([]);
  const optionsAcademicTitle = ref([]);
  const isLoading = ref(false);

  // fuqorolik
  const optionsCitizenship = ref([]);

  // millat
  const optionsNation = ref([]);

  // davlat
  const optionsCountry = ref([]);

  // viloyat
  const optionsRegion = ref([]);

  // tumanlar
  const optionsDistrict = ref([]);

  const formImage = ref(null);

  watchEffect(() => {
    if (!isEmpty(props.formData)) Object.assign(formState, props.formData);
  });

  watch(
    () => formState.region_id,
    async (newVal) => {
      if (Number(newVal)) {
        await onFetchDistricts(Number(newVal));
      }
    }
  );

  onMounted(async () => {
    const res1 = await academicDegreesList();
    optionsAcademicDegree.value = res1.data;
    const res2 = await academicTitlesList();
    optionsAcademicTitle.value = res2.data;
    const res3 = await nationsList();
    optionsNation.value = res3.data;
    const res4 = await countriesList();
    optionsCountry.value = res4.data;
    const res5 = await regionsList();
    optionsRegion.value = res5.data;
    const res6 = await citizenshipList();
    optionsCitizenship.value = res6.data;
  });

  const onSubmit = async (values: any) => {
    try {
      isLoading.value = true;
      clearAllErrors();

      const formData = new FormData();

      Object.getOwnPropertyNames(formState).forEach((prop) => {
        if (!["id", "image", "citizenship"].includes(prop))
          formData.append(prop, formState[prop]);
      });

      if (typeof formImage.value !== "string")
        formData.append("image", formImage.value);

      formData.append("status", false);
      const res = formState.id
        ? await updateEmployee(formState.id, formData)
        : await createEmployee(formData);
      notif.success(t("Data_stored_successfully"));
      closeModal();
    } catch (error) {
      Object.assign(errors, error.response?.data?.errors);
    } finally {
      isLoading.value = false;
    }
  };

  async function clearFields() {
    Object.getOwnPropertyNames(formState).forEach((prop) => {
      formState[prop] = "";
    });
  }

  async function onFetchDistricts(id: number) {
    const res = await districtsList(id);
    optionsDistrict.value = res.data;
  }

  function closeModal() {
    clearAllErrors();
    const modal = Modal.getInstance("#employeeFormModal");
    modal?.hide();
    const modalEl = document.querySelector(".modal-backdrop");
    modalEl?.classList.remove("show");
  }

  function clearError(field: string) {
    errors[field] = "";
  }

  function clearAllErrors() {
    Object.getOwnPropertyNames(errors).forEach((prop) => {
      errors[prop] = [];
    });
  }
</script>

<template>
  <div
    class="modal fade"
    id="employeeFormModal"
    tabindex="-1"
    aria-labelledby="employeeFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="employeeFormModalLabel">
            {{ $t("Add_employee") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <form :model="formState" @submit.prevent="onSubmit">
            <div class="row">
              <h5 class="modal-title bg-secondary bg-opacity-25 p-2 mb-2">
                {{ $t("Passport_info") }}
              </h5>
              <div class="col-md-3">
                <BaseSelect
                  class="mb-3"
                  v-model:field="formState.citizenship_id"
                  v-model:error-text="errors.citizenship_id[0]"
                  :options="optionsCitizenship"
                  :label-text="$t('Citizenship')"
                />
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">{{
                    $t("When_issued")
                  }}</label>
                  <a-date-picker
                    v-model:value="formState.passport_date"
                    value-format="DD-MM-YYYY"
                    @change="clearError('passport_date')"
                  />
                  <span v-if="errors.passport_date" class="text-danger small">
                    {{ errors.passport_date[0] }}
                  </span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">{{
                    $t("jshshir_kod")
                  }}</label>
                  <a-input
                    v-model:value="formState.pinfl"
                    v-maska="{
                      mask: 'Z*',
                      tokens: { Z: { pattern: /[0-9]/ } },
                    }"
                    @input="clearError('pinfl')"
                  />
                  <span v-if="errors.pinfl" class="text-danger small">
                    {{ errors.pinfl[0] }}
                  </span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">{{
                    $t("Passport_number")
                  }}</label>
                  <a-input
                    v-model:value="formState.passport_number"
                    v-maska="{
                      mask: 'AA0000000',
                      tokens: {
                        A: { pattern: /[A-Z]/, uppercase: true },
                        0: { pattern: /[0-9]/ },
                      },
                    }"
                    @input="clearError('passport_number')"
                  />
                  <span v-if="errors.passport_number" class="text-danger small">
                    {{ errors.passport_number[0] }}
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-2">
                <AvatarInput
                  :img-url="formState.image"
                  @input="formImage = $event"
                />
                <span v-if="errors.image" class="text-danger small">
                  {{ errors.image[0] }}
                </span>
              </div>
              <div class="col-xl-10">
                <div class="row">
                  <div class="col-md-4">
                    <BaseInput
                      class="mb-3"
                      v-model:field="formState.surname"
                      v-model:error-text="errors.surname[0]"
                      :label-text="$t('Surname')"
                    />
                  </div>
                  <div class="col-md-4">
                    <BaseInput
                      class="mb-3"
                      v-model:field="formState.name"
                      v-model:error-text="errors.name[0]"
                      :label-text="$t('Name')"
                    />
                  </div>
                  <div class="col-md-4">
                    <BaseInput
                      class="mb-3"
                      v-model:field="formState.patronymic"
                      v-model:error-text="errors.patronymic[0]"
                      :label-text="$t('Patronymic')"
                    />
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label for="division-name-input" class="form-label">
                        {{ $t("Birthdate") }}
                      </label>
                      <a-date-picker
                        v-model:value="formState.birthdate"
                        value-format="DD-MM-YYYY"
                        @change="clearError('birthdate')"
                      />
                      <span v-if="errors.birthdate" class="text-danger small">
                        {{ errors.birthdate[0] }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <BaseSelect
                      class="mb-3"
                      v-model:field="formState.gender"
                      v-model:error-text="errors.gender[0]"
                      :options="optionsGender"
                      :label-text="$t('Gender')"
                    />
                  </div>
                  <div class="col-md-4">
                    <BaseSelect
                      class="mb-3"
                      v-model:field="formState.nation_id"
                      v-model:error-text="errors.nation_id[0]"
                      :options="optionsNation"
                      :label-text="$t('Nationality')"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <h5 class="modal-title bg-secondary bg-opacity-25 p-2 mb-2">
                {{ $t("Permanent_residence") }}
              </h5>
              <div class="col-md-3">
                <BaseSelect
                  class="mb-3"
                  v-model:field="formState.country_id"
                  v-model:error-text="errors.country_id[0]"
                  :options="optionsCountry"
                  :label-text="$t('Country')"
                />
              </div>
              <div class="col-md-3">
                <BaseSelect
                  class="mb-3"
                  v-model:field="formState.region_id"
                  v-model:error-text="errors.region_id[0]"
                  :options="optionsRegion"
                  :label-text="$t('Region')"
                />
              </div>
              <div class="col-md-3">
                <BaseSelect
                  class="mb-3"
                  v-model:field="formState.district_id"
                  v-model:error-text="errors.district_id[0]"
                  :options="optionsDistrict"
                  :label-text="$t('District')"
                />
              </div>
              <div class="col-md-3">
                <BaseInput
                  class="mb-3"
                  v-model:field="formState.address_home"
                  v-model:error-text="errors.address_home[0]"
                  :label-text="$t('Home_address')"
                />
              </div>
            </div>
            <div class="row">
              <h5 class="modal-title bg-secondary bg-opacity-25 p-2 mb-2">
                {{ $t("Academic_reference") }}
              </h5>
              <div class="col-md-4">
                <BaseInput
                  class="mb-3"
                  v-model:field="formState.speciality"
                  v-model:error-text="errors.speciality[0]"
                  :label-text="$t('Specialty')"
                />
              </div>
              <div class="col-md-4">
                <BaseSelect
                  class="mb-3"
                  v-model:field="formState.academic_degree_id"
                  v-model:error-text="errors.academic_degree_id[0]"
                  :options="optionsAcademicDegree"
                  :label-text="$t('Academic_degree')"
                />
              </div>
              <div class="col-md-4">
                <BaseSelect
                  class="mb-3"
                  v-model:field="formState.academic_title_id"
                  v-model:error-text="errors.academic_title_id[0]"
                  :options="optionsAcademicTitle"
                  :label-text="$t('Academic_title')"
                />
              </div>

              <div class="col-md-4">
                <BaseInput
                  class="mb-3"
                  v-model:field="formState.recruitment_date"
                  v-model:error-text="errors.recruitment_date[0]"
                  :label-text="$t('Employment_year')"
                />
              </div>
              <div class="col-md-4">
                <BaseInput
                  class="mb-3"
                  v-model:field="formState.email"
                  v-model:error-text="errors.email[0]"
                  :label-text="$t('Email')"
                />
              </div>
              <div class="col-md-4">
                <BaseInput
                  class="mb-3"
                  v-model:field="formState.phone"
                  v-model:error-text="errors.phone[0]"
                  :label-text="$t('Phone')"
                />
              </div>
            </div>

            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btns c-cancel me-1"
                data-bs-dismiss="modal"
              >
                {{ $t("Close") }}
              </button>
              <button
                type="button"
                class="btns c-delete me-1"
                @click="clearFields"
              >
                {{ $t("Clear") }}
              </button>
              <SubmitButton :loading="isLoading" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ant-select {
    width: 100%;
    border-radius: 10px !important;
  }
</style>
