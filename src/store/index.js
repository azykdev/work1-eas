import { createStore } from 'vuex'
import employee from '@/modules/employee'
import departament from '@/modules/departament'
import departamentWithEmp from '@/modules/departamentWithEmp'
import manager from '@/modules/manager'

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { employee, departament, departamentWithEmp, manager }
})

export default store
