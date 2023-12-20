<template>
  <div class="text-center">
    <v-btn
      prepend-icon="mdi-plus"
      color="success"
    >
    Ish boshqaruvchi qo'shish
      <v-dialog
        v-model="$store.state.manager.createManagerPopup"
        max-width="600"
        activator="parent"
        persistent
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <p>Ish boshqaruvchi qo'shish</p>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                icon="mdi-close"
                color="secondary"
                @click="$store.commit('managerPopupClose')"
              >
              </v-btn>
            </v-card-actions>
          </v-card-title>

          <v-card-text>
            <!-- <CreateDepartamentForm /> -->
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>
