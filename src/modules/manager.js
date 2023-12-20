import ManagerService from "@/service/manager";

const state = {
  createManagerPopup: false, // Popup
}

const mutations = {
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

}

const getters = {
  
}

export default {
  state, mutations, actions, getters
}
