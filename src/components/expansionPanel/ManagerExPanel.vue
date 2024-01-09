<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel v-for="(manager, i) in managers" :key="manager.id">
        <v-expansion-panel-title class="bg-grey-100 py-7">{{ manager.familiya }} {{ manager.ism }} {{ manager.sharif }}</v-expansion-panel-title>
        <v-expansion-panel-text class="mt-5">
          <!-- Manager Card -->
          <v-card variant="flat">
            <v-card-item>
              <v-card-title>
                <div class="d-flex justify-space-between flex-wrap">
                  <div class="me-3 d-flex align-center flex-wrap" >
                    <h5 class="me-3 text-capitalize font-weight-light ">Ish boshqaruvchi nomi: </h5>
                    <span class="text-primary">{{ manager.familiya }} {{ manager.ism }} {{ manager.sharif }}</span>
                  </div>

                  <!-- Additional information -->
                  <div
                    id="departament-attach"
                  >
                    <div class="d-flex align-center flex-wrap">
                      <h5 class="me-3 text-capitalize font-weight-light"  >Bo'limlar:</h5>
                      <span class="text-primary">10 ta</span> 
                    </div>
                  </div>

                  <!-- Manager Actions -->
                  <div
                    class="pb-1 d-flex align-center"
                  >
                    <!-- <AttachDepEmpPopup
                      class="me-2"
                      :departamentWithEmpByDepId="departamentWithEmpByDepId"
                    /> -->
                    <AttachMngrDepPopup class="me-2" />
                    <v-icon
                      size="small"
                      class="mx-3"
                      color="warning"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      size="small"
                      class="mx-3"
                      color="error"
                    >
                      mdi-delete
                    </v-icon>
                  </div>
                </div>
              </v-card-title>
            </v-card-item>
            <v-card-text class="ma-0 pa-0 overflow-auto">

            </v-card-text>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import AttachMngrDepPopup from '../dialogs/AttachMngrDepPopup.vue';

  export default {
    name: 'ManagerExPanel',
    props: {
        managers: {
            type: Array,
        }
    },
    components: { AttachMngrDepPopup }
}
</script>

<style scoped>

</style>
