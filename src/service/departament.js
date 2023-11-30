import axios from "./axios";

const DepartamentService = {
  // GET
  getDepartament(payload) {
    return axios.get("/bulimlar", {
      params: {
        _limit: payload.itemsPerPage,
        _page: payload.page
      }
    })
  },
  // POST
  postDepartament(data) {
    return axios.post("/bulimlar", data)
  },
  // DELETE
  deleteDepartament(id) {
    return axios.delete(`/bulimlar/${id}`)
  },
  // PUT
  getDepEditData(id) {
    return axios.get(`/bulim/${id}`)
  },
  putDepartament(id, data) {
    return axios.put(`/bulimlar/${id}`, data) 
  }

}

export default DepartamentService
