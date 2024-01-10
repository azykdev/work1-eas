<template>
  <v-row class="my-2">
    <v-col
      cols="12"
      sm="6"
      class="d-flex align-center"
    >
      <CreateManagerPopup />
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <v-form class="d-flex align-center justify-space-between">
        <v-text-field
          append-inner-icon="mdi-magnify"
          :loading="loading"
          variant="solo"
          label="Search templates"
          hide-details
          @click:append-inner="onClick"
        ></v-text-field>
      </v-form>
    </v-col>
  </v-row>

  <div>
    <ManagerExPanel v-if="managers" :managers="managers" />
  </div>
</template>

<script>
import CreateManagerPopup from '@/components/dialogs/CreateManagerPopup.vue'
import ManagerExPanel from '@/components/expansionPanel/ManagerExPanel.vue'
export default {
  name: 'ManagerList',
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
  components: {
    CreateManagerPopup,
    ManagerExPanel,
  },
  computed: {
    managers() {
      return this.$store.state.manager.managers
    }
  },
  mounted() {
    this.$store.dispatch('getManagers')
    this.$store.dispatch('getEmployee').then((res) => {
      console.log(res);
    })
  }
}
</script>

<style scoped></style>
