import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routes/AppRoutes";

function App() {
  const dummyUser = {
    id: 2,
    name: "Rahul Kumar",
    email: "rahul.employee@example.com",
    role: "employee", // Employee role
    token: "dummy-jwt-token-employee",
  };
  localStorage.setItem("user", JSON.stringify(dummyUser));

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
