<script setup>
  import { ref } from "vue";
  import AvatarInput from "@/components/AvatarInput";

  const disabled = ref(true);
</script>

<template>
  <div class="my-profile">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title mb-0">Mening profilim</h4>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-xl-2">
            <!-- <div class="">
              <img
                class="rounded w-100"
                alt="200x200"
                src="/src/assets/images/users/avatar-6.jpg"
                data-holder-rendered="true"
              />
            </div> -->
            <AvatarInput class="w-100" />
          </div>
          <div class="col-xl-5">
            <div class="mb-3">
              <label for="division-name-input" class="form-label">Login</label>
              <a-input v-model:value="value2" />
            </div>
            <div class="mb-3">
              <label for="division-name-input" class="form-label"
                >To'liq ismi</label
              >
              <a-input v-model:value="value2" />
            </div>
            <div class="mb-3">
              <label for="division-name-input" class="form-label">Email</label>
              <a-input v-model:value="value2" />
            </div>
          </div>
          <div class="col-xl-5">
            <div class="mb-3">
              <label for="otm-name-input" class="form-label">Kontakt</label>
              <a-input
                class="select"
                tupe="tel"
                v-model:value="otmCallInput"
                placeholder="+998## ###-##-##"
                v-maska="['+998## ###-##-##', '+998## ###-##-##']"
              />
            </div>
            <div class="mb-3">
              <label for="division-name-input" class="form-label"
                ><a-checkbox v-model="checked" class="me-2"></a-checkbox>Parolni
                o'zgartirish</label
              >
              <a-input-password
                :disabled="disabled"
                v-model:value="value"
                placeholder="Yangi parol"
              />
            </div>
            <div class="mb-3">
              <label for="division-name-input" class="form-label"
                >Parolni tasdig'i</label
              >
              <a-input-password
                :disabled="disabled"
                v-model:value="value"
                placeholder="Parol tasdig'i"
              />
            </div>
            <div class="d-flex justify-content-end">
              <button class="btns c-save py-2 px-3">O'zgartirish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
