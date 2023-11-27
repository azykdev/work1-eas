import { createStore } from 'vuex'
import employee from '@/modules/employee'
import departament from '@/modules/departament'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { employee, departament }
})

export default store
