// AddSalaryPage.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { createSalaryApi, updateSalaryApi, getSalaryByIdApi } from '../../../../api/Salary.Api';
import { getAllEmployeesApi } from '../../../../api/employee-Api';
import { toast } from 'react-toastify';

export default function AddSalaryPage() {
    const navigate = useNavigate();
  const { id } = useParams(); // only id from params now
  const location = useLocation(); // to get current path
//  const { mode, id } = useParams(); // mode = 'add', 'view', 'edit'
  
  // Determine mode from URL path
  const pathname = location.pathname;
  const isViewMode = pathname.includes('/view/');
  const isEditMode = pathname.includes('/edit/');
  const isAddMode = pathname.includes('/add/');

  // const isViewMode = mode === 'view';
  // const isEditMode = mode === 'edit';
  // const isAddMode = mode === 'add';

  const [employees, setEmployees] = useState([]);
  // console.log("employees",employees)
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode || isViewMode);
  const [form, setForm] = useState({
    employee: "",
    salaryType: "monthly",
    effectiveFrom: "",
    basic: "",
    hra: "",
    da: "",
    specialAllowance: "",
    bonus: "",
    pf: "",
    esi: "",
    tax: "",
    otherDeduction: "",
  });

  // Fetch employees for dropdown
  useEffect(() => {
    loadEmployees();
  }, []);

  // If editing or viewing, fetch salary data
  useEffect(() => {
    if ((isEditMode || isViewMode) && id) {
      loadSalaryData();
    }
  }, [id, isEditMode, isViewMode]);

  const loadEmployees = async () => {
    try {
      const res  = await getAllEmployeesApi();
      // console.log("data",res?.data)
      setEmployees(res?.data || []);
    } catch (error) {
      toast.error('Failed to load employees');
    }
  };

  const loadSalaryData = async () => {
    console.log("running")
    try {
      setPageLoading(true);
      const res  = await getSalaryByIdApi(id);
      const data= res.data.data
      console.log("sallay-Details",res.data.data)
      setForm({
        employee: data.employee?._id || data.employee || "",
        salaryType: data.salaryType || "monthly",
        effectiveFrom: data.effectiveFrom ? data.effectiveFrom.split('T')[0] : "",
        basic: data.basic || "",
        hra: data.hra || "",
        da: data.da || "",
        specialAllowance: data.specialAllowance || "",
        bonus: data.bonus || "",
        pf: data.pf || "",
        esi: data.esi || "",
        tax: data.tax || "",
        otherDeduction: data.otherDeduction || "",
      });
    } catch (error) {
      toast.error('Failed to load salary data');
      navigate('/salary-list');
    } finally {
      setPageLoading(false);
    }
  };

  const updateField = (key, value) => {
    if (isViewMode) return; // Disable editing in view mode
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Calculations
  const basic = parseFloat(form.basic) || 0;
  const hra = parseFloat(form.hra) || 0;
  const da = parseFloat(form.da) || 0;
  const special = parseFloat(form.specialAllowance) || 0;
  const bonus = parseFloat(form.bonus) || 0;
  const pf = parseFloat(form.pf) || 0;
  const esi = parseFloat(form.esi) || 0;
  const tax = parseFloat(form.tax) || 0;
  const other = parseFloat(form.otherDeduction) || 0;

  const gross = basic + hra + da + special + bonus;
  const totalDeduction = pf + esi + tax + other;
  const net = gross - totalDeduction;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) return;

    if (!form.employee) {
      toast.error('Please select an employee');
      return;
    }
    if (!form.effectiveFrom) {
      toast.error('Please select effective date');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        basic,
        hra,
        da,
        specialAllowance: special,
        bonus,
        pf,
        esi,
        tax,
        otherDeduction: other,
      };

      if (isEditMode) {
        await updateSalaryApi(id, payload);
        toast.success('Salary updated successfully');
      } else {
        await createSalaryApi(payload);
        toast.success('Salary Added successfully');
      }
      navigate('/hr/salary');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Get selected employee name for view mode title
  const selectedEmployee = employees?.find(emp => emp._id === form.employee);
  const pageTitle = isAddMode ? 'Add New Salary Structure' 
                    : isEditMode ? `Edit Salary - ${selectedEmployee?.name || ''}`
                    : `View Salary - ${selectedEmployee?.name || ''}`;

  return (
    <div className="min-h-screen bg-base-200 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-3xl text-primary mb-6">{pageTitle}</h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Employee Select */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Employee *</span>
                  </label>
                  <select
                    className={`select select-bordered w-full ${isViewMode ? 'select-ghost bg-base-200' : ''}`}
                    value={form.employee}
                    onChange={(e) => updateField('employee', e.target.value)}
                    required
                    disabled={isViewMode}
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.personal.fullName} - {emp.professional.employeeId}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Salary Type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Salary Type</span>
                  </label>
                  <select
                    className={`select select-bordered ${isViewMode ? 'select-ghost bg-base-200' : ''}`}
                    value={form.salaryType}
                    onChange={(e) => updateField('salaryType', e.target.value)}
                    disabled={isViewMode}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                {/* Effective Date */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Effective From *</span>
                  </label>
                  <input
                    type="date"
                    className={`input input-bordered ${isViewMode ? 'input-ghost bg-base-200' : ''}`}
                    value={form.effectiveFrom}
                    onChange={(e) => updateField('effectiveFrom', e.target.value)}
                    required
                    disabled={isViewMode}
                  />
                </div>
              </div>

              {/* Earnings Section */}
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-3 text-success">Earnings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['basic', 'hra', 'da', 'specialAllowance', 'bonus'].map((field) => (
                    <div className="form-control" key={field}>
                      <label className="label">
                        <span className="label-text capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                      <input
                        type="number"
                        className={`input input-bordered ${isViewMode ? 'input-ghost bg-base-200' : ''}`}
                        placeholder="0"
                        value={form[field]}
                        onChange={(e) => updateField(field, e.target.value)}
                        disabled={isViewMode}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Deductions Section */}
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-3 text-error">Deductions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {['pf', 'esi', 'tax', 'otherDeduction'].map((field) => (
                    <div className="form-control" key={field}>
                      <label className="label">
                        <span className="label-text capitalize">{field.replace(/([A-Z])/g, ' $1')}</span>
                      </label>
                      <input
                        type="number"
                        className={`input input-bordered ${isViewMode ? 'input-ghost bg-base-200' : ''}`}
                        placeholder="0"
                        value={form[field]}
                        onChange={(e) => updateField(field, e.target.value)}
                        disabled={isViewMode}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Card */}
              <div className="mt-6 p-4 bg-base-200 rounded-xl">
                <h4 className="font-semibold text-md mb-2">Salary Summary</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="stat">
                    <div className="stat-title text-primary">Gross Salary</div>
                    <div className="stat-value text-primary text-2xl">₹{gross.toLocaleString()}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-error">Total Deduction</div>
                    <div className="stat-value text-error text-2xl">₹{totalDeduction.toLocaleString()}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title text-success">Net Salary</div>
                    <div className="stat-value text-success text-2xl">₹{net.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => navigate('/salary-list')}
                >
                  Back
                </button>
                {!isViewMode && (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading && <span className="loading loading-spinner loading-sm"></span>}
                    {isEditMode ? 'Update' : 'Save'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}