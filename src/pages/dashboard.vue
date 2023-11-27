<script setup>
  import EmployeeCard from '@/components/cards/dashboard/EmployeeCard.vue'
  import DepartamentCard from '@/components/cards/dashboard/DepartamentCard.vue'
</script>

<template>
  <VRow>
    <VCol cols="12" sm="6">
      <EmployeeCard />
    </VCol>
    <VCol cols="12" sm="6">
      <DepartamentCard />
    </VCol>
  </VRow>
</template>



