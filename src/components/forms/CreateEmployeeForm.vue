/* stylelint-disable CssSyntaxError */
<script setup>
import useVuelidate from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'
import { vMaska } from 'maska'
import { computed, ref, onMounted, watch } from 'vue'
import { useStore } from 'vuex'

// getting store
const store = useStore()


// DATA ------------------------------------------------- 
const refImgInput = ref()
const employee = ref({
  id: Date.now(),
  image: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
  fName: '',
  lName: '',
  oName: '',
  jshir: '',
  seria: '',
  seriaRaqam: '',
  birthday: '',
  phone: '',
  gender: null,
  isActive: false,
})
// Maska
const MaskOption = ref({
  phoneMaskOption: {
    mask: '+998 (##) ### ## ##',
    // eager: true,
  },
  jshirMaskOption: {
    mask: '##############',
  },
  seriaOption: {
    preProcess: val => val.toUpperCase(),
    mask: '@@'
  },
  seriaRaqamOption: {
    mask: '#######',
  },
});

// METHODS ---------------------------------------------------
// Change avatar
const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') employee.value.image = fileReader.result
    }
  }
}
// Submit form
const submitEmployeeForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    store.dispatch('postEmployee', employee.value).then(() => {
    })

    store.dispatch('getEmployee', { page: 1, itemsPerPage: 10})
  } else {
    alert('Validation failed!')
  }
  
}

// COMPUTED --------------------------------------------------
const editItemDatas = computed(() => {
  return store.state.employee.editItemData
})
// Rules
const rules = computed(() => {
  return {
    fName: { required, minLength: minLength(3), maxLength: maxLength(20) },
    lName: { required, minLength: minLength(3), maxLength: maxLength(20) },
    oName: { required, minLength: minLength(3), maxLength: maxLength(20) },
    jshir: { required, maxLength: minLength(14) },
    seria: { required, maxLength: minLength(2) },
    seriaRaqam: { required, maxLength: minLength(7) },
    birthday: { required },
    phone: { required, minLength: minLength(19) },
    gender: { required },
  }
})
const v$ = useVuelidate(rules, employee)

// MOUNTED ------------------------------------------------
onMounted(() => {
  
}),

// WATCH ------------------------------------------------
watch(() => {
  if(editItemDatas.value) {
    employee.value = JSON.parse(JSON.stringify(editItemDatas.value))
  }
})
</script>

