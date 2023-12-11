import axios from "./axios";

const EmployeeService = {
  // GET
  getEmployee(payload) {
    return axios.get("/xodim/xodimlar", {
      params: {
        skip: payload.page,
        limit: payload.itemsPerPage,
        q: payload.q ? payload.q : ''
      }
    })
  },
  // POST
  postEmployee(data) {
    return axios.post("/xodim/xodimlar", data)
  },
  // DELETE
  deleteEmployee(id) {
    return axios.delete(`/xodim/xodimlar/${id}`)
  },
  // EDIT
  getEmpEditData(id) {
    return axios.get(`/xodim/xodim/${id}`)
  },
  putEmployee(id, data) {
    return axios.put(`/xodim/xodimlar/${id}`, data) 
  }
}

export default EmployeeService
