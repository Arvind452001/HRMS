// SalaryStructurePage.jsx (Parent Component)
import { useEffect, useState } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SalaryStructureForm from "./SalaryStructureForm";
import SalaryStructureTable from "./SalaryStructureTable";
import {
  getSalaryStructureByIdHR,
  createSalaryStructureHR,
  updateSalaryStructureHR,
} from "../../../../api/Salary.Api";
import { getAllEmployeesApi } from "../../../../api/employee-Api";
import Swal from "sweetalert2";

// ✅ Import the correct API function to get ALL employees

function SalaryStructureFormWrapper({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee: "",
    effectiveFrom: "",
    basicSalary: 0,
    hra: 0,
    allowances: 0,
    bonus: 0,
    pf: 0,
    esi: 0,
    professionalTax: 0,
    otherDeductions: 0,
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const isView = mode === "view";
  const isEdit = mode === "edit";

  // ✅ Load ALL employees – corrected API call
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployeesApi(); // ✅ correct function
        setEmployees(res?.data || []);
      } catch (error) {
        toast.error("Failed to load employees");
        console.error(error);
      }
    };
    fetchEmployees();
  }, []);

  // Load salary structure if edit/view
  useEffect(() => {
    if ((isEdit || isView) && id) {
      const fetchSalary = async () => {
        try {
          const res = await getSalaryStructureByIdHR(id);
          // ✅ Ensure date field is in YYYY-MM-DD format for input[type="date"]
          const salaryData = res?.data?.data || {};
          if (salaryData.effectiveFrom) {
            salaryData.effectiveFrom = salaryData.effectiveFrom.split("T")[0];
          }
          setFormData(salaryData);
        } catch (error) {
          toast.error("Failed to load salary structure");
          navigate("/hr/salary-structure");
        } finally {
          setInitialLoading(false);
        }
      };
      fetchSalary();
    } else {
      setInitialLoading(false);
    }
  }, [id, isEdit, isView, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await Swal.fire({
    title: isEdit ? "Update Salary Structure?" : "Create Salary Structure?",
    text: isEdit
      ? "Are you sure you want to update this salary structure?"
      : "Are you sure you want to create this salary structure?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: isEdit ? "Yes, Update" : "Yes, Create",
  });

  if (!result.isConfirmed) return;

  setLoading(true);

  try {
    if (isEdit) {
      await updateSalaryStructureHR(id, formData);
    } else {
      await createSalaryStructureHR(formData);
    }

    await Swal.fire({
      title: "Success!",
      text: isEdit
        ? "Salary structure updated successfully."
        : "Salary structure created successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    navigate("/hr/salary-structure");
  } catch (error) {
    console.error(error);

    Swal.fire({
      title: "Error!",
      text:
        error?.response?.data?.message ||
        (isEdit
          ? "Failed to update salary structure."
          : "Failed to create salary structure."),
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    setLoading(false);
  }
};

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <SalaryStructureForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      employees={employees}
      loading={loading}
      isView={isView}
      isEdit={isEdit}
    />
  );
}

export default function SalaryStructurePage() {
  return (
    <Routes>
      <Route index element={<SalaryStructureTable />} />
      <Route path="add" element={<SalaryStructureFormWrapper mode="create" />} />
      <Route path="edit/:id" element={<SalaryStructureFormWrapper mode="edit" />} />
      <Route path="view/:id" element={<SalaryStructureFormWrapper mode="view" />} />
    </Routes>
  );
}