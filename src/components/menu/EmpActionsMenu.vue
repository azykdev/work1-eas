<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      location="end"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="grey-900"
          v-bind="props"
          icon="mdi-dots-vertical"
          variant="text"
        >
        </v-btn>
      </template>

      <v-card max-width="650">
        <v-list>
          <v-list-item
            :prepend-avatar="employee.raw.fullName.image"
            :title="employee.raw.fullName.name"
          >
            <template v-slot:append>
              <v-btn
              class="ms-2"
                variant="tonal"
                icon="mdi-pencil"
                color="grey-500"
                @click="editItem"
              ></v-btn>
              <v-btn
                variant="text"
                icon="mdi-delete"
                color="error"
                @click="deleteItem"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

      </v-card>
    </v-menu>
  </div>
</template>

<script>
import employee from '@/modules/employee'

export default {
  name: 'EmpActionsMenu',
  data: () => ({
    menu: false,
    // active: false,
    hints: true,
  }),
  props: {
    employee: {
      type: Object,
    },
  },
  methods: {
    deleteItem() {
      if (confirm('Are you sure you want to delete this item?')) {
        this.$store.dispatch('deleteEmployee', this.employee.value).then(() => {
          this.$store.dispatch('getEmployee', { page: 1, itemsPerPage: 10 })
        })
        this.menu = false
      }
    },
    editItem() {
      this.$store.dispatch('getEmpEditData', this.employee.value)
      this.menu = false
    },
    
  },
}
</script>

<style scoped></style>
