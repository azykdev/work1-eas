<template>
  <VApp>
    <RouterView />
  </VApp>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$router.push({ name: 'login' })
  }
}
</script>
