<script setup>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

// getting store
const store = useStore()

// DATA -------------------------------------------------
const attachData = ref({
  xodim_id: null,
  bulim_id: props.departamentWithEmpByDepId.id,
  lavozim: '',
  stavka: 0
})

// PROPS --------------------------------------------------
const props = defineProps({
  departamentWithEmpByDepId: Object,
})

console.log(props.departamentWithEmpByDepId);

// METHODS ---------------------------------------------------
// submit
const submitDepartamentForm = async () => {
  const result = await v$.value.$validate()

  if (result) {

    store.dispatch('postDepartamentWithEmp', attachData.value).then((res) => {
      console.log(res);
      store.dispatch('getDepartamentWithEmpByDepId', props.departamentWithEmpByDepId.id)
    }).finally(() => {  
      attachData.value = {
        xodim_id: null,
        bulim_id: null,
        lavozim: '',
        stavka: 0
      }

      store.commit('attachDepEmpPopupClose')

    })
  } else {
    alert('Validation failed!')
  }
}

// COMPUTED --------------------------------------------------
const employees = computed(() => {
  return store.state.employee.employees
})

const rules = computed(() => {
  return {
    xodim_id: { required },
    lavozim: { required },
    stavka: { required }
  }
})
const v$ = useVuelidate(rules, attachData)
</script>

<template>
  <VForm @submit.prevent="submitDepartamentForm">
    <div class="mb-3">
      <VSelect
        item-title="fullName.name"
        item-value="id"
        label="Xodimni tanlang"
        variant="outlined"
        density="comfortable"
        clearable
        prepend-inner-icon="mdi-account"
        v-model="attachData.xodim_id"
        :items="employees"
        :error-messages="v$.xodim_id.$errors.map(e => e.$message)"
      />
    </div>

    <div class="mb-3">
      <VTextField
        label="Lavozim"
        variant="outlined"
        density="comfortable"
        clearable
        prepend-inner-icon="mdi-sitemap"
        v-model="attachData.lavozim"
        :error-messages="v$.lavozim.$errors.map(e => e.$message)"
      />
    </div>

    <div class="mb-3">
      <VTextField
        type="number"
        label="Stavka"
        density="comfortable"
        clearable
        prepend-inner-icon="mdi-briefcase"
        v-model="attachData.stavka"
        :error-messages="v$.stavka.$errors.map(e => e.$message)"
        class="w-50"
        min="0"
        step="0.25"
      />
    </div>

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
