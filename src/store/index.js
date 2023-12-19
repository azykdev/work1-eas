import { createStore } from 'vuex'
import employee from '@/modules/employee'
import departament from '@/modules/departament'
import departamentWithEmp from '@/modules/departamentWithEmp'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { employee, departament, departamentWithEmp }
})

export default store
