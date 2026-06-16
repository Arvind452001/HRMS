import axiosInstance from "../utils/axiosInstance";



//===========HR-Salary Structures Management Api===========//
export const getAllSalaryStructuresHR = () => axiosInstance.get("/salary/structures/salary-structures");
export const getSalaryStructureByEmpIdHR = (id) => axiosInstance.get(`/salary/getSalaryById/${id}`);
export const getSalaryStructureByIdHR = (id) => axiosInstance.get(`/salary/structures/getById/${id}`);
export const createSalaryStructureHR = (data) => axiosInstance.post("/salary/structures/create", data);
export const updateSalaryStructureHR = (id, data) => axiosInstance.patch(`/salary/structures/update/${id}`, data);
export const deleteSalaryStructureHR = (id) => axiosInstance.delete(`/salary/structures/delete/${id}`);

// //===========HR-Salary Management Api===========//
export const getAllSalariesHR = () => axiosInstance.get("/salary/getAllEmployeeSalaryByMonthAndYear?month=5&year=2026");
export const getSalaryByIdHR = (id) => axiosInstance.get(`/salary/getSalaryById/${id}`);
export const createSalaryHR = (data) => axiosInstance.post("/salary/add-Salary", data);
export const updateSalaryHR = (id, data) => axiosInstance.patch(`/salary/updateSalary/${id}`, data);
export const deleteSalaryHR = (id) => axiosInstance.delete(`/salary/deleteSalary/${id}`);

//====================Employee Api===================//
// Employee - Only own salary
export const getMySalary = () => axiosInstance.get("/salary/getMySalary");
// Optional: salary history
export const getMySalaryHistory = () => axiosInstance.get("/salary/employee/history");


