import axios from "./axios";

export const getOrganizationApi = () => axios.get("/organization");

export const createOrganizationApi = (formData) =>
  axios.post('organization', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
export const updateOrganizationApi = (formData) =>
  axios.put('organization', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
