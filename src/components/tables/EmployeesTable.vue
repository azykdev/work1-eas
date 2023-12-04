<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="$store.state.employee.totalItems"
    :items="$store.state.employee.serverItems"
    :loading="$store.state.employee.loading"
    class="elevation-1 pb-2"
    @update:options="loadItems"
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

    <template v-slot:item.isActive="{ item }">
      <v-switch
        color="success"
        v-model="item.raw.isActive"
      ></v-switch>
    </template>

    <template v-slot:item.actions="{ item }">
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
    </template>

    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    headers: [
      { key: 'id', title: '№', align: 'start', sortable: false },
      { key: 'fullName', title: 'F.I.O', align: 'center' },
      { key: 'passport', title: 'Passport seria', align: 'center', sortable: false },
      { key: 'phone', title: 'Telefon', align: 'center', sortable: false },
      { key: 'isActive', title: '', align: 'center', sortable: false },
      { key: 'actions', title: '', align: 'center', sortable: false },
    ],
    itemsPerPage: 10
  }),

  methods: {
    loadItems({ page, itemsPerPage }) {
      this.$store.dispatch('getEmployee', { page, itemsPerPage })
    },
    deleteItem(item) {
      if(confirm("O'chirishni xohlaysizmi?")) {
        this.$store.dispatch('deleteEmployee', item.value).then(() => {
          this.$store.dispatch('getEmployee', { page: 1, itemsPerPage: 10 })
        })
      }
    },
    editItem(item) {
      this.$store.dispatch('getEmpEditData', item.value)
    }
  },
  computed: {
    
  },
}
</script>
