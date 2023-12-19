/* stylelint-disable CssSyntaxError */
<script setup>
import CreateEmployeeForm from '@/components/forms/CreateEmployeeForm.vue'
import { useStore } from 'vuex'

// getting store
const store = useStore()
</script>

<template>
  
  <div class="text-center">
    <v-btn
      prepend-icon="mdi-plus"
      color="success"
    >
    Xodim qo'shish
      <v-dialog
        v-model="store.state.employee.createEmpPopup"
        max-width="1200"
        activator="parent"
        persistent
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <p>Xodim qo'shish</p>
            <v-card-actions class="position-relative">
              <v-spacer></v-spacer>

              <v-btn
                icon="mdi-close"
                color="secondary"
                @click="store.commit('employeePopupClose')"
                style="position: fixed; right: 20px;"
              >
              </v-btn>
            </v-card-actions>
          </v-card-title>

          <v-card-text>
            <CreateEmployeeForm />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
  
</template>

<style scoped>

</style>
