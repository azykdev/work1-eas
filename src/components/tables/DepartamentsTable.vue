<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="$store.state.departament.totalItems"
    :items="$store.state.departament.serverItems"
    :loading="$store.state.departament.loading"
    class="elevation-1"
    @update:options="loadItems"
  >
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
export default {
  data: () => ({
    itemsPerPage: 10,
    headers: [
      { key: 'id', title: '№', align: 'start', sortable: false },
      { key: 'bulim_name', title: 'Bo\'lim nomi', align: 'center' },
      { key: 'actions', title: '', align: 'center', sortable: false },
    ],
  }),
  methods: {
    loadItems({ page, itemsPerPage }) {
      this.$store.dispatch('getDepartament', { page, itemsPerPage })
    },
    deleteItem(item) {
      this.$store.dispatch('deleteDepartament', item.value)
      this.$store.dispatch('getDepartament', { page: 1, itemsPerPage: 10 })
    },
    editItem(item) {
      this.$store.dispatch('getDepEditData', item.value)
    }
  },
}
</script>
