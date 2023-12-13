<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="$store.state.departament.totalItems"
    :items="$store.state.departament.departaments"
    :loading="$store.state.departament.loading"
    :group-by="groupBy"
    item-value="bulim_name"
    class="elevation-1 pb-2 bg-grey-200"
    @update:options="loadItems"
  >
    <template v-slot:item="{ item }">
      <tr cla>
        <td class="pa-0">
          <!-- <VBtn
            size="small"
            variant="text"
            :icon="isGroupOpen(item) ? '$expand' : '$next'"
            @click="toggleGroup(item)"
          ></VBtn>

          <span class="w-75 d-inline-block text-truncate mx-2">{{ item['items'][0].value }}</span>
          
          <v-icon
            size="small"
            class="me-2"
            @click="editItem(item)"
            color="warning"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            @click="deleteItem(item)"
            color="error"
          >
            mdi-delete
          </v-icon> -->

          <v-expansion-panels>
            <v-expansion-panel
              class="rounded-0"
              :key="item.raw.id"
            >
              <v-expansion-panel-title
                class="pa-7 bg-grey-100"
                >{{ item.value }}</v-expansion-panel-title
              >
              <v-expansion-panel-text class="pt-5">
                <!-- {{ item.raw.xodimlar[0].xodim.ism }} -->
                <!-- <v-list>
                  <v-list-item
                    v-for="xodim in item.raw.xodimlar"
                    :key="xodim.id"
                  >
                    <p>{{ xodim.xodim.ism }}</p>
                    <v-divider
                      :thickness="1"
                      class="border-opacity-50"
                      color="info"
                    ></v-divider>
                  </v-list-item>
                </v-list> -->

                <v-row class="pa-0 ma-0">
                  <v-col
                    cols="12"
                    md="4"
                    class="bg-grey-100 rounded"
                  >
                    <!-- Actions -->
                    <div class="py-3 text-end">
                      <v-btn
                        icon="mdi-pencil"
                        color="warning"
                        class="me-3"
                      ></v-btn>
                      <v-btn
                        icon="mdi-delete"
                        color="error"
                        v-if="item.raw.xodimlar.length <= 0"
                      ></v-btn>
                    </div>

                    <!-- Select -->
                    <div class="mt-5">
                      <div>
                        <p class="mb-2 font-weight-medium">Bo'limga xodim biriktirish:</p>
                        <v-select
                          v-model="postEmpDepData.xodim_id"
                          :items="selectItems"
                          item-title="fullName"
                          item-value="id"
                          label="Xodimni tanlang"
                          variant="outlined"
                        ></v-select>
                      </div>

                      <div class="mt-5">
                        <p class="mb-2 font-weight-medium">Xodim lavozimi:</p>
                        <v-text-field
                          v-model="postEmpDepData.lavozim"
                          label="Xodim lavozimi"
                          variant="outlined"
                        ></v-text-field>
                      </div>

                      <v-btn
                        color="success"
                        class="mt-5"
                        @click="attachEmpDep(item)"
                      >
                        Biriktirish
                      </v-btn>
                    </div>
                  </v-col>

                  <!-- <v-divider vertical></v-divider> -->

                  <v-col
                    cols="12"
                    md="8"
                  >
                    <v-list
                      lines="two"
                      v-if="item.raw.xodimlar.length > 0"
                    >
                      <v-list-item
                        v-for="item in item.raw.xodimlar"
                        :key="item.xodim_id"
                        :title="item.xodim.familiya + ' ' + item.xodim.ism + ' ' + item.xodim.sharif"
                        prepend-avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"                        
                      >
                        <v-list-item-subtitle>
                          <span class="me-5">{{ item.lavozim }}</span>
                          <span class="me-5">{{ item.xodim.telefon }}</span>
                          <span class="me-5"> <b>{{ item.xodim.ps_seriya }}</b> {{ item.xodim.ps_raqam }}</span>
                        </v-list-item-subtitle>
                        <v-divider class="mt-3"></v-divider>
                      </v-list-item>
                    </v-list>

                    <p
                      v-else
                      class="text-center mt-15 text-h4"
                    >
                      Xodim biriktirilmagan !
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
              <!-- <v-expansion-panel-text
                
                class="text-center"
              >
                Xodim topilmadi
              </v-expansion-panel-text> -->
            </v-expansion-panel>
          </v-expansion-panels>
          
        </td>
      </tr>
    </template>

    <!-- <template v-slot:item.actions="{ item }">
      <v-icon
        size="small"
        class="me-2"
        @click="editItem(item)"
        color="warning"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
        color="error"
      >
        mdi-delete
      </v-icon>
    </template> -->

    <template v-slot:no-data>
      <p class="text-center my-5">Ma'lumot topilmadi !</p>

      <!-- <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn> -->
    </template>
  </v-data-table-server>
</template>

<script>
export default {
  data: () => ({
    itemsPerPage: 10,
    headers: [
      // { key: 'num', title: '№', align: 'start', sortable: false },
      // { key: 'actions', title: '', align: 'center', sortable: false },
    ],
    // groupBy: [
    //   {
    //     key: 'bulim_name',
    //     order: 'asc',
    //   },
    // ],
    postEmpDepData: {
      xodim_id: null,
      bulim_id: null,
      lavozim: '',
    },
    selectItems: [],
  }),
  methods: {
    loadItems({ page, itemsPerPage }) {
      this.$store.dispatch('getDepartament', { page, itemsPerPage })
    },
    // deleteItem(item) {
    //   if (confirm("O'chirishni xohlaysizmi?")) {
    //     this.$store.dispatch('deleteDepartament', item.value).then(() => {
    //       this.$store.dispatch('getDepartament', { page: 1, itemsPerPage: 10 })
    //     })
    //   }
    // },
    // editItem(item) {
    //   this.$store.dispatch('getDepEditData', item.value)
    // },
    
    attachEmpDep(item) {
      this.postEmpDepData.bulim_id = item.raw.id
      this.$store.dispatch('postEmpDep', this.postEmpDepData)
        .then(() => {
          this.$store.dispatch('getDepartament', { page: 1, itemsPerPage: 10 })
        })
        .finally(() => {
          this.postEmpDepData = {
            xodim_id: null,
            bulim_id: null,
            lavozim: '',
          }
        })
    }
  },
  mounted() {
    this.$store.dispatch('getEmployee', { page: 1, itemsPerPage: 10 }).then(res => {
      this.selectItems = []

      res.data.forEach(item => {
        this.selectItems.push({
          id: item.id,
          fullName: `${item.familiya} ${item.ism} ${item.sharif}`,
        })
      })

      // this.$store.state.employee.departaments.forEach((item) => {
      //   console.log(item.fullName.name);
      // })
    })
  },
}
</script>
