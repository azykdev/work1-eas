import ManagerService from "@/service/manager";

const state = {
  loading: false,
  managers: null,
  totalItems: 0,
  errors: null,
  editItemData: null, // Edit Data
  createManagerPopup: false, // Popup
}

const mutations = {

  // GET managers
  getManagersStart(state) {
    state.loading = true
  },
  getManagersSuccess(state, data) {
    state.loading = false
    state.managers = data
  },

  // Popup methods
  managerPopupOpen(state) {
    state.createManagerPopup = true
  },
  managerPopupClose(state) {
    state.createManagerPopup = false
    state.editItemData = null
  },
}

const actions = {
  // GET managers
  getManagers(context) {
    return new Promise((resolve) => {

      context.commit("getManagersStart")

      ManagerService.getManagers().then(res => {
        console.log(res);

        context.commit("getManagersSuccess", res.data)

        resolve(res.data)
      })
    })
  },
}

const getters = {
  
}

export default {
  state, mutations, actions, getters
}
