// EmployeeSalaryTable.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteSalaryHR, getAllSalariesHR } from '../../../../api/Salary.Api';

export default function EmployeeSalaryTable() {
  const navigate = useNavigate();
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSalaries = async () => {
    try {
      setLoading(true);
      const res = await getAllSalariesHR();
      // console.log(res.data.data)
      setSalaries(res?.data.data);
    } catch (error) {
      toast.error('Failed to load salary data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalaries();
  }, []);

  const handleView = (id) => {
    navigate(`/hr/salary/view/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/hr/salary/edit/${id}`);
  };

  const handleDelete = async (id, employeeName) => {
    if (window.confirm(`Delete salary structure for ${employeeName}?`)) {
      try {
        await deleteSalaryHR(id);
        toast.success('Salary structure deleted successfully');
        loadSalaries(); // Refresh list
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-0">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">Employee Salary</h2>
            <button
              className="btn btn-accent btn-sm"
              onClick={() => navigate('/hr/salary/add')}
            >
              + Add Salary Structure
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra table-md">
              <thead className="bg-primary text-white">
                <tr>
                  <th>SN</th>
                  <th>Employee Name</th>
                  <th>Emp Code</th>
                  <th>Effective From</th>
                  <th>Gross Salary</th>
                  <th>Net Salary</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {salaries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8">
                      No salary structures found. Click "Add Salary Structure" to create one.
                    </td>
                  </tr>
                ) : (
                  salaries.map((salary, index) => (
                    <tr key={salary._id} className="hover">
                      <td className="font-semibold">{index + 1}</td>
                      <td className="font-medium">{salary.employee?.personal?.fullName || 'N/A'}</td>
                      <td>
                        <span className="badge badge-info">
                          {salary.employee?.empCode || salary.employee?.professional?.employeeId}
                        </span>
                      </td>
                      <td>{new Date(salary.effectiveFrom).toLocaleDateString()}</td>
                      <td className="text-success font-semibold">₹{salary.gross?.toLocaleString()}</td>
                      <td className="text-primary font-bold">₹{salary.net?.toLocaleString()}</td>
                      {/* <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-info"
                            onClick={() => handleView(salary._id)}
                            title="View"
                          >
                            👁
                          </button>
                          <button
                            className="btn btn-xs btn-warning"
                            onClick={() => handleEdit(salary._id)}
                            title="Edit"
                          >
                            ✏
                          </button>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => handleDelete(salary._id, salary.employee?.name)}
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}