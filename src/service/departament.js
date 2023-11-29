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
  // EDIT
  getDepEditData(id) {
    return axios.get(`/bulim/${id}`)
  }
}

export default DepartamentService
