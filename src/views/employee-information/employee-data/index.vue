<script setup lang="ts">
  import { computed, ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  import Swal from "sweetalert2";
  import { listEmployees } from "@/utils/api/employee";
  import { changeStatus } from "@/utils/api/employee";
  import EmployeeFormModal from "@/components/modals/EmployeeFormModal.vue";

  const router = useRouter();

  //actions delete
  function handleDelete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Aminmisiz?",
        text: "Siz buni qaytara olmaysiz!",
        icon: "warning",
        confirmButtonText: "Ha, o'chirish!",
        cancelButtonText: "Yo'q, bekor qilish!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "O'chirildi!",
            "Xabarni o'chirish muvaffaqiyatli amalga oshirildi!",
            "success"
          );
        }
      });
  }

  // -------------------ACTION---------------------

  const apiData = reactive({});
  const isLoading = ref(false);
  const searchInput = ref("");
  const currentPage = computed({
    get: () => {
      return apiData.current_page;
    },
    set: async (page) => {
      await fetchData(page);
    },
  });

  await fetchData();

  async function fetchData(page = 1) {
    isLoading.value = true;
    const res = await listEmployees({
      page,
      search_string: searchInput.value,
      department_id: 1,
    });
    Object.assign(apiData, res.data);
    isLoading.value = false;
  }

  function onEdit(rowId) {
    selectedId.value = rowId;
    isFormModalOpen.value = true;
  }

  async function onRemove(id) {
    selectedId.value = id;
    mainStore.$patch({ confirmModalState: true });
  }

  async function handleRemoveAction() {
    await removeById(selectedId.value);
    fetchData();
  }

  async function handleSearch() {
    await fetchData();
  }

  async function handleEdit(id) {
    router.push(`/employee-information/employee-data/employee/${id}`);
  }

  async function toggleStatus(id) {
    const res = await changeStatus(id);
  }
</script>

<template>
  <div class="employeeDataPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Employees_base") }}</h5>
          <div class="panel-toggles">
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#employeeFormModal"
            >
              <i class="fa-solid fa-user-plus me-2"></i>
              {{ $t("Add_employee") }}
            </button>
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="fa-solid fa-download me-2"></i>
              {{ $t("Export_employee") }}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="fa-solid fa-filter me-2"></i>
                {{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-xl-10 form--item">
              <input
                v-model="searchInput"
                id="search-input"
                class="form-control"
              />
              <label for="search-input"
                >Ism / Pasport / Xodim ID bo'yicha qidirish</label
              >
            </div>
            <div class="my-2 col-xl-2">
              <button
                class="btn-search search-color"
                @click="handleSearch"
                :disabled="isLoading"
              >
                <span
                  v-if="isLoading"
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                <i v-else class="fa-solid fa-magnifying-glass me-2"></i>
                <span>{{ $t("Search") }}</span>
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="content-table">
            <thead v-if="apiData.data.length">
              <tr class="table-row-employee-data">
                <th>#</th>
                <th><a-checkbox></a-checkbox></th>
                <th>{{ $t("ID") }}</th>
                <th>{{ $t("Surname") }}</th>
                <th>{{ $t("Role") }}</th>
                <th>{{ $t("Birthdate") }}</th>
                <th>{{ $t("Passport_number") }}</th>
                <th>{{ $t("Updated_at") }}</th>
                <th>{{ $t("Job_number") }}</th>
                <th>{{ $t("Actions") }}</th>
                <th>{{ $t("Active") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="apiData.data.length">
                <tr
                  class="table-row-employee-data"
                  v-for="(element, elIndex) in apiData.data"
                  :key="elIndex"
                >
                  <td>{{ elIndex + 1 }}</td>
                  <td><a-checkbox></a-checkbox></td>
                  <td>{{ element.id }}</td>
                  <td class="cursor-pointer">
                    <router-link
                      :to="`/employee-information/employee-data/employee/${element.id}`"
                    >
                      {{ element.fio }}
                    </router-link>
                  </td>
                  <td>{{ element.roles }}</td>
                  <td>{{ element.birthdate }}</td>
                  <td>{{ element.passport_number }}</td>
                  <td>{{ element.updated_at }}</td>
                  <td>{{ element.work_count }}</td>
                  <!-- ---------START ACTIONS-------------- -->
                  <td class="">
                    <button
                      class="btn btn-sm btn-link"
                      @click="handleEdit(element.id)"
                    >
                      <i class="bx bx-pencil font-size-18"></i>
                    </button>
                    <a
                      class="text-danger"
                      type="danger"
                      @click="handleDelete(element.id)"
                    >
                      <i class="bx bx-trash-alt font-size-18"></i>
                    </a>
                  </td>
                  <!-- ---------END ACTIONS-------------- -->
                  <td>
                    <div class="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        @change="toggleStatus(element.id)"
                        :checked="element.status"
                      />
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <div class="py-5">
                  <h5 class="text-center">{{ $t("No_data") }}</h5>
                  <p class="text-center">
                    {{ $t("There_is_no_data_that_match_your_query") }}
                  </p>
                </div>
              </template>
            </tbody>
          </table>
          <!-- ----------------start pagenation-------------------- -->
          <div v-if="apiData.data.length" class="mt-2">
            <nav aria-label="...">
              <ul class="pagination">
                <!-- <li class="page-item disabled">
                    <span class="page-link"
                      ><i class="mdi mdi-chevron-left"></i
                    ></span>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item active">
                    <span class="page-link">
                      2
                      <span class="sr-only">(current)</span>
                    </span>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">4</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">5</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">6</a>
                  </li> -->
                <li
                  v-for="link in apiData.links"
                  :class="[
                    'page-item',
                    link.url == null && 'disabled',
                    link.label == apiData.current_page && 'active',
                  ]"
                >
                  <button class="page-link" @click="currentPage = link.label">
                    <!-- <i class="mdi mdi-chevron-right"></i> -->
                    <span v-html="link.label"></span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <!-- -----------------end-pagenation--------------------- -->
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->

    <!-------START MODAL---------------------------------------->
    <EmployeeFormModal />
    <!-------END MODAL---------------------------------------->
  </div>
</template>

<style lang="scss">
  @import "/src/assets/scss/_screenDimensions.scss";
  .employeeDataPage {
    .table-row-employee-data {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px 40px 100px auto 120px 140px 140px 120px 80px 80px 70px;
      @include mobile() {
        grid-template-columns: 50px 40px 100px 200px auto 140px 140px 120px 80px 80px 60px;
      }
    }

    .modal-dialog {
      max-width: $ipad_pro !important;
    }

    .cursor-pointer {
      cursor: pointer;
    }

    .modal-data-tip {
      background-color: #dee2e6;
      padding: 10px;
    }
  }
</style>
