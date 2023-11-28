import DepartamentService from "@/service/departament";

const state = {
  serverItems: [],
  totalItems: null,
  loading: false,
// Edit Data
  editItemData: null,
// Popup
  departamentPopupOpen: false
}
const mutations = {
  departamentStart(state) {
    state.loading = true
  },
  departamentSuccess(state) {
    state.loading = false
  },
  departamentError(state) {
    state.loading = false
  },
  openPopupStart(state) {
    state.departamentPopupOpen = true
  },
  openPopupEnd(state) {
    state.departamentPopupOpen = false
  }
}
const actions = {
  // Get departament
  getDepartament(context, payload) {
    return new Promise((resolve, reject) => {

      context.commit("departamentStart")

      DepartamentService.getDepartament(payload).then(res => {

        console.log(res);

        state.serverItems = [...res.data]
        state.totalItems = res.headers["x-total-count"]

        context.commit("departamentSuccess")

        resolve(res)
      }).catch(err => {
        context.commit("departamentError")

        reject(err)
      })
    })
  },
  // Post departament
  postDepartament(context, departament) {
    return new Promise((resolve, reject) => {

      context.commit("departamentStart") 

      DepartamentService.postDepartament(departament).then(res => {
        context.commit("departamentSuccess")
        resolve(res)
        }).catch(err => {
        context.commit("departamentError")
        reject(err)
      })
    })
  },
  // delete departament
  deleteDepartament(context, id) {
    return new Promise((resolve, reject) => {
      DepartamentService.deleteDepartament(id).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // Edit departament
  getDepEditData(context, id) {
    return new Promise((resolve, reject) => {
      DepartamentService.getDepEditData(id).then(res => {
        console.log(res);
        state.editItemData = res.data
        context.commit("openPopupStart")
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
const getters = {

}

export default { state, mutations, actions, getters }
