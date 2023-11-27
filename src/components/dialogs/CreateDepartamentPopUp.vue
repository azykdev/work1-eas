/* stylelint-disable CssSyntaxError */
<script setup>
import CreateDepartamentForm from '@/components/forms/CreateDepartamentForm.vue'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'

// getting store
const store = useStore()

// DATA -------------------------------------------------
const popupOpen = ref(null)
const popupClose = ref(null)

// METHODS ---------------------------------------------------
const closePopup = () => {
  popupClose.value.$el.click()
}

// watch -------------------------------------------------
watch(() => {
  if(store.state.departament.departamentPopupOpen) {
    
    popupOpen.value = document.getElementById('popup-open')
    popupOpen.value.click()
    
    store.commit("openPopupEnd")
  }
})
</script>

<template>
  <v-dialog max-width="600">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        text="Bo'lim qo'shish"
        prepend-icon="mdi-plus"
        color="success"
        id="popup-open"
      >
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Bo'lim qo'shish">
        <v-card-text>
          <CreateDepartamentForm @close-popup="closePopup" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            ref="popupClose"
            text="Oynani yopish"
            @click="isActive.value = false"
            id="popup-close"
            size="small"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
#popup-close {
  /* stylelint-disable-next-line liberty/use-logical-spec */
  margin-top: -60px;
}
</style>
