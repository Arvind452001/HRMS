import React from "react";
import DashboardHeader from "../../../components/hrDashboard-components/DashboardHeader";
import JanuaryOverview from "../../../components/hrDashboard-components/JanuaryOverview";
import EmployeesWorkHours from "../../../components/hrDashboard-components/EmployeesWorkHours";
import NewHiresThisMonth from "../../../components/hrDashboard-components/NewHiresThisMonth";
import TodaysSchedule from "../../../components/hrDashboard-components/TodaysSchedule";


const HrDashboard = () => {
  return (
    /* 👇 Screen height ke andar lock */
    <div className="h-screen overflow-hidden">
      
      {/* Header (fixed height) */}
      <div className="shrink-0">
        <DashboardHeader />
      </div>

      {/* 👇 Scrollable dashboard content */}
      <div className="h-[calc(100vh-72px)] overflow-y-auto space-y-3 pr-2">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
          <div className="xl:col-span-1">
            <JanuaryOverview />
          </div>

          <div className="xl:col-span-2">
            <EmployeesWorkHours />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-12">
          <div className="xl:col-span-5">
            <NewHiresThisMonth />
          </div>

          <div className="xl:col-span-7">
            <TodaysSchedule />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HrDashboard;
