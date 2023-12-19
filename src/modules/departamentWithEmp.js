import DepartamentWithEmpService from "@/service/departamentWithEmp";

const state = {
  loading: false,
  departamentsWithEmp: null,
  departamentWithEmpByDepId: null,
  attachDepEmpPopup: false
}

const mutations = {
  // GET
  getDepartamentWithEmpStart(state) {
    state.loading = true
  },
  getDepartamentWithEmpSuccess(state, data) {
    state.loading = false
    state.departamentsWithEmp = data
  },
  // ---------------------- *** -----------------------
  getDepartamentWithEmpByDepIdStart(state) {
    state.loading = true
  },
  getDepartamentWithEmpByDepIdSuccess(state, data) {
    state.loading = false
    state.departamentWithEmpByDepId = data
  },

  // POST
  postDepartamentWithEmpStart(state) {
    state.loading = true
  },
  postDepartamentWithEmpSuccess(state) {
    state.loading = false
  },
  postDepartamentWithEmpFailure(state) {
    state.loading = false
  },

  attachDepEmpPopupOpen(state) {
    state.attachDepEmpPopup = true
  },
  attachDepEmpPopupClose(state) {
    state.attachDepEmpPopup = false
  }
}

const actions = {
  // GET
  getDepartamentWithEmp(context) { // for all departament with employees
    return new Promise((resolve) => {

      context.commit("getDepartamentWithEmpStart")

      DepartamentWithEmpService.getDepartamentWithEmp().then(res => {

        context.commit("getDepartamentWithEmpSuccess", res.data)

        resolve(res)
      })
    })
  },

  getDepartamentWithEmpByDepId(context, id) { // departament with employees by departament id
    return new Promise((resolve) => {

      context.commit("getDepartamentWithEmpByDepIdStart")

      DepartamentWithEmpService.getDepartamentWithEmpByDepId(id).then(res => {

        context.commit("getDepartamentWithEmpByDepIdSuccess", res.data)

        resolve(res)
      })
    })
  },

  // POST 
  postDepartamentWithEmp(context, data) { 
    return new Promise((resolve, reject) => {

      context.commit("postDepartamentWithEmpStart")

      DepartamentWithEmpService.postDepartamentWithEmp(data).then(res => {

        context.commit("postDepartamentWithEmpSuccess")

        resolve(res)
      }).catch(err => {

        context.commit("postDepartamentWithEmpFailure")

        reject(err)
      })
    })
  },
}

const getters = {
  
}

export default {
  state, mutations, actions, getters
}
