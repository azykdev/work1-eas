<script>
// IMPORTS
import CreateDepartamentPopUp from '@/components/dialogs/CreateDepartamentPopUp.vue'
import DepartamentExPanel from '@/components/expansionPanel/DepartamentExPanel.vue'

export default {
  name: 'DepartamentList',
  components: {
    CreateDepartamentPopUp,
    DepartamentExPanel
  },
  data() {
    return {
      loaded: false,
      loading: false,
    }
  },
  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  },
  computed: {
    departaments() {
      return this.$store.state.departament.departaments
    }
  },
  mounted() {
    this.$store.dispatch('getDepartament')
  }
}
</script>

<template>
  <v-row class="my-2">
    <v-col
      cols="12"
      sm="6"
      class="d-flex align-center"
    >
      <CreateDepartamentPopUp />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-form class="d-flex align-center justify-space-between">
        <v-text-field
          append-inner-icon="mdi-magnify"
          :loading="loading"
          variant="solo-filled"
          label="Search templates"
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-form>
    </v-col>
  </v-row>

  <div>
    <DepartamentExPanel v-if="departaments" :departaments="departaments"  />
  </div>

  
  
</template>
