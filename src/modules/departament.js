import DepartamentService from "@/service/departament";

const state = {
  serverItems: [],
  totalItems: null,
  loading: false,
// Edit Data
  editItemData: null,
// Popup
  popup: false
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

  // Edit data
  // FIXME CreateDepartamentPopup componentda bo'lim qo'shish tugmasi bosilganda ushbu funksiyani ishlatish mukin !
  // clearEditData(state) {
  //   state.editItemData = null
  // },

  // Popup methods
  openPopup(state) {
    state.popup = true
  },
  closePopup(state) {
    state.popup = false
    state.editItemData = null
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

      context.commit("departamentStart") 

      DepartamentService.deleteDepartament(id).then(res => {

        context.commit("departamentSuccess") 

        resolve(res)
      }).catch(err => {

        context.commit("departamentError") 

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
        context.commit("openPopup")

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
