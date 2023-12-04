<script setup>
import departamentImg from '@images/misc/departamentImg.png'
import triangleDark from '@images/misc/triangle-dark.png'
import triangleLight from '@images/misc/triangle-light.png'
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import { useStore } from 'vuex'

const { global } = useTheme()
const triangleBg = computed(() => (global.name.value === 'light' ? triangleLight : triangleDark))

const store = useStore()

// Data
const allDepartamentCount = ref(null)

// Methods
function getDepartamentData() {
  store.dispatch("getDepartament", {page: 1, itemsPerPage: 10}).then(res => {
    allDepartamentCount.value = res.headers['x-total-count']
  })
}

// Mounted
onMounted(() => {
  getDepartamentData()
})

</script>

<template>
  <VCard
    title="Bo'limlar"
    subtitle="Ayni vaqtdagi bo'limlar soni soni"
    class="position-relative"
  >
    <VCardText>
      <h5 class="text-2xl font-weight-medium text-primary">
        {{ allDepartamentCount }}
      </h5>
      <p class="d-flex">
        <span class="text-caption text-success d-flex align-center me-3">
          <span>10</span>
          <v-icon icon="mdi-menu-up"></v-icon>
        </span>
        <span class="text-caption text-error d-flex align-center">
          <span>-5</span>
          <v-icon icon="mdi-menu-down"></v-icon>
        </span>
      </p>
      <VBtn
        size="small"
        :to="{ name: 'bolimlar_royxati' }"
        class="text-capitalize"
      >
        Bo'limlar
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />

    <!-- Employee Img -->
    <VImg
      :src="departamentImg"
      class="departamentImg"
    />
  </VCard>
</template>

<style lang="scss">
@use '@layouts/styles/mixins' as layoutsMixins;

.v-card .triangle-bg {
  position: absolute;
  inline-size: 10rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.v-card .departamentImg {
  position: absolute;
  inline-size: 40%;
  inset-block-end: 0;
  inset-inline-end: 0;
  padding: 20px;
}
</style>
