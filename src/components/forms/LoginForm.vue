<script setup>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// getting store
const store = useStore()
// getting router
const router = useRouter()

// DATA -------------------------------------------------
const login = ref({
  username: '',
  password: '',
})
const isPasswordVisible = ref(false)

// METHODS ----------------------------------------------
// submit
const submitLoginForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    // if (store.state.departament.editItemData) {
    //   store
    //     .dispatch('putDepartament', departament.value)
    //     .then(() => {
    //       // PUT
    //       store.commit('departamentPopupClose')
    //     })
    //     .finally(() => {
    //       store.dispatch('getDepartament')
    //     })
    // } else {
    //   store
    //     .dispatch('postDepartament', departament.value)
    //     .then(() => {
    //       // POST
    //       store.commit('departamentPopupClose')
    //     })
    //     .finally(() => {
    //       store.dispatch('getDepartament')
    //     })
    // }

    router.push({ name: 'dashboard' })
  } else {
    alert('Validation failed!')
  }
}

// COMPUTED --------------------------------------------------
// const editItemDatas = computed(() => {
//   return store.state.departament.editItemData
// })
const rules = computed(() => {
  return {
    username: { required },
    password: { required },
  }
})
const v$ = useVuelidate(rules, login)

// WATCH ------------------------------------------------
// watch(() => {
//   if (editItemDatas.value) {
//     departament.value = JSON.parse(JSON.stringify(editItemDatas.value))
//   }
// })
</script>

<template>
  <VForm @submit.prevent="submitLoginForm">
    <VRow>
      <!-- email -->
      <VCol cols="12">
        <VTextField
          v-model="login.username"
          label="User name"
          type="text"
          :error-messages="v$.username.$errors.map(e => e.$message)"
        />
      </VCol>

      <!-- password -->
      <VCol cols="12">
        <VTextField
          v-model="login.password"
          label="Password"
          :type="isPasswordVisible ? 'text' : 'password'"
          :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
          @click:append-inner="isPasswordVisible = !isPasswordVisible"
          :error-messages="v$.password.$errors.map(e => e.$message)"
        />

        <!-- login button -->
        <VBtn
          block
          type="submit"
          class="mt-4"
        >
          Login
        </VBtn>
      </VCol>

      <!-- auth providers -->
      <VCol
        cols="12"
        class="text-center"
      >
        <AuthProvider />
      </VCol>
    </VRow>
  </VForm>
</template>
