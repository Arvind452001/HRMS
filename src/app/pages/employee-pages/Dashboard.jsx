import React from 'react'
import Attendance from '../../Employee-Component/Attendance'
import AttendanceCalendar from '../../Employee-Component/AttendanceCalendar'

const Dashboard = () => {
  return (
    <div>
      <Attendance/>
      <AttendanceCalendar/>
    </div>
  )
}

export default Dashboard
