// components/templates/dashboard/DashboardRouter.tsx
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../templates/dashboard/Dashboard";
import HomePage from "../../pages/HomePage";

const DashboardRouter = () => {
  const location = useLocation();

  return (
    <Dashboard>
      <Routes location={location}>
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Dashboard>
  );
};

export default DashboardRouter;
