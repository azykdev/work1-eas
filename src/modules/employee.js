import EmployeeService from "@/service/employee"

const state = {
  serverItems: [],
  totalItems: null,
  loading: false,
// Edit Data
  editItemData: null,
// Popup
  employeePopupOpen: false
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

  openPopupStart(state) {
    state.employeePopupOpen = true
  },
  openPopupEnd(state) {
    state.employeePopupOpen = false
  }
}

const actions = {
  // Get employee
  getEmployee(context, payload) {
    return new Promise((resolve, reject) => {

      context.commit('getEmployeeStart');

      EmployeeService.getEmployee(payload).then(res => {

        const newServerItems = [];

        res.data.forEach(item => {
          const newItem = {
            id: item.id,
            fullName: {
              name: item.fName + " " + item.lName + " " + item.oName,
              image: item.image ? item.image : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
            },
            image: item.image,
            fName: item.fName,
            lName: item.lName,
            oName: item.oName,
            passport: `${item.seria} ${item.seriaRaqam}`,
            jshir: item.jshir,
            seria: item.seria,
            seriaRaqam: item.seriaRaqam,
            phone: item.phone,
            birthday: item.birthday,
            gender: item.gender,
            isActive: item.isActive
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

export default {
  state, mutations, actions, getters
}
