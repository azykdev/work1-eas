<script setup>

import triangleDark from '@images/misc/triangle-dark.png'
import triangleLight from '@images/misc/triangle-light.png'
import employeeImg from '@images/misc/employeeImg.png'
import { useTheme } from 'vuetify'
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';

const { global } = useTheme()
const triangleBg = computed(() => (global.name.value === 'light' ? triangleLight : triangleDark))
const store = useStore()

// Data
const allEmployeeCount = ref(null)

// Methods
function getEmployeeData() {
  store.dispatch("getEmployee", {page: 1, itemsPerPage: 10}).then(res => {
    allEmployeeCount.value = res.headers['x-total-count']
  })
}

// Mounted
onMounted(() => {
  getEmployeeData()
})

</script>

<template>
  <VCard
    title="Xodimlar"
    subtitle="Ayni vaqtdagi xodimlar soni"
    class="position-relative"
  >
    <VCardText>
      <h5 class="text-2xl font-weight-medium text-primary">{{ allEmployeeCount }}</h5>
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
        :to="{ name: 'xodimlar_royxati' }"
        class="text-capitalize"
      >
        Xodimlar
      </VBtn>
    </VCardText>

    <!-- Triangle Background -->
    <VImg
      :src="triangleBg"
      class="triangle-bg flip-in-rtl"
    />

    <!-- Employee Img -->
    <VImg
      :src="employeeImg"
      class="employeeImg "
    />
  </VCard>
</template>

<style lang="scss">
/* stylelint-disable-next-line string-quotes */
@use '@layouts/styles/mixins' as layoutsMixins;

.v-card .triangle-bg {
  position: absolute;
  inline-size: 11rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.v-card .employeeImg {
  position: absolute;
  inline-size: 50%;
  inset-block-end: 0;
  inset-inline-end: 0;
}
</style>
