import axios from "./axios";

const DepartamentWithEmpService = {

  // GET
  getDepartamentWithEmp() {     // for all departament with employees
    return axios.get("/xodim-bulim/bulimlar")
  },
  getDepartamentWithEmpByDepId(id) {        // departament with employees by departament id
    return axios.get(`/xodim-bulim/bulim/${id}`)
  },

  // POST
  postDepartamentWithEmp(data) {
    return axios.post("/xodim-bulim/bulimlar", data)
  },

}

export default DepartamentWithEmpService
