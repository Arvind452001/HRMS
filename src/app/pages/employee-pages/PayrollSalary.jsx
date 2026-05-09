// EmployeePanel.jsx
import React, { useEffect, useState } from "react";
import SalaryTable from "../../Employee-Component/SalaryTable";
import { getMySalary } from "../../../api/Salary.Api";

const PayrollSalary = () => {
  const [salaries, setSalaries] = useState([]);
 console.log("salaries:", salaries);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getMySalary();
      // console.log("API Response:", res?.data?.data);
      const data = res?.data?.data || [];
      setSalaries(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employee Salaries</h2>
      <SalaryTable salaries={salaries} />
    </div>
  );
};


export default PayrollSalary
