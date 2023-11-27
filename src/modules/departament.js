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
  getDepartamentStart(state) {
    state.loading = true
  },
  getDepartamentSuccess(state) {
    state.loading = false
  },
  getDepartamentError(state) {
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

      context.commit("getDepartamentStart")

      DepartamentService.getDepartament(payload).then(res => {
        state.serverItems = [...res.data]
        state.totalItems = res.headers["x-total-count"]

        context.commit("getDepartamentSuccess")

        resolve(res)
      }).catch(err => {
        context.commit("getDepartamentError")

        reject(err)
      })
    })
  },
  // Post departament
  postDepartament(context, departament) {
    return new Promise((resolve, reject) => {
      DepartamentService.postDepartament(departament).then(res => {
        resolve(res)
        }).catch(err => {
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
