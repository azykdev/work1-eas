import axios from "./axios";

const ManagerService = {
  //GET
  getManagers() {
    return axios.get("xodim/xodimlar/ishboshqaruvchilar")
  }
  //POST
  //DELETE
  //PUT
}

export default ManagerService
