import axios from "./axios";

const EmployeeService = {
  // GET
  getEmployee(payload) {
    return axios.get("/xodim/xodimlar", {
      params: {
        skip: payload.page,
        limit: payload.itemsPerPage,
      }
    })
  },
  // POST
  postEmployee(data) {
    return axios.post("/xodim/xodimlar", data)
  },
  // DELETE
  deleteEmployee(id) {
    return axios.delete(`/employees/${id}`)
  },
  // EDIT
  getEmpEditData(id) {
    return axios.get(`/employees/${id}`)
  }
}

export default EmployeeService
