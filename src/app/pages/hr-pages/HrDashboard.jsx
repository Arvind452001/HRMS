import React, { useState } from "react";

const stepsConfig = [
  { id: 1, title: "API Details" },
  { id: 2, title: "Company Info" },
  { id: 3, title: "Documents Upload" },
  { id: 4, title: "Final Review" },
];

const HrDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const [steps, setSteps] = useState([
    { stepNumber: 1, status: "unlocked", data: {} },
    { stepNumber: 2, status: "locked", data: {} },
    { stepNumber: 3, status: "locked", data: {} },
    { stepNumber: 4, status: "locked", data: {} },
  ]);

  const getStatus = (id) =>
    steps.find((s) => s.stepNumber === id)?.status;

  const submitStep = (stepNumber, formData) => {
    setSteps((prev) =>
      prev.map((s) =>
        s.stepNumber === stepNumber
          ? { ...s, status: "pending", data: formData }
          : s
      )
    );
  };

  const approveStep = (stepNumber) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.stepNumber === stepNumber)
          return { ...s, status: "approved" };
        if (s.stepNumber === stepNumber + 1)
          return { ...s, status: "unlocked" };
        return s;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

        {/* Role Switch */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-600">
            HRMS Multi-Step Workflow
          </h1>

          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            Switch to {isAdmin ? "User" : "Admin"}
          </button>
        </div>

        {/* Stepper */}
        <ul className="steps steps-horizontal w-full mb-10">
          {stepsConfig.map((step) => {
            const status = getStatus(step.id);

            return (
              <li
                key={step.id}
                className={`step ${
                  status === "approved"
                    ? "step-success"
                    : status === "pending"
                    ? "step-warning"
                    : ""
                }`}
              >
                {step.title}
              </li>
            );
          })}
        </ul>

        {/* USER VIEW */}
        {!isAdmin && (
          <div>
            {steps.map((step) =>
              step.status === "unlocked" ? (
                <StepForm
                  key={step.stepNumber}
                  step={step}
                  onSubmit={submitStep}
                />
              ) : step.status === "pending" ? (
                <div
                  key={step.stepNumber}
                  className="alert alert-warning mb-4"
                >
                  Step {step.stepNumber} is waiting for admin approval ⏳
                </div>
              ) : null
            )}
          </div>
        )}

        {/* ADMIN VIEW */}
        {isAdmin && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Admin Approval Panel
            </h2>

            {steps.map(
              (step) =>
                step.status === "pending" && (
                  <div
                    key={step.stepNumber}
                    className="card bg-base-100 shadow-lg mb-4"
                  >
                    <div className="card-body">
                      <h3 className="font-semibold">
                        Step {step.stepNumber}
                      </h3>
                      <pre className="bg-gray-100 p-2 rounded text-sm">
                        {JSON.stringify(step.data, null, 2)}
                      </pre>
                      <button
                        onClick={() =>
                          approveStep(step.stepNumber)
                        }
                        className="btn btn-success mt-3"
                      >
                        Approve ✅
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StepForm = ({ step, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(
      new FormData(e.target).entries()
    );
    onSubmit(step.stepNumber, formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-xl mb-6"
    >
      <div className="card-body">
        <h2 className="card-title">
          Step {step.stepNumber} - Fill Details
        </h2>

        <input
          name="field1"
          placeholder="Enter value"
          className="input input-bordered w-full"
          required
        />

        <button className="btn btn-primary mt-4">
          Submit for Approval
        </button>
      </div>
    </form>
  );
};



export default HrDashboard;
