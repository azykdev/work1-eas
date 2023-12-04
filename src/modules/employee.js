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
  getEmployeeStart(state) {
    state.loading = true
  },
  getEmployeeSuccess(state) {
    state.loading = false
  },
  getEmployeeError(state) {
    state.loading = false
  },

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

        console.log(res);

        const newServerItems = [];

        res.data.forEach(item => {
          const newItem = {
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
      EmployeeService.postEmployee(employee).then(res => {
        resolve(res)
        }).catch(err => {
        reject(err)
      })
    })
  },
  // Delete employee
  deleteEmployee(context, id) {
    return new Promise((resolve, reject) => {
      EmployeeService.deleteEmployee(id).then(res => {

        context.commit("employeePopupOpen")

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // Edit employee
  getEmpEditData(context, id) {
    return new Promise((resolve, reject) => {
      EmployeeService.getEmpEditData(id).then(res => {
        console.log(res);
        state.editItemData = res.data
        resolve(res)
      }).catch(err => {
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
