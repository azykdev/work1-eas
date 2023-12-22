<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="$store.state.employee.totalItems"
    :items="$store.state.employee.employees"
    :loading="$store.state.employee.loading"
    class="elevation-1 pb-2"
    @update:options="loadItems"
    style="min-width: 1000px"
  >
    <!-- full name -->
    <template v-slot:item.fullName="{ item }">
      <div>
        <div class="d-flex align-center">
          <VAvatar
            rounded="lg"
            size="35"
            class="me-3"
            :image="item.raw.fullName.image"
          >
          </VAvatar>
          <div>
            <h6 class="text-base font-weight-regular">
              {{ item.raw.fullName.name }}
            </h6>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:item.menu="{ item }">
      <EmpActionsMenu :employee="item" />
    </template>

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
import EmpActionsMenu from '../menu/EmpActionsMenu.vue'
export default {
  name: 'EmployeesTable',
  data: () => ({
    headers: [
      { key: 'num', title: '№', align: 'start', sortable: false },
      { key: 'fullName', title: 'F.I.O', align: 'start', sortable: false },
      { key: 'passport', title: 'Passport seria', align: 'start', sortable: false },
      { key: 'phone', title: 'Telefon', align: 'start', sortable: false },
      { key: 'menu', title: '', align: 'start', sortable: false },
    ],
    itemsPerPage: 10,
  }),
  components: {
    EmpActionsMenu,
  },
  methods: {
    loadItems({ page, itemsPerPage }) {
      this.$store.dispatch('getEmployee', { page, itemsPerPage })
    },
    
  },
}
</script>
