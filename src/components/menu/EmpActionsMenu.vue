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

      <v-card min-width="400">
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

              ></v-btn>
              <v-btn variant="text" icon="mdi-delete" color="error"></v-btn>
            </template>

          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="success"
              label="Xodim aktivligi"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              v-model="hints"
              color="success"
              label="Ish boshqaruvchi"
              hide-details
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
  export default {
    name: 'EmpActionsMenu',
    data: () => ({
      menu: false,
      message: false,
      hints: true,
    }),
    props: {
      employee: {
        type: Object,
      }
    }
  }
</script>

<style scoped>

</style>
