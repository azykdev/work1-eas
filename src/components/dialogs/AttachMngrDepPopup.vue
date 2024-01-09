<template>
  <div>
    <v-btn
    prepend-icon="mdi-attachment"
      color="success"
      variant="outlined"
      persistent
      @click="this.$store.commit('attachMngrDepPopupOpen')"
    >
    Bo'lim biriktirish
      <v-dialog
        v-model="attachMngrDepPopup"
        max-width="600"
        scrollable
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <p>Ish boshqaruvchiga bo'lim biriktirish</p>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                icon="mdi-close"
                color="secondary"
                @click="this.$store.commit('attachMngrDepPopupClose')"
              >
              </v-btn>
            </v-card-actions>
          </v-card-title>

          <v-card-text>
            <!-- <AttachDepEmpForm :departamentWithEmpByDepId="departamentWithEmpByDepId" /> -->
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'AttachMngrDepPopup',
    data() {
      return {
        
      }
    },
    
    // components: {
    //   AttachDepEmpForm
    // },
    computed: {
      attachMngrDepPopup() {
        return this.$store.state.managerWithDep.attachMngrDepPopup
      }
    },
    // methods: {
      
    // },
    // mounted() {
    //   this.$store.dispatch('getEmployee', { page: 1 }).then((res) => {
    //   })
    // },
    // props: {
    //   departamentWithEmpByDepId: {
    //     type: Object,
    //     required: true
    //   },
    // }
  }
</script>

<style scoped>

</style>
