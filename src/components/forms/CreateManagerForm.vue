<script setup>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

// getting store
const store = useStore()

// DATA -------------------------------------------------
const manager = ref({
  id: null
})

// METHODS ---------------------------------------------------
// submit
const submitManagerForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    const newManager = {}

    employees.value.forEach((emp) => {
      if (emp.id === manager.value.id) {
        newManager.id = emp.id
        newManager.familiya = emp.lName
        newManager.ism = emp.fName
        newManager.sharif = emp.oName
        newManager.gender = emp.gender
        newManager.telefon = emp.phone
        newManager.active = emp.isActive
        newManager.ps_raqam = emp.seriaRaqam
        newManager.tug_sana = emp.birthday
        newManager.jshir = emp.jshir
        newManager.ps_seriya = emp.seria
        newManager.ish_boshqaruvchi = true
      }
    })

    store.dispatch('putEmployee', newManager).then(() => {
      store.commit('managerPopupClose')
    }).finally(() => {
      store.dispatch('getManagers')
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
    id: { required },
  }
})
const v$ = useVuelidate(rules, manager)

// ON MOUNTED ------------------------------------------------



</script>

<template>
  <VForm @submit.prevent="submitManagerForm">
    
    <div class="mb-3">
      <VSelect
        item-title="fullName.name"
        item-value="id"
        label="Xodimni tanlang"
        variant="outlined"
        density="comfortable"
        clearable
        prepend-inner-icon="mdi-account"
        v-model="manager.id"
        :items="employees"
        :error-messages="v$.id.$errors.map(e => e.$message)"
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
