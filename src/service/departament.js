import axios from "./axios";

const DepartamentService = {
  // GET
  getDepartament(payload) {
    return axios.get("/bulim/bulimlar", {
      params: {
        skip: payload.page,
        limit: payload.itemsPerPage,
      }
    })
  },
  getEmpDep(payload) {
    return axios.get("/xodim-bulim/bulimlar")
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
