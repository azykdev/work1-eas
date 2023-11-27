import axios from "./axios";

const EmployeeService = {
  // GET
  getEmployee(payload) {
    return axios.get("/employees", {
      params: {
        _limit: payload.itemsPerPage,
        _page: payload.page
      }
    })
  },
  // POST
  postEmployee(data) {
    return axios.post("/employees", data)
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
