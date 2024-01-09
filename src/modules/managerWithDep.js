import ManagerWithDepService from "@/service/managerWithDep";

const state = {
  loading: false,
  managersWithDep: null,
  managerWithDepByMngrId: null,
  attachMngrDepPopup: false
}

const mutations = {

  // Popup
  attachMngrDepPopupOpen(state) {
    state.attachMngrDepPopup = true
  },
  attachMngrDepPopupClose(state) {
    state.attachMngrDepPopup = false
  }
}

const actions = {
  
}

const getters = {

}

export default {
  state, mutations, actions, getters
}







