import axios from "./axios";

const DepartamentService = {
  // GET
  getDepartament(payload) {
    return axios.get("/xodim-bulim/bulimlar", {
      params: {
        skip: payload.page,
        limit: payload.itemsPerPage,
      }
    })
  },

  // POST
  postDepartament(data) {
    return axios.post("/bulim/bulimlar", data)
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
