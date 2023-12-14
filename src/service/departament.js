import axios from "./axios";

const DepartamentService = {
  // GET
  getDepartament(payload) {     // only for all departament
    return axios.get("/bulim/bulimlar", {
      params: {
        skip: payload.page,
        limit: payload.itemsPerPage,
      }
    })
  },
  getDepWithEmployees(payload) {                // all departament with employees
    return axios.get("/xodim-bulim/bulimlar")
  },
  getDepWithEmployeesByDepId(payload) {        // departament with employees by departament id
    return axios.get(`/xodim-bulim/bulim/${payload}`)
  },
  

  // POST
  postDepartament(data) {
    return axios.post("/bulim/bulimlar", data)
  },
  postEmpDep(data) {
    return axios.post("/xodim-bulim/bulimlar", data)
  },

  // DELETE
  deleteDepartament(id) {
    return axios.delete(`/bulim/bulimlar/${id}`)
  },

  // PUT
  getDepEditData(id) {
    return axios.get(`/bulim/bulim/${id}`)
  },
  putDepartament(id, data) {
    return axios.put(`/bulim/bulimlar/${id}`, data) 
  }

}

export default DepartamentService
