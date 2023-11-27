<script setup>
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useTheme } from 'vuetify'

const form = ref({
  username: '',
  email: '',
  password: '',
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)

async function postUsers(url, user) {
  try {
    return await axios.post(url, user)
  } catch (error) {
    console.log("ERROR " + error)
  }
}
</script>

<template>
        


  
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
