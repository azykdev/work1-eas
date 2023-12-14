<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel
        
        v-for="(item, index) in departaments"
        :key="item.id"
      >
        <v-expansion-panel-title @click="getItem(item.id)" class="bg-grey-100 py-7">{{ item.bulim_name }}  {{ index }}</v-expansion-panel-title>
        <v-expansion-panel-text class="mt-5">
          <!-- Employee Card -->
          <v-card
            variant="flat"
            id="departament-card"
          >
            <v-card-item class="">
              <v-card-title>
                <div class="d-flex justify-space-between flex-wrap">
                  <div class="me-5">Bo'lim nomi: <span class="text-primary">{{ depWithEmployee.bulim_name }}</span></div>

                  <!-- Additional information -->
                  <div
                    id="departament-attach"
                    class="pb-1"
                  >
                    <div v-if="depWithEmployee.xodimlar">
                      Xodimlar: <span class="text-primary">{{ depWithEmployee.xodimlar.length }}</span> ta
                    </div>
                  </div>

                  <!-- Departament Actions -->
                  <div
                    id="departament-actions"
                    class="pb-1 d-flex align-center"
                  >
                    <AttachDepEmpPopup
                      :departament="depWithEmployee"
                      :getItemFunc="getItem"
                      class="me-2"
                    />
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

            <v-divider></v-divider>

            <v-card-text>
              <v-list lines="three">
                <v-list-item
                  class="rounded"
                  v-for="xodim in depWithEmployee.xodimlar"
                  :key="xodim.id"
                  :value="xodim.id"
                  prepend-avatar="https://randomuser.me/api/portraits/women/8.jpg"
                >
                  <v-list-item-title
                    class="mb-1"
                    style="font-size: 17px"
                    >{{ xodim.xodim.familiya }} {{ xodim.xodim.ism }} {{ xodim.xodim.sharif }}</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    <div class="me-5 me-md-10 mb-1">
                       <i class="text-primary">{{ xodim.lavozim }}</i>
                    </div>
                    <div class="d-flex flex-wrap">
                      <div class="me-5 me-md-10">
                         <i>{{ xodim.xodim.telefon }}</i>
                      </div>
                      <div class="me-5 me-md-10">
                         <i>{{ xodim.xodim.ps_seriya }} {{ xodim.xodim.ps_raqam }}</i>
                      </div>
                    </div>
                  </v-list-item-subtitle>
                  <!-- <v-list-item-action></v-list-item-action> -->
                </v-list-item>
              </v-list>

              <!-- <AllEmployeesTable :allEmployees="item.xodimlar" /> -->

              
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { watch } from 'vue';
import AttachDepEmpPopup from '../dialogs/AttachDepEmpPopup.vue'
import AllEmployeesTable from '../tables/AllEmployeesTable.vue';

export default {
  name: 'DepartamentExPanel',
  data: () => ({
    departaments: [],
    depWithEmployee: [],
    headers: [
      
    ],
  }),
  methods: {
    // loadItems() {
    //   this.$store.dispatch('getDepartament', { page: 1 })
    // },
    getItem(id) {
      this.$store.dispatch('getDepWithEmployeesByDepId', id).then((res) => {
        console.log(res);
        this.depWithEmployee = JSON.parse(JSON.stringify(res.data))
      })
    }
  },
  computed: {
    // departaments() {
    //   return this.$store.state.departament.departaments
    // },
    // departamentsWithEmployee() {
    //   return this.$store.state.departament.departamentsWithEmployee
    // },
    // getDepWithEmployeesByDepId() {
    //   return this.$store.state.departament.getDepWithEmployeesByDepId
    // },
  },
  mounted() {
    this.$store.dispatch('getDepartament', { page: 1 }).then((res) => {
      console.log('res-->', res);
      this.departaments = [...res.data]
    })
  },
  components: { AttachDepEmpPopup, AllEmployeesTable },
  
}
</script>

<style scoped>
#departament-actions {
  opacity: 0;
  transition: opacity 0.3s ease;
}

#departament-card:hover #departament-actions {
  opacity: 1;
}
</style>
