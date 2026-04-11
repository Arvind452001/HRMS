import React from 'react'
import Attendance from '../../Employee-Component/dashboardComponent/Attendance'
import AttendanceCalendar from '../../Employee-Component/dashboardComponent/AttendanceCalendar'

const Dashboard = () => {
  return (
    <div>
      <Attendance/>
      <AttendanceCalendar/>
    </div>
  )
}

export default Dashboard
