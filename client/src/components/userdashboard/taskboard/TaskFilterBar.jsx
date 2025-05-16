import React from "react";
import { FaSortDown } from "react-icons/fa";
import TaskTable from "./TaskTable";


const TaskFilterBar = () => {
  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 p-3 rounded-md text-white font-medium shadow-md">
        <span>Filter by :</span>

        <div className="flex items-center gap-2">
          <span>Status :</span>
          <select className="text-black rounded px-2 py-1">
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Blocked</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span>Due Date :</span>
          <select className="text-black rounded px-2 py-1">
            <option>All</option>
            <option>Upcoming</option>
            <option>Overdue</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span>Priority :</span>
          <select className="text-black rounded px-2 py-1">
            <option>All</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="ml-auto px-3 py-1 rounded text-black"
        />
      </div>

      {/* Task Table Below Filter */}
      <TaskTable/>
    </div>
  );
};

export default TaskFilterBar;
