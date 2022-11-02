<script setup lang="ts">
  import { useNotyf } from "@/composable/useNotyf";
  import { districtsList, regionsList } from "@/utils/api/additional";
  import {
    updateHei,
    fetchHei,
    universityTypesList,
    universityFormsList,
  } from "@/utils/api/hei";
  import type { HeiInterface } from "@/utils/interfaces";
  import { Modal } from "bootstrap";
  import { onMounted, reactive, ref, watch } from "vue";
  import { useI18n } from "vue-i18n";

  // const props = defineProps<{
  //   heiData: HeiInterface;
  // }>();
  const emits = defineEmits(["update"]);
  const notif = useNotyf();
  const { t } = useI18n();
  const isLoading = ref(false);
  const heiData: HeiInterface = reactive({
    name: {
      uz: "",
      ru: "",
      en: "",
    },
  });
  const errors = reactive({});
  const districtOptions = ref([]);
  const regionOptions = await regionsList().then((res) => res.data);
  const optionsHeiType = await universityTypesList().then((res) => res.data);
  const optionsHeiForm = await universityFormsList().then((res) => res.data);

  onMounted(async () => {
    const res1 = await fetchHei();
    Object.assign(heiData, res1);
    // const res2 = await regionsList();
    // regionOptions.value = res2.data;
  });

  watch(
    () => heiData.region_id,
    async function (newVal) {
      if (newVal) {
        const res = await districtsList(newVal);
        districtOptions.value = res.data;
      }
    },
    { immediate: true }
  );

  const onSubmit = async (values: any) => {
    try {
      isLoading.value = true;
      const res = await updateHei(heiData.id, heiData);
      notif.success(t("Data_stored_successfully"));
      emits("update");
      closeModal();
    } catch (error) {
      notif.error(t("Something_went_wrong"));
    } finally {
      isLoading.value = false;
    }
  };

  function closeModal() {
    const modal = Modal.getInstance("#heiEditFormModal");
    modal?.hide();
    // const modalEl = document.querySelector(".modal-backdrop");
    // modalEl?.classList.remove("show");
  }
</script>

<template>
  <div
    id="heiEditFormModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="heiEditFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-card-header">
          <h5 class="modal-title" id="heiEditFormModalLabel">
            {{ $t("Update_hei_info") }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="row">
              <!-- ----otm kod---------- -->
              <div class="col-md-6 mb-3">
                <label for="otm-kod-input" class="form-label">
                  {{ $t("Code") }}
                </label>
                <a-input
                  class="select"
                  type="text"
                  v-model:value="heiData.code"
                  :placeholder="$t('Hei_code')"
                  :disabled="true"
                />
              </div>

              <div class="col-md-6 mb-3">
                <label for="otm-name-input" class="form-label"
                  >{{ $t("Name_uz") }} <sup>⚬</sup></label
                >
                <a-input
                  class="select"
                  type="text"
                  v-model:value="heiData.name.uz"
                  :placeholder="$t('Enter_hei_nameuz')"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="otm-name-input" class="form-label"
                  >{{ $t("Name_ru") }} <sup>⚬</sup></label
                >
                <a-input
                  class="select"
                  type="text"
                  v-model:value="heiData.name.ru"
                  :placeholder="$t('Enter_hei_nameru')"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label for="otm-name-input" class="form-label"
                  >{{ $t("Name_en") }} <sup>⚬</sup></label
                >
                <a-input
                  class="select"
                  type="text"
                  v-model:value="heiData.name.en"
                  :placeholder="$t('Enter_hei_nameen')"
                />
              </div>
              <!-- otm kontakti -->
              <div class="col-md-6 mb-3">
                <label for="otm-name-input" class="form-label">{{
                  $t("Phone")
                }}</label>
                <a-input
                  class="select"
                  type="tel"
                  v-model:value="heiData.contact"
                  placeholder="+998## ###-##-##"
                  v-maska="['+998## ###-##-##', '+998## ###-##-##']"
                />
              </div>
              <div class="col-md-6 mb-3">
                <!-- otm stir -->
                <label for="otm-stir-input" class="form-label">{{
                  $t("STIR")
                }}</label>
                <a-input
                  v-model:value="heiData.stir"
                  type="text"
                  v-maska="{
                    mask: '---------',
                    tokens: { '-': { pattern: /[0-9]/ } },
                  }"
                  class="form-control"
                  :placeholder="$t('Enter_stir')"
                  id="otm-stir-input"
                />
              </div>
              <!-- otm joylashgan hudud  -->
              <div class="col-md-6 mb-3">
                <label for="fakultet-territoy-input" class="form-label">{{
                  $t("Region")
                }}</label>
                <a-select
                  v-model:value="heiData.region_id"
                  :options="regionOptions"
                  show-search
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </div>

              <!-- otm joylashgan shaxar -->
              <div class="col-md-6 mb-3">
                <label for="otm-district-input" class="form-label"
                  >{{ $t("District") }} <sup>⚬</sup></label
                >
                <a-select
                  v-model:value="heiData.district_id"
                  :options="districtOptions"
                  show-search
                  :field-names="{ value: 'id', label: 'name' }"
                  :disabled="districtOptions.length === 0"
                >
                </a-select>
              </div>
              <!-- otm turi -->
              <div class="col-md-6 mb-3">
                <label for="fakultet-type-input" class="form-label">
                  {{ $t("Hei_type") }}
                </label>
                <a-select
                  v-model:value="heiData.university_type"
                  :options="optionsHeiType"
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </div>
              <!-- otm shakli -->
              <div class="col-md-6 mb-3">
                <label for="fakultet-shape-input" class="form-label">{{
                  $t("Hei_shape")
                }}</label>
                <a-select
                  v-model:value="heiData.university_form"
                  :options="optionsHeiForm"
                  :field-names="{ value: 'id', label: 'name' }"
                >
                </a-select>
              </div>
              <!-- pochta manzili  -->
              <div class="col-md-6 mb-3">
                <label for="email-address-input" class="form-label"
                  >{{ $t("Email") }} <sup>⚬</sup></label
                >
                <a-input
                  v-model:value="heiData.email"
                  :placeholder="$t('Enter_email')"
                />
              </div>
              <!-- bank ma'lumotlari -->
              <div class="mb-3">
                <label for="bank-info-input" class="form-label">{{
                  $t("Bank_details")
                }}</label>
                <a-textarea
                  v-model:value="heiData.bank_information"
                  :placeholder="$t('Enter_bank_details')"
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                />
              </div>
              <!-- akkreditatsiya  malumotlari -->
              <div class="mb-3">
                <label for="akkreditasiya-info-input" class="form-label"
                  >{{ $t("Accreditation_info") }} <sup>⚬</sup></label
                >
                <a-textarea
                  v-model:value="heiData.accriditaion"
                  :placeholder="$t('Enter_accreditation_info')"
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                />
              </div>
            </div>
            <div class="d-flex justify-content-end">
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
