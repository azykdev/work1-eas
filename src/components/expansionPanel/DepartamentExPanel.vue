<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel
        
        v-for="(item, index) in departamentsWithEmployee"
        :key="item.id"
      >
        <v-expansion-panel-title class="bg-grey-100 py-7">{{ item.bulim_name }}  {{ index }}</v-expansion-panel-title>
        <v-expansion-panel-text class="mt-5">
          <!-- Employee Card -->
          <v-card
            variant="flat"
            id="departament-card"
          >
            <v-card-item class="">
              <v-card-title>
                <div class="d-flex justify-space-between flex-wrap">
                  <div class="me-5">Bo'lim nomi: <span class="text-primary">{{ item.bulim_name }}</span></div>

                  <!-- Additional information -->
                  <div
                    id="departament-attach"
                    class="pb-1"
                  >
                    <div>
                      Xodimlar: <span class="text-primary">{{ item.xodimlar.length }}</span> ta
                    </div>
                  </div>

                  <!-- Departament Actions -->
                  <div
                    id="departament-actions"
                    class="pb-1 d-flex align-center"
                  >
                    <AttachDepEmpPopup
                      :departament="item"
                      class="me-2"
                    />
                    <v-icon
                      size="small"
                      class="mx-3"
                      color="warning"
                    >
                      mdi-pencil
                    </v-icon>
                    <!-- <v-btn
                      icon="mdi-pencil"
                      color="warning"
                      class="me-3"
                    >
                    </v-btn> -->
                    <v-btn
                      icon="mdi-delete"
                      color="error"
                      class="me-3"
                      v-if="item.xodimlar.length <= 0"
                    ></v-btn>
                  </div>
                </div>
              </v-card-title>
            </v-card-item>

            <v-divider></v-divider>

            <v-card-text>
              <v-list lines="three">
                <v-list-item
                  class="rounded"
                  v-for="xodim in item.xodimlar"
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

              

              
            </v-card-text>
            <v-card-actions> </v-card-actions>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import AttachDepEmpPopup from '../dialogs/AttachDepEmpPopup.vue'

export default {
  name: 'DepartamentExPanel',
  data: () => ({}),
  methods: {},
  computed: {
    departaments() {
      return this.$store.state.departament.departaments
    },
    departamentsWithEmployee() {
      return this.$store.state.departament.departamentsWithEmployee
    },
  },
  mounted() {},
  components: { AttachDepEmpPopup },
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
