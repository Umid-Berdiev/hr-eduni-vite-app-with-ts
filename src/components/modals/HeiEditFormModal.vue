<script setup lang="ts">
  import type { HeiInterface } from "@/utils/interfaces";
  import { reactive, ref } from "vue";

  const props = defineProps<{
    heiData: HeiInterface;
  }>();

  const isLoading = ref(false);
  const errors = reactive({});
  const optionsRegion = ref([]);
  const optionsHeiType = ref([
    { value: "Davlat" },
    { value: "Xorijiy" },
    { value: "Xususiy" },
    { value: "Qo'shma" },
    { value: "Boshqa" },
  ]);
  const optionsHeiShape = ref([
    { value: "Institut" },
    { value: "Universitet" },
    { value: "Akademiya" },
    { value: "Filial" },
    { value: "Boshqa" },
  ]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: string) => {
    console.log("Failed:", errorInfo);
  };
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
          <a-form
            :model="heiData"
            autocomplete="off"
            @finish.prevent="onFinish"
            @finishFailed="onFinishFailed"
          >
            <div class="row">
              <!-- ----otm kod---------- -->
              <div class="mb-3 col-md-6">
                <label for="otm-kod-input" class="form-label">
                  {{ $t("Code") }}
                </label>
                <a-input
                  class="select"
                  type="text"
                  v-model:value="heiData.code"
                  placeholder="{{$t('Hei_code')}}"
                  :disabled="true"
                />
              </div>

              <div class="col-md-6">
                <a-form-item
                  class=""
                  name="name_uz"
                  :rules="[
                    {
                      required: true,
                      message: $t('Hei_nameuz_required'),
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >{{ $t("Name_uz") }} <sup>⚬</sup></label
                  >
                  <a-input
                    class="select"
                    type="text"
                    v-model:value="heiData.name_uz"
                    :placeholder="$t('Enter_hei_nameuz')"
                  />
                </a-form-item>
              </div>
              <div class="col-md-6">
                <a-form-item
                  class=""
                  name="name_ru"
                  :rules="[
                    {
                      required: true,
                      message: $t('Hei_nameru_required'),
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >{{ $t("Name_ru") }} <sup>⚬</sup></label
                  >
                  <a-input
                    class="select"
                    type="text"
                    v-model:value="heiData.name_ru"
                    :placeholder="$t('Enter_hei_nameru')"
                  />
                </a-form-item>
              </div>
              <div class="col-md-6">
                <a-form-item
                  class=""
                  name="name_en"
                  :rules="[
                    {
                      required: true,
                      message: $t('Hei_nameen_required'),
                    },
                  ]"
                >
                  <label for="otm-name-input" class="form-label"
                    >{{ $t("Name_en") }} <sup>⚬</sup></label
                  >
                  <a-input
                    class="select"
                    type="text"
                    v-model:value="heiData.name_en"
                    :placeholder="$t('Enter_hei_nameen')"
                  />
                </a-form-item>
              </div>
              <!-- otm kontakti -->
              <div class="col-md-6">
                <a-form-item
                  class="mb-3"
                  name="heiTelNumber"
                  :rules="[
                    { required: true, message: $t('Phone_number_required') },
                  ]"
                >
                  <label for="otm-name-input" class="form-label">{{
                    $t("Phone")
                  }}</label>
                  <a-input
                    class="select"
                    type="tel"
                    v-model:value="heiData.phone"
                    placeholder="+998## ###-##-##"
                    v-maska="['+998## ###-##-##', '+998## ###-##-##']"
                  />
                </a-form-item>
              </div>
              <div class="col-md-6">
                <!-- otm stir -->
                <a-form-item
                  class="mb-3"
                  name="heiStir"
                  :rules="[{ required: true, message: $t('Stir_required') }]"
                >
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
                </a-form-item>
              </div>
              <!-- otm joylashgan hudud  -->
              <a-form-item class="mb-3 col-md-6">
                <label for="fakultet-territoy-input" class="form-label">{{
                  $t("Region")
                }}</label>
                <a-select
                  v-model:value="heiData.region"
                  :options="optionsRegion"
                  show-search
                >
                </a-select>
              </a-form-item>
              <!-- otm joylashgan shaxar -->
              <a-form-item
                class="mb-3 col-md-6"
                name="city"
                :rules="[{ required: true, message: $t('City_required') }]"
              >
                <label for="otm-city-input" class="form-label"
                  >{{ $t("City") }} <sup>⚬</sup></label
                >
                <a-input
                  v-model:value="heiData.city"
                  type="text"
                  class="form-control"
                  :placeholder="$t('Enter_city')"
                  id="otm-city-input"
                />
              </a-form-item>
              <!-- otm turi -->
              <a-form-item class="mb-3 col-md-6">
                <label for="fakultet-type-input" class="form-label">
                  {{ $t("Hei_type") }}
                </label>
                <a-select
                  v-model:value="heiData.hei_type"
                  :options="optionsHeiType"
                >
                </a-select>
              </a-form-item>
              <!-- otm shakli -->
              <a-form-item class="mb-3 col-md-6">
                <label for="fakultet-shape-input" class="form-label">{{
                  $t("Hei_shape")
                }}</label>
                <a-select
                  v-model:value="heiData.hei_shape"
                  :options="optionsHeiShape"
                >
                </a-select>
              </a-form-item>
              <!-- pochta manzili  -->
              <a-form-item
                class="mb-3"
                name="email"
                :rules="[{ required: true, message: $t('Email_required') }]"
              >
                <label for="email-address-input" class="form-label"
                  >{{ $t("Email") }} <sup>⚬</sup></label
                >
                <a-textarea
                  v-model:value="heiData.email"
                  :placeholder="$t('Enter_email')"
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                />
              </a-form-item>
              <!-- bank ma'lumotlari -->
              <a-form-item
                class="mb-3"
                name="bank_details"
                :rules="[
                  {
                    required: true,
                    message: $t('Bank_details_required'),
                  },
                ]"
              >
                <label for="bank-info-input" class="form-label">{{
                  $t("Bank_details")
                }}</label>
                <a-textarea
                  v-model:value="heiData.bank"
                  :placeholder="$t('Enter_bank_details')"
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                />
              </a-form-item>
              <!-- akkreditatsiya  malumotlari -->
              <a-form-item
                class="mb-3"
                name="akk"
                :rules="[
                  {
                    required: true,
                    message: $t('Accreditation_info_required'),
                  },
                ]"
              >
                <label for="akkreditasiya-info-input" class="form-label"
                  >{{ $t("Accreditation_info") }} <sup>⚬</sup></label
                >
                <a-textarea
                  v-model:value="heiData.akk"
                  :placeholder="$t('Enter_accreditation_info')"
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                />
              </a-form-item>
            </div>
            <div class="d-flex justify-content-end">
              <SubmitButton :loading="isLoading" />
            </div>
          </a-form>
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