<template>
  <VForm
    @submit.prevent="submitEmployeeForm"
    
  > 
    <VRow>
      <!-- 👉 Avatar -->
      <VCol
        cols="12"
        class="d-flex"
      >
        <!-- 👉 Avatar img-->
        <VAvatar
          rounded="lg"
          size="100"
          class="me-6"
          :image="employee.image"
        ></VAvatar>
        <!-- 👉 Upload avatar img -->
        <div>
          <v-tooltip text="Rasm tanlash">
            <template v-slot:activator="{ props }">
              <VBtn
                v-bind="props"
                color="primary"
                @click="refImgInput?.click()"
              >
                <VIcon
                  icon="mdi-cloud-upload-outline"
                  class="d-sm-none"
                />
                <span class="d-none d-sm-block">Rasm tanlash</span>
              </VBtn>
            </template>
          </v-tooltip>

          <input
            ref="refImgInput"
            type="file"
            name="file"
            accept=".jpeg,.png,.jpg,GIF"
            hidden
            @input="changeAvatar"
          />
          <p class="text-caption my-2">Allowed JPG, GIF or PNG. Max size of 800K</p>
        </div>
      </VCol>

      <!-- 👉 First Name -->
      <VCol cols="12">
        <VTextField
          label="Ism"
          variant="outlined"
          density="comfortable"
          clearable
          prepend-inner-icon="mdi-account"
          v-model="employee.fName"
          :error-messages="v$.fName.$errors.map(e => e.$message)"
        />
      </VCol>

      <!-- 👉 Last Name -->
      <VCol cols="12">
        <VTextField
          label="Familya"
          variant="outlined"
          density="comfortable"
          clearable
          prepend-inner-icon="mdi-account"
          v-model="employee.lName"
          :error-messages="v$.lName.$errors.map(e => e.$message)"
        />
      </VCol>

      <!-- 👉 Other Name -->
      <VCol cols="12">
        <VTextField
          label="Sharif"
          variant="outlined"
          density="comfortable"
          clearable
          prepend-inner-icon="mdi-account"
          v-model="employee.oName"
          :error-messages="v$.oName.$errors.map(e => e.$message)"
        />
      </VCol>

      <VCol cols="12">
        <p class="text-caption font-weight-bold">Passport ma'lumotlari</p>

        <VRow>
          <!-- 👉 JSHIR -->
          <VCol cols="12">
            <VTextField
              label="Jshir"
              variant="outlined"
              density="comfortable"
              clearable
              prepend-inner-icon="mdi-passport-biometric"
              placeholder="Passport jshir raqam"
              v-model="employee.jshir"
              :error-messages="v$.jshir.$errors.map(e => e.$message)"
              v-maska:[MaskOption.jshirMaskOption]
            />
          </VCol>

          <!-- 👉 Passport seria -->
          <VCol
            cols="5"
            sm="4"
          >
            <VTextField
              label="Seria"
              variant="outlined"
              density="comfortable"
              clearable
              prepend-inner-icon="mdi-passport-biometric"
              placeholder="AA"
              v-model="employee.seria"
              :error-messages="v$.seria.$errors.map(e => e.$message)"
              v-maska:[MaskOption.seriaOption]
            />
          </VCol>

          <!-- 👉 Passport seria raqam -->
          <VCol
            cols="7"
            sm="8"
          >
            <VTextField
              label="Seria raqam"
              variant="outlined"
              density="comfortable"
              clearable
              prepend-inner-icon="mdi-passport-biometric"
              placeholder="1234567"
              v-model="employee.seriaRaqam"
              :error-messages="v$.seriaRaqam.$errors.map(e => e.$message)"
              v-maska:[MaskOption.seriaRaqamOption]
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol>
        <p class="text-caption font-weight-bold">Qo'shimcha ma'lumotlar</p>

        <VRow>
          <!-- 👉 Tug'ilgan sana -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              label="Tug'ilgan sana"
              variant="outlined"
              density="comfortable"
              clearable
              prepend-inner-icon="mdi-calendar"
              placeholder="Tug'ilgan sana"
              type="date"
              v-model="employee.birthday"
              :error-messages="v$.birthday.$errors.map(e => e.$message)"
            />
          </VCol>

          <!-- 👉 Phone -->
          <VCol
            cols="12"
            sm="6"
          >
            <VTextField
              label="Telefon raqam"
              variant="outlined"
              density="comfortable"
              clearable
              prepend-inner-icon="mdi-phone"
              placeholder="+998 ("
              v-model="employee.phone"
              :error-messages="v$.phone.$errors.map(e => e.$message)"
              v-maska:[MaskOption.phoneMaskOption]
            />
          </VCol>
        </VRow>
      </VCol>

      <VCol cols="12">
        <v-radio-group
          inline
          v-model="employee.gender"
          :error-messages="v$.gender.$errors.map(e => e.$message)"
        >
          <v-radio
            label="Erkak"
            value="man"
          ></v-radio>
          <v-radio
            label="Ayol"
            value="woman"
          ></v-radio>
        </v-radio-group>
      </VCol>

      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn
          type="submit"
          color="success"
          size="small"

        >
          Yuborish
        </VBtn>
       

        <VBtn
          color="secondary"
          type="reset"
          variant="tonal"
          size="small"
        >
          Tozalash
        </VBtn>
      </VCol>
    </VRow>
    <div>
      <p
        v-for="error in v$.$errors"
        :key="error.$uid"
      >
        {{ error.$property }} - {{ error.$message }},
      </p>
    </div>
  </VForm>
</template>
