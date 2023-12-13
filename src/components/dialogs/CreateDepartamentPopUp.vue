/* stylelint-disable CssSyntaxError */
<script setup>
import CreateDepartamentForm from '@/components/forms/CreateDepartamentForm.vue'
import { ref } from 'vue'
import { useStore } from 'vuex';

// getting store
const store = useStore()

</script>

<template>
  <div class="text-center">
    <v-btn
      prepend-icon="mdi-plus"
      color="success"
    >
    Bo'lim qo'shish
      <v-dialog
        v-model="store.state.departament.createDepPopup"
        max-width="600"
        activator="parent"
        persistent
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <p>Bo'lim qo'shish</p>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                icon="mdi-close"
                color="secondary"
                @click="store.commit('departamentPopupClose')"
              >
              </v-btn>
            </v-card-actions>
          </v-card-title>

          <v-card-text>
            <CreateDepartamentForm />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<style scoped></style>
