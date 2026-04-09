import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { Heart, Package, MapPin, Clock, CheckCircle, AlertCircle, User, LogOut, Search, Filter, Truck, Navigation, Phone, Mail, Award, TrendingUp, RefreshCw, CircleCheck, PackageCheck, NotebookPen } from 'lucide-react';
import {API_URL} from "../constant/api"
import axios from 'axios';

const VolunteerDash = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showEscalate, setShowEscalate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activityLog, setActivityLog] = useState([]);
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const { fullname } = JSON.parse(user);
 let avatar = (fullname?.firstname[0] + fullname?.lastname[0]).toUpperCase();



  

 

  const notifications = [
    { type: 'new', message: 'New task assigned: Pickup from Sector 29', time: '10 mins ago' },
    { type: 'reminder', message: 'Task TSK002 scheduled for 2:00 PM today', time: '1 hour ago' },
    { type: 'completed', message: 'Great job! Task TSK028 completed successfully', time: 'Yesterday' }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      assigned: 'bg-blue-100 text-blue-700',
      accepted: 'bg-yellow-100 text-yellow-700',
      'in-transit': 'bg-orange-100 text-orange-700',
      delivered: 'bg-green-100 text-green-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'assigned': return <NotebookPen className="w-5 h-5 text-blue-500" />;
      case 'accepted': return <Package className="w-5 h-5 text-purple-500" />;
      case 'in-transit': return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivered': return <PackageCheck className="w-5 h-5 text-green-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return styles[priority] || 'bg-gray-100 text-gray-700';
  };

  const updateTaskStatus = async(taskId, newStatus) => {

    try {
        const res = await axios.put(
          API_URL.VOLUNTEER_UPDATE_TASK.replace("taskId",taskId),{
            "status":newStatus
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          setShowTaskDetails(false)
          const data = res?.data?.data;
          console.log("ds", data);
          setTasks(data);
        }
      } catch (error) {
        alert(error);
      }
  };

   const getMyStats = async () => {
     try {
       const res = await axios.get(API_URL.VOLUNTEER_STATS, {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
       if (res.status === 200) {
         const data = res?.data?.statistics;
         console.log("st", data);
         setStats(data);
       }
     } catch (error) {
       alert(error);
     }
   };


    const getMyTasks = async () => {
      try {
        const res = await axios.get(
          API_URL.VOLUNTEER_MY_TASKS,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          const data = res?.data?.data;
          console.log("ds", data);
          setTasks(data);
        }
      } catch (error) {
        alert(error);
      }
    };

       const getMyActivityLog = async () => {
         try {
           const res = await axios.get(API_URL.VOLUNTEER_ACTIVITY_LOG, {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           });
           if (res.status === 200) {
             const data = res?.data?.data;
             setActivityLog(data)
             console.log("al", data);
            
           }
         } catch (error) {
           alert(error);
         }
       };

    useEffect(()=>{
      getMyStats();
      getMyTasks();
      getMyActivityLog();
    },[])

    

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-emerald-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-2 rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                <Heart className="w-8 h-8 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Kindkart
                </h1>
                <p className="text-sm text-gray-500">Volunteer Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-emerald-50 rounded-full transition-colors">
                <Mail className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-full">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {fullname?.firstname + " " + fullname?.lastname}
                  </p>
                  <p className="text-xs text-gray-500">Verified Volunteer</p>
                </div>
              </div>
              <Link
                to="/logout"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-2xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {fullname?.firstname + " " + fullname?.lastname}! 🚚
            </h2>
            <p className="text-emerald-50 mb-6">
              Thank you for being a hero! Your efforts make a real difference in
              our community.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">
                  Level {stats?.level} Volunteer
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">
                  {stats?.totalPoints} Points Earned
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">
                  {stats?.pointsNeededForNextLevel} points needed to reach Level{" "}
                  {stats?.nextLevel}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Assigned */}
          <div className="bg-white rounded-xl p-6 h-44 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-blue-500 p-3 rounded-lg text-blue-200`}>
                <NotebookPen />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalTasksAssigned}
            </h3>
            <p className="text-sm text-gray-500">Total Task Assigned</p>
          </div>
          {/* Assigned */}
          <div className="bg-white rounded-xl p-6 h-44 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-yellow-500 p-3 rounded-lg text-yellow-200`}>
                <CheckCircle />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalTasksAccepted}
            </h3>
            <p className="text-sm text-gray-500">Accepted</p>
          </div>
          {/* In Transit */}
          <div className="bg-white rounded-xl p-6 h-44 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-orange-500 p-3 rounded-lg text-orange-200`}>
                <Truck />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalTasksInTransit}
            </h3>
            <p className="text-sm text-gray-500">In Transit</p>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl p-6 h-44 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-green-500 p-3 rounded-lg text-green-200`}>
                <PackageCheck />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalTasksCompleted}
            </h3>
            <p className="text-sm text-gray-500">Completed</p>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl p-6 h-44 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-purple-500 p-3 rounded-lg text-purple-200`}>
                <Award />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalPoints}
            </h3>
            <p className="text-sm text-gray-500">Total Points</p>
          </div>
        </div>

        {/* Notifications Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-blue-400">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-500" />
              Recent Tasks
            </h3>
          </div>
          <div className="space-y-3">
            {stats?.recentTasks?.slice(-5)?.reverse()?.map((rc, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <div className="flex space-x-2 items-end">
                  {getStatusIcon(rc?.status)}
                  <p className="text-sm text-gray-500 mt-1">{rc?.quantity}</p>
                  <p className="text-sm text-gray-500 font-semibold">
                    {rc?.itemName} are
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{rc?.status} </p>
                  {rc?.status === "delivered" && (
                    <p className="text-xs text-gray-500 mt-1">
                      at {new Date(rc?.completedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 p-2">
          <div className="flex space-x-2">
            {["overview", "my-tasks", "activity-log", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </button>
            ))}
          </div>
        </div>

        {/* Assigned Tasks Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              My Assigned Tasks
            </h3>
            <div className="flex space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Task ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Schedule
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.length > 0 &&
                  tasks?.map((task, index) => (
                    <tr
                      key={index}
                      className="hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600">
                          {task.taskId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {task.type === "Pickup" ? (
                            <Package className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Truck className="w-4 h-4 text-orange-500" />
                          )}
                          <span className="text-gray-800">{task.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-800">{task.taskName}</span>
                        <p className="text-xs text-gray-500">
                          Qty: {task.quantity}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <span className="text-sm text-gray-600">
                            {task.location}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-800">
                          {new Date(task.scheduledDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">{task.time}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedTask(task);
                              console.log("vol", task);
                              setShowTaskDetails(true);
                            }}
                            className="px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-semibold"
                          >
                            View
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTask(task);
                              setShowEscalate(true);
                            }}
                            className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-semibold"
                          >
                            Issue
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity Log */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-emerald-600" />
                Recent Activity Log
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {activityLog.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-emerald-600">
                        {log.details.taskId}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                        {log.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 capitalize">
                      {log.details.itemName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.updatedAt).toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.updatedAt).toLocaleDateString("en-us", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600 flex items-center">
                      <div> {log.status === "in_transit" ? 7.5 : 7.5} </div>
                      <div className="flex items-center">+</div>
                    </div>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer">
              <Navigation className="w-8 h-8 text-blue-600 mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">
                Navigate to Location
              </h4>
              <p className="text-sm text-gray-600">
                Get directions to your next pickup or delivery
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all cursor-pointer">
              <Phone className="w-8 h-8 text-green-600 mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">Contact Support</h4>
              <p className="text-sm text-gray-600">
                Need help? Reach out to NGO coordinators
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer">
              <Award className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="font-bold text-gray-800 mb-2">
                View Achievements
              </h4>
              <p className="text-sm text-gray-600">
                Check your volunteer badges and rewards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {showTaskDetails && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Task Details - {selectedTask.id}
            </h3>
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Task Type</p>
                <p className="text-lg font-semibold text-gray-800">
                  {selectedTask.type}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Item Details</p>
                <p className="text-lg font-semibold text-gray-800">
                  {selectedTask.item} (×{selectedTask.quantity})
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedTask.location}
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Contact</p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedTask.phone}
                </p>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Scheduled Time</p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedTask.date} at {selectedTask.time}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-3">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() =>
                      updateTaskStatus(selectedTask.taskId, "accepted")
                    }
                    disabled={["in_transit", "accepted", "delivered"].includes(
                      selectedTask.status
                    )}
                    className={`"px-4 py-2 text-white rounded-lg  transition-colors text-sm font-semibold" ${
                      ["in_transit", "accepted", "delivered"].includes(
                        selectedTask.status
                      )
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    Mark Accepted
                  </button>
                  <button
                    onClick={() =>
                      updateTaskStatus(selectedTask.taskId, "in_transit")
                    }
                    disabled={["in_transit", "delivered"].includes(
                      selectedTask.status
                    )}
                    className={`"px-4 py-2 text-white rounded-lg  transition-colors text-sm font-semibold" ${
                      ["in_transit", "delivered"].includes(selectedTask.status)
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-orange-500 hover:bg-orange-600"
                    }`}
                  >
                    In Transit
                  </button>
                  <button
                    onClick={() =>
                      updateTaskStatus(selectedTask.taskId, "delivered")
                    }
                    disabled={["delivered"].includes(selectedTask.status)}
                    className={`"px-4 py-2 text-white rounded-lg  transition-colors text-sm font-semibold" ${
                      ["delivered"].includes(selectedTask.status)
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Mark Delivered
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowTaskDetails(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Navigation className="w-4 h-4" />
                  <span>Navigate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalate Issue Modal */}
      {showEscalate && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Report Issue - {selectedTask.taskId}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Issue Type
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent">
                  <option>Cannot reach location</option>
                  <option>Contact not responding</option>
                  <option>Item condition issue</option>
                  <option>Vehicle breakdown</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Describe the issue in detail..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Action Required
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent">
                  <option>Reassign to another volunteer</option>
                  <option>Reschedule pickup/delivery</option>
                  <option>Cancel task</option>
                  <option>NGO intervention needed</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEscalate(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowEscalate(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Escalate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerDash;
