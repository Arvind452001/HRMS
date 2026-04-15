import axiosInstance from "../utils/axiosInstance";


// Add these to your existing Salary.Api.js
export const fetchSalaryStructures = () => axiosInstance.get('/salary/getAllSalary');
export const getSalaryByIdApi = (id) => axiosInstance.get(`/salary/getSalaryById/${id}`);
export const createSalaryApi = (data) => axiosInstance.post('/salary/add-Salary', data);
export const updateSalaryApi = (id, data) => axiosInstance.put(`/salary/updateSalary/${id}`, data);
export const deleteSalaryStructure = (id) => axiosInstance.delete(`/salary/deleteSalary/${id}`);