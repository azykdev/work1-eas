<script setup>
import { ref } from 'vue'
import CreateEmployeePopUp from '@/components/dialogs/CreateEmployeePopUp.vue'
import EmployeesTable from '@/components/tables/EmployeesTable.vue'
import axios from 'axios';
import { useStore } from 'vuex';
import { watch } from 'vue';

// getting store
const store = useStore()

// DATA
const searchText = ref('')
let loading = ref(false)

// METHODS
const onClick = () => {
  loading.value = true
  store.dispatch('getEmployee', { page: 1, itemsPerPage: 10, q: searchText.value }).then((res) => {
    loading.value = false
  })
}

// WATCHERS
watch(searchText, () => {
  if (typeof searchText.value == false || searchText.value == '') {
    loading.value = true
    store.dispatch('getEmployee', { page: 1, itemsPerPage: 10, q: searchText.value }).then((res) => {
      loading.value = false
    })
  }
})
</script>

<template>
  <v-row class="my-2">
    <v-col
      cols="12"
      sm="6"
      class="d-flex align-center"
    >
      <CreateEmployeePopUp />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-form class="d-flex align-center justify-space-between" @submit.prevent>
        <v-text-field
          v-model="searchText"
          append-inner-icon="mdi-magnify"
          :loading="loading"
          variant="solo-filled"
          label="Search..."
          hide-details
          @click:append-inner="onClick"
          @keydown.enter="onClick"
        ></v-text-field>
      </v-form>
    </v-col>
  </v-row>

  <EmployeesTable />

  
</template>
