import EmployeeService from "@/service/employee"

const state = {
  loading: false,
  serverItems: [],
  totalItems: null,
  errors: null,
  editItemData: null, // Edit Data
  popup: false // Popup
}

const mutations = {
  // GET employee
  getEmployeeStart(state) {
    state.loading = true
  },
  getEmployeeSuccess(state) {
    state.loading = false
  },
  getEmployeeError(state) {
    state.loading = false
  },

  // POST employee
  postEmployeeStart(state) {
    state.loading = true
  },
  postEmployeeSuccess(state) {
    state.loading = false
  },
  postEmployeeError(state) {
    state.loading = false
  },
  
  // DELETE employee
  deleteEmployeeStart(state) {
    state.loading = true
  },
  deleteEmployeeSuccess(state) {
    state.loading = false
  },
  deleteEmployeeError(state) {
    state.loading = false
  },

  // PUT employee
  putEmployeeStart(state) {
    state.loading = true
  },
  putEmployeeSuccess(state) {
    state.loading = false
  },
  putEmployeeError(state) {
    state.loading = false
  },

  // Popup mutaions
  employeePopupOpen(state) {
    state.popup = true
  },
  employeePopupClose(state) {
    state.popup = false
    state.editItemData = null
  }

}

const actions = {
  // Get employee
  getEmployee(context, payload) {
    return new Promise((resolve, reject) => {

      context.commit('getEmployeeStart');

      EmployeeService.getEmployee(payload).then(res => {


        const newServerItems = [];

        res.data.forEach((item, i) => {
          const newItem = {
            num: i + 1,
            id: item.id,
            fullName: {
              name: item.ism + " " + item.familiya + " " + item.sharif,
              image: item.image ? item.image : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
            },
            image: item.image,
            fName: item.ism, //+
            lName: item.familiya, //+
            oName: item.sharif, //+
            passport: `${item.ps_seriya} ${item.ps_raqam}`,
            jshir: item.jshir, //+
            seria: item.ps_seriya, //+
            seriaRaqam: item.ps_raqam, //+
            phone: item.telefon, //+
            birthday: item.tug_sana, //+
            gender: item.gender,
            isActive: item.active //+
          }

          newServerItems.push(newItem)
        })

        state.serverItems = JSON.parse(JSON.stringify(newServerItems));
        state.totalItems = res.headers["x-total-count"]
        context.commit('getEmployeeSuccess');

        resolve(res)

      }).catch(err => {
        context.commit('getEmployeeError');

        reject(err)
      })
    })
  },

  // Post employee
  postEmployee(context, employee) {
    return new Promise((resolve, reject) => {

      context.commit("postEmployeeStart")

      EmployeeService.postEmployee(employee).then(res => {

        context.commit("postEmployeeSuccess")

        resolve(res)
        }).catch(err => {

        context.commit("postEmployeeError") // TODO bu yerda ikkinchi parametrga error data beriladi

        reject(err)
      })
    })
  },

  // DELETE employee
  deleteEmployee(context, id) {

    context.commit("deleteEmployeeStart")

    return new Promise((resolve, reject) => {
      EmployeeService.deleteEmployee(id).then(res => {

        context.commit("deleteEmployeeSuccess")    

        resolve(res)
      }).catch(err => {

        context.commit("deleteEmployeeError")

        reject(err)
      })
    })
  },

  // PUT employee
  getEmpEditData(context, id) {
    return new Promise((resolve, reject) => {
      EmployeeService.getEmpEditData(id).then(res => {
        console.log(res);

        state.editItemData = res.data
        context.commit("employeePopupOpen")

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  putEmployee(context, data) {
    return new Promise((resolve, reject) => {

      context.commit("putEmployeeStart")

      EmployeeService.putEmployee(data.id, data).then(res => {

        context.commit("putEmployeeSuccess")

        resolve(res)
      }).catch(err => {

        context.commit("putEmployeeError")

        reject(err)
      })
    })
  }
}


const getters = {

}

export default {
  state, mutations, actions, getters
}
