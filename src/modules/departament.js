import DepartamentService from "@/service/departament";

const state = {
  loading: false,
  serverItems: [],
  totalItems: null,
  errors: null,
  editItemData: null, // Edit Data
  popup: false, // Popup
}

const mutations = {
  postDepartamentStart(state) {
    state.loading = true
  },
  postDepartamentSuccess(state) {
    state.loading = false
  },
  postDepartamentError(state) {
    state.loading = false
  },

  // Edit data
  // FIXME CreateDepartamentPopup componentda bo'lim qo'shish tugmasi bosilganda ushbu funksiyani ishlatish mukin ! Agar bu funksiya ishlatilsa closePopup mutatsiyasidagi 36-qatordagi kod o'chirilishi kerak.
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
  // GET departament
  getDepartament(context, payload) {
    return new Promise((resolve, reject) => {

      context.commit("postDepartamentStart") 

      DepartamentService.getDepartament(payload).then(res => {

        console.log(res);

        state.serverItems = []
        
        // Bo'limlarga tartib raqam berish
        res.data.forEach((item, i) => {
          item.num = i + 1
          state.serverItems.push(item)
        });

        state.totalItems = res.headers["x-total-count"]

        context.commit("postDepartamentSuccess") 

        resolve(res)
      }).catch(err => {
        context.commit("postDepartamentError")  

        reject(err)
      })
    })
  },

  // POST departament
  postDepartament(context, departament) {
    return new Promise((resolve, reject) => {

      context.commit("postDepartamentStart")  

      DepartamentService.postDepartament(departament).then(res => {
        context.commit("postDepartamentSuccess")  
        resolve(res)
        }).catch(err => {
        context.commit("postDepartamentError") // TODO bu yerda ikkinchi parametrga error data beriladi
        reject(err)
      })
    })
  },

  // DELETE departament
  deleteDepartament(context, id) {
    return new Promise((resolve, reject) => {

      context.commit("postDepartamentStart") 

      DepartamentService.deleteDepartament(id).then(res => {

        context.commit("postDepartamentSuccess") 

        resolve(res)
      }).catch(err => {

        context.commit("postDepartamentError") 

        reject(err)
      })
      
    })
  },

  // PUT departament
  getDepEditData(context, id) {
    return new Promise((resolve, reject) => {
      DepartamentService.getDepEditData(id).then(res => {

        state.editItemData = res.data
        context.commit("openPopup")

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  putDepartament(context, data) {
    return new Promise((resolve, reject) => {
      DepartamentService.putDepartament(data.id, data).then(res => {
        console.log(res);
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
