<script setup lang="ts">
  import type { HeiInterface } from "@/utils/interfaces";
  import { ref, reactive } from "vue";
  import { fetchHeiInfo } from "@/utils/api/hei";
  import { Modal } from "bootstrap";

  const heiFormData: HeiInterface = reactive({});

  await fetchData();

  async function fetchData() {
    const res = await fetchHeiInfo();
    Object.assign(heiFormData, res.data);
  }

  function openHeiEditFormModal() {
    // data-bs-toggle="modal"
    // data-bs-target="#heiEditFormModal"
    const modal = Modal.getOrCreateInstance("#heiEditFormModal");
    modal.show();
  }
</script>

<template>
  <div class="infoUniversity">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("About_hei") }}</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="button"
                class="btns c-save py-1.5 px-4"
                @click="openHeiEditFormModal"
              >
                <i class="far fa-edit me-2"></i>
                {{ $t("Edit") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <div class="col-xl-12 pb-1">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table-vertical">
              <tr class="table-row-infoUniversity">
                <th scope="row">
                  <b>{{ $t("Code") }}</b>
                </th>
                <td>{{ heiFormData.code }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Title") }}</strong>
                </th>
                <td>{{ heiFormData.name }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Region") }}</strong>
                </th>
                <td>{{ heiFormData.region }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("District") }}</strong>
                </th>
                <td>{{ heiFormData.district }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("STIR") }}</strong>
                </th>
                <td>{{ heiFormData.stir }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Phone") }}</strong>
                </th>
                <td>{{ heiFormData.contact }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Rector") }}</strong>
                </th>
                <td>{{ heiFormData.rector }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Hei_type") }}</strong>
                </th>
                <td>{{ heiFormData.university_type }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Hei_shape") }}</strong>
                </th>
                <td>{{ heiFormData.university_form }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Email") }}</strong>
                </th>
                <td>{{ heiFormData.email }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Bank_details") }}</strong>
                </th>
                <td>{{ heiFormData.bank_information }}</td>
              </tr>
              <tr class="table-row-infoUniversity">
                <th>
                  <strong>{{ $t("Accreditation_info") }}</strong>
                </th>
                <td>{{ heiFormData.accriditaion }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-------START MODAL---------------------------------------->
    <HeiEditFormModal @update="fetchData" />
    <!-------END MODAL---------------------------------------->
  </div>
</template>

<style lang="scss" scoped>
  @import "/src/assets/scss/_screenDimensions.scss";

  .infoUniversity {
    .table-row-infoUniversity {
      width: 100% !important;
      display: grid;
      grid-gap: 0;
      grid-template-columns: 200px auto;
      @include mobile() {
        grid-template-columns: 150px auto !important;
      }
    }
    .modal-dialog {
      max-width: $ipad !important;
    }
    .nav-tabs {
      --bs-nav-tabs-border-color: #a1a8ae;
      --bs-nav-tabs-border-width: 2px;
    }
    .nav-tabs .nav-link.active,
    .nav-tabs .nav-item.show .nav-link {
      color: var(--bs-nav-tabs-link-active-color);
      background-color: #00264b;
      color: #fff;
    }
    .nav-link {
      padding: 5px 70px;
      @media (max-width: 716px) {
        padding: 5px 30px;
      }
    }
  }
</style>
