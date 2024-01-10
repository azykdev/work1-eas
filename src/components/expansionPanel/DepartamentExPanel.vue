<template>
  <div >
    <v-expansion-panels >
      <v-expansion-panel
        v-for="(item) in departaments"
        :key="item.id"
      >
        <v-expansion-panel-title
          color="grey-50" 
          @click="getItem(item.id)"
          class="py-7 text-white text-capitalize " 
          >{{ item.bulim_name }}</v-expansion-panel-title
        >
        <v-expansion-panel-text class="mt-5" v-if="departamentWithEmpByDepId" >
          <!-- Employee Card -->
          <v-card
            variant="flat"
            id="departament-card"
          >
            <v-card-item class="">
              <v-card-title>
                <div class="d-flex justify-space-between flex-wrap">
                  <div class="me-5">
                    Bo'lim nomi: <span class="text-primary">{{ departamentWithEmpByDepId.bulim_name }}</span>
                  </div>

                  <!-- Additional information -->
                  <div
                    id="departament-attach"
                    class="pb-1"
                  >
                    <div>
                      Xodimlar: <span class="text-primary">{{ departamentWithEmpByDepId.xodimlar.length }}</span> ta
                    </div>
                  </div>

                  <!-- Departament Actions -->
                  <div
                    id="departament-actions"
                    class="pb-1 d-flex align-center"
                  >
                    <AttachDepEmpPopup
                      class="me-2"
                      :departamentWithEmpByDepId="departamentWithEmpByDepId"
                    />
                    <v-icon
                      size="small"
                      class="mx-3"
                      color="warning"
                      @click="editItem(item)"
                    >
                      mdi-pencil
                    </v-icon>
                    <v-icon
                      size="small"
                      class="mx-3"
                      color="error"
                      @click="deleteItem(item)"
                      v-if="departamentWithEmpByDepId.xodimlar.length <= 0"
                    >
                      mdi-delete
                    </v-icon>
                  </div>
                </div>
              </v-card-title>
            </v-card-item>

            <v-card-text class="ma-0 pa-0 overflow-auto">

              <DepAllEmployeesTable
                v-if="departamentWithEmpByDepId.xodimlar.length > 0"
                :allEmployees="departamentWithEmpByDepId.xodimlar"
              />
              
            </v-card-text>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import AttachDepEmpPopup from '../dialogs/AttachDepEmpPopup.vue'
import DepAllEmployeesTable from '../tables/DepAllEmployeesTable.vue'

export default {
  name: 'DepartamentExPanel',
  data: () => ({
    headers: [],
  }),
  props: {
    departaments: {
      type: Array,
    }
  },
  methods: {
    getItem(id) {
      this.$store.dispatch('getDepartamentWithEmpByDepId', id).then(res => {
        console.log(res)
      })
    },
    editItem(item) {
      console.log(item)
      this.$store.dispatch('getDepEditData', item.id)
    },
    deleteItem(item) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.$store.dispatch('deleteDepartament', item.id).then(() => {
          this.$store.dispatch('getDepartament', { page: 1, itemsPerPage: 10 })
        })
      }
    }
  },
  computed: {
    departamentWithEmpByDepId() {
      return this.$store.state.departamentWithEmp.departamentWithEmpByDepId
    },
  },
  components: { AttachDepEmpPopup, DepAllEmployeesTable },
}
</script>

<style scoped>

</style>
