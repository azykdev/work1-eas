<script setup>
import LoginForm from '@/components/forms/LoginForm.vue'
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})
</script>

<template>
  <div
    id="auth-wrapper"
    class="auth-wrapper d-flex align-center justify-center pa-4 "
  >
    <img src="@/assets/images/pages/login-ico1.png" id="login-ico1"  class="d-none d-md-inline-block" />
    <img src="@/assets/images/pages/login-ico2.png"  id="login-ico2" class="d-none d-md-inline-block" />

    <VCard class="pa-4" style="background-color: #ffffffec;" max-width="1000">
      <VCardItem>
        <VRow class="">
          <VCol
            cols="12"
            md="6"
            class="d-flex align-center justify-center"
          >
            <div
              class="auth-card pa-4 pt-7  rounded"
              max-width="448"
            >
              <VCardItem class="justify-center">
                <template #prepend>
                  <div class="d-flex">
                    <div v-html="logo" />
                  </div>
                </template>

                <VCardTitle class="font-weight-semibold text-2xl text-uppercase"> Materio </VCardTitle>
              </VCardItem>

              <VCardText class="pt-2">
                <h5 class="text-h5 font-weight-semibold mb-1">Materioga xush kelibsiz! 👋🏻</h5>
                <p class="mb-0">Iltimos, hisobingizga kiring va sarguzashtni boshlang</p>
              </VCardText>

              <VCardText>
                <LoginForm />
              </VCardText>
            </div>
          </VCol>
          <VDivider vertical></VDivider>
          <VCol
            cols="12"
            md="6"
            class="d-none d-md-flex align-center justify-center"
          >
            <img
              src="@/assets/images/pages/login-basic.jpg"
              alt="login image"
              style="width: 100%; border-radius: 5px;"
            />
          </VCol>
        </VRow>
      </VCardItem>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
      style="animation: loginIcoAnime2 4s infinite; animation-timing-function: ease-in-out;"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
      style="animation: loginIcoAnime2 5s infinite; animation-timing-function: ease-in-out;"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use '@core/scss/pages/page-auth.scss';

#auth-wrapper {
  height: 100vh;
  background: linear-gradient(90deg, #fffffff0, #ffffff);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

#login-ico1 {
  position: absolute;
  top: 80px;
  left: 80px;
  max-width: 250px;
  animation: loginIcoAnime 2s infinite;
  animation-timing-function: ease-in-out;
}
#login-ico2 {
  position: absolute;
  top: 80px;
  right: 150px;
  max-width: 200px;
  animation: loginIcoAnime 3s infinite;
  animation-timing-function: ease-in-out;
}

@keyframes loginIcoAnime {
  0% {
    transform: translateY(0);

  }
  50% {
    transform: translateY(15px) rotate(2deg) ;  
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes loginIcoAnime2 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1) ;  
  }
  100% {
    transform: scale(1);
  }
  
}
</style>
