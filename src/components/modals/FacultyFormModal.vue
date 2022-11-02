<script setup lang="ts">
  import { reactive, ref } from "vue";

  const handleFacultySort = (value) => {
    console.log(value);
    // console.log(nameFacultySort);
  };
  const optionsFacultySorts = ref([
    { value: "Maxalliy" },
    { value: "Qo'shma" },
    { value: "Bo'lim" },
    { value: "Boshqa" },
  ]);
  const formCreatFaculty = reactive({
    nameFaculty: "",
    kodFaculty: "",
    value: undefined,
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
            Fakultet yaratish
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <a-form
            :model="formCreatFaculty"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
          >
            <a-form-item
              class="mb-3"
              name="nameFaculty"
              :rules="[
                { required: true, message: `Fakultet nomini kiriting!` },
              ]"
            >
              <label for="fakulty-name-input" class="form-label">Nomi</label>
              <a-input
                type="text"
                class="select"
                v-model:value="formCreatFaculty.nameFaculty"
                placeholder="Fakultet nomini kiriting"
              />
            </a-form-item>

            <a-form-item
              class="mb-3"
              name="kodFaculty"
              :rules="[
                { required: true, message: `Fakultet kodini kiriting!` },
              ]"
            >
              <label for="fakulty-kod-input" class="form-label">Kodi</label>
              <a-input
                type="text"
                class="select"
                v-model:value="formCreatFaculty.kodFaculty"
                placeholder="Fakultet kodini kiriting"
              />
            </a-form-item>

            <a-form-item
              class="mb-3"
              name="facultySort"
              :rules="[
                { required: true, message: `Fakultet kodini kiriting!` },
              ]"
            >
              <label for="fakultet-sort-input" class="form-label">Turi</label>
              <a-select
                autocomplete="off"
                v-model:value="formCreatFaculty.facultySort"
                :options="optionsFacultySorts"
                style="width: 100%"
                @change="handleFacultySort"
              >
              </a-select>
            </a-form-item>

            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btns c-cancel me-1"
                data-bs-dismiss="modal"
              >
                Yopish
              </button>
              <button class="btns c-delete me-1">O'chirish</button>
              <button class="btns c-save" type="submit">Saqlash</button>
            </div>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>
