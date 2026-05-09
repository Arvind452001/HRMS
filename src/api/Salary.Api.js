import axiosInstance from "../utils/axiosInstance";


//===========HR-Salary Management Api===========//
export const getAllSalariesHR = () => axiosInstance.get("/salary/getAllSalary");
export const getSalaryByIdHR = (id) => axiosInstance.get(`/getSalaryById/${id}`);
export const createSalaryHR = (data) => axiosInstance.post("/salary/add-Salary", data);
export const updateSalaryHR = (id, data) => axiosInstance.patch(`/salary/hr/update/${id}`, data);
export const deleteSalaryHR = (id) => axiosInstance.delete(`/salary/hr/delete/${id}`);

//====================Employee Api===================//
// Employee - Only own salary
export const getMySalary = () => axiosInstance.get("/salary/getMySalary");
// Optional: salary history
export const getMySalaryHistory = () => axiosInstance.get("/salary/employee/history");