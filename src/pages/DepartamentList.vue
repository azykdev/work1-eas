<script setup>
// IMPORTS
import CreateDepartamentPopUp from '@/components/dialogs/CreateDepartamentPopUp.vue'
import DepartamentsTable from '@/components/tables/DepartamentsTable.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'

// getting store
const store = useStore()

let loaded = ref(false)
let loading = ref(false)

const onClick = () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    loaded.value = true
  }, 2000)
}

onMounted(() => {
  // axios
  //   .get('http://t1.zarmeduniver.com:8005/bulim/bulimlar')
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.log('ERROR ----> ' + err)
  //   })

  // store.dispatch('getEmployee', { page: 1, itemsPerPage: 10 })
})

</script>

<template>
  <v-row class="my-2">
    <v-col
      cols="12"
      sm="6"
      class="d-flex align-center"
    >
      <CreateDepartamentPopUp />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-form class="d-flex align-center justify-space-between">
        <v-text-field
          append-inner-icon="mdi-magnify"
          :loading="loading"
          variant="solo-filled"
          label="Search templates"
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-form>
    </v-col>
  </v-row>

  
  
  <DepartamentsTable />
</template>
