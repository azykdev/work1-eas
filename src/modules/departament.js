import DepartamentService from "@/service/departament";

const state = {
  loading: false,
  departaments: null,
  totalItems: 0,
  errors: null,
  editItemData: null, // Edit Data
  createDepPopup: false, // Popup

  // Attach Departament and Employee
  departamentsWithEmployee: [],
  getDepWithEmployeesByDepId: null,
  attachDepEmpPopup: false
}

const mutations = {
  // GET departament
  getDepartamentStart(state) {
    state.loading = true
  },
  getDepartamentSuccess(state) {
    state.loading = false
  },
  getDepartamentError(state) {
    state.loading = false
  },

  // POST departament
  postDepartamentStart(state) {
    state.loading = true
  },
  postDepartamentSuccess(state) {
    state.loading = false
  },
  postDepartamentError(state) {
    state.loading = false
  },

  // DELETE departament
  deleteDepartamentStart(state) {
    state.loading = true
  },
  deleteDepartamentSuccess(state) {
    state.loading = false
  },
  deleteDepartamentError(state) {
    state.loading = false
  },

  // PUT departament
  putDepartamentStart(state) {
    state.loading = true
  },
  putDepartamentSuccess(state) {
    state.loading = false
  },
  putDepartamentError(state) {
    state.loading = false
  },
  

  // Edit data
  // FIXME CreateDepartamentPopup componentda bo'lim qo'shish tugmasi bosilganda ushbu funksiyani ishlatish mukin ! Agar bu funksiya ishlatilsa closePopup mutatsiyasidagi 36-qatordagi kod o'chirilishi kerak.
  // clearEditData(state) {
  //   state.editItemData = null
  // },

  // Popup methods
  departamentPopupOpen(state) {
    state.createDepPopup = true
  },
  departamentPopupClose(state) {
    state.createDepPopup = false
    state.editItemData = null
  },
  attachDepEmpPopupOpen(state) {
    state.attachDepEmpPopup = true
  },
  attachDepEmpPopupClose(state) {
    state.attachDepEmpPopup = false
  }

}

const actions = {
  // GET departament
  getDepartament(context, payload) {
    return new Promise((resolve, reject) => {

      context.commit("getDepartamentStart") 

      DepartamentService.getDepartament(payload).then(res => {

        // console.log(res);

        // state.departaments = []
        // Bo'limlarga tartib raqam berish
        // res.data.forEach((item, i) => {
        //   item.num = i + 1
        //   state.departaments.push(item)
        // });

        state.departaments = JSON.parse(JSON.stringify(res.data));
        state.totalItems = res.headers["x-total-count"]

        context.commit("getDepartamentSuccess") 

        resolve(res)
      }).catch(err => {
        context.commit("getDepartamentError")  

        reject(err)
      })
    })
  },
  getDepWithEmployees(context) {
    return new Promise((resolve, reject) => {

      context.commit("getDepartamentStart")

      DepartamentService.getDepWithEmployees().then(res => {

        state.departamentsWithEmployee = JSON.parse(JSON.stringify(res.data));

        context.commit("getDepartamentSuccess")

        resolve(res)
        
      }).catch(err => {

        context.commit("getDepartamentError")

        reject(err)
      })
    })
  },
  getDepWithEmployeesByDepId(context, id) {
    return new Promise((resolve, reject) => {

      context.commit("getDepartamentStart")

      DepartamentService.getDepWithEmployeesByDepId(id).then(res => {

        state.getDepWithEmployeesByDepId = JSON.parse(JSON.stringify(res.data));

        context.commit("getDepartamentSuccess")

        resolve(res)
      }).catch(err => {

        context.commit("getDepartamentError")

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

  postEmpDep(context, data) {
    return new Promise((resolve, reject) => {

      context.commit("postDepartamentStart")

      DepartamentService.postEmpDep(data).then(res => {

        context.commit("postDepartamentSuccess")

        resolve(res)
      }).catch(err => {

        context.commit("postDepartamentError")

        reject(err)
      })
    })
  },

  // DELETE departament
  deleteDepartament(context, id) {
    return new Promise((resolve, reject) => {

      context.commit("deleteDepartamentStart") 

      DepartamentService.deleteDepartament(id).then(res => {

        context.commit("deleteDepartamentSuccess") 

        resolve(res)
      }).catch(err => {

        context.commit("deleteDepartamentError") 

        reject(err)
      })
      
    })
  },

  // PUT departament
  getDepEditData(context, id) {
    return new Promise((resolve, reject) => {
      DepartamentService.getDepEditData(id).then(res => {

        state.editItemData = res.data
        context.commit("departamentPopupOpen")

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  putDepartament(context, data) {
    return new Promise((resolve, reject) => {

      context.commit("putDepartamentStart")

      DepartamentService.putDepartament(data.id, data).then(res => {
        console.log(res);

        context.commit("putDepartamentSuccess")

        resolve(res)
      }).catch(err => {

        context.commit("putDepartamentError")

        reject(err)
      })
    })
  }
}

const getters = {
  departaments: state => state.departaments,
  // departamentsWithEmployee: state => state.departamentsWithEmployee,
}

export default { state, mutations, actions, getters }
