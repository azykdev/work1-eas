<template>
  <div>
    <v-btn
    prepend-icon="mdi-attachment"
      color="success"
      variant="outlined"
      persistent
      @click="this.$store.commit('attachDepEmpPopupOpen')"
    >
    Xodim Biriktirish
      <v-dialog
        v-model="attachDepEmpPopup"
        max-width="600"
        scrollable
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            <p>Bo'lim va xodimni biriktirish</p>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                icon="mdi-close"
                color="secondary"
                @click="this.$store.commit('attachDepEmpPopupClose')"
              >
              </v-btn>
            </v-card-actions>
          </v-card-title>

          <v-card-text>
            <AttachDepEmpForm :departamentWithEmpByDepId="departamentWithEmpByDepId" />
            
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>

<script>
  import AttachDepEmpForm from '@/components/forms/AttachDepEmpForm.vue'
  export default {
    name: 'AttachDepEmpPopup',
    data() {
      return {
        
      }
    },
    components: {
      AttachDepEmpForm
    },
    computed: {
      attachDepEmpPopup() {
        return this.$store.state.departamentWithEmp.attachDepEmpPopup
      }
    },
    methods: {
      
    },
    mounted() {
      this.$store.dispatch('getEmployee', { page: 1 }).then((res) => {
      })
    },
    props: {
      departamentWithEmpByDepId: {
        type: Object,
        required: true
      },
    }
  }
</script>

<style scoped>

</style>
