<script setup>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

// getting store
const store = useStore()

// DATA -------------------------------------------------
const departament = ref({
  bulim_name: '',
})

// METHODS ---------------------------------------------------
// submit
const submitDepartamentForm = async () => {
  const result = await v$.value.$validate()

  if (result) {

    if (store.state.departament.editItemData) {
      store.dispatch('putDepartament', departament.value).then(() => { // PUT
        store.commit('departamentPopupClose')
      }).finally(() => {
        store.dispatch('getDepartament')
      })
    } else {
      store.dispatch('postDepartament', departament.value).then(() => {  // POST
        store.commit('departamentPopupClose')
      }).finally(() => {
        store.dispatch('getDepartament')
      })
    }

  } else {
    alert('Validation failed!')
  }
}

// COMPUTED --------------------------------------------------
const editItemDatas = computed(() => {
  return store.state.departament.editItemData
})
const rules = computed(() => {
  return {
    bulim_name: { required },
  }
})
const v$ = useVuelidate(rules, departament)

// WATCH ------------------------------------------------
watch(() => {
  if(editItemDatas.value) {
    departament.value = JSON.parse(JSON.stringify(editItemDatas.value))
  }
})
</script>

<template>
  <VForm @submit.prevent="submitDepartamentForm">
    <VTextField
      label="Bolim nomi"
      variant="outlined"
      density="comfortable"
      clearable
      prepend-inner-icon="mdi-sitemap"
      v-model="departament.bulim_name"
      :error-messages="v$.bulim_name.$errors.map(e => e.$message)"
    />

    <VBtn
      type="submit"
      color="success"
      size="small"
      class="mt-5"
    >
      Yuborish
    </VBtn>
  </VForm>
</template>
