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
                variant="text"
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

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="employee.raw.isActive"
              color="success"
              label="Xodim aktivligi"
              hide-details
              @change="changeIsActive"
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            @click="menu = false"
            color="grey-500"
          >
            Bekor qilish
          </v-btn>
          <v-btn
            color="primary"
            variant="text"
            @click="menu = false"
          >
            Saqlash
          </v-btn>
        </v-card-actions>
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
    changeIsActive() {

      const newEmployee = {
        id: this.employee.raw.id,
        familiya: this.employee.raw.lName,
        ism: this.employee.raw.fName,
        sharif: this.employee.raw.oName,
        gender: this.employee.raw.gender,
        telefon: this.employee.raw.phone,
        active: this.employee.raw.isActive,
        jshir: this.employee.raw.jshir,
        ps_seriya: this.employee.raw.seria,
        ps_raqam: this.employee.raw.seriaRaqam,
        tug_sana: this.employee.raw.birthday,
      }

      this.$store.dispatch('putEmployee', newEmployee).then(res => {
        console.log(res)
        this.$store.dispatch('getEmployee', { page: 1, itemsPerPage: 10 })
      })
    },
  },
}
</script>

<style scoped></style>
