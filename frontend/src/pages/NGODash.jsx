import React, { useEffect, useState } from "react";
import {
  Heart,
  Package,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  User,
  LogOut,
  Search,
  Filter,
  FileText,
  Truck,
  AlertCircle,
  PieChart,
  UserPlus,
  ClipboardList,
} from "lucide-react";
import axios from "axios";
import { API_URL } from "../constant/api";
import { Link } from "react-router-dom";

const NGODash = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAssignVolunteer, setShowAssignVolunteer] = useState(false);
  const [showDistributionLog, setShowDistributionLog] = useState(false);
  const [assignDetail, setAssignDetail] = useState({});
  const [showRequest, setShowRequest] = useState(false);
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [stat, setStat] = useState([]);
  const [pendingDonations, setPendingDonations] = useState([]);
  const token = localStorage.getItem("token");

  const stats = [
    {
      label: "Pending Donations",
      value: "18",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      label: "Items Distributed",
      value: "156",
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      label: "Active Volunteers",
      value: "12",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Total Receivers",
      value: "89",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  const distributions = [
    {
      id: "DS001",
      receiver: "Community Center A",
      item: "Winter Clothes",
      quantity: 20,
      date: "2025-02-15",
      volunteer: "Rahul Kumar",
    },
    {
      id: "DS002",
      receiver: "School Library",
      item: "Books",
      quantity: 50,
      date: "2025-02-16",
      volunteer: "Priya Singh",
    },
  ];

  const alerts = [
    {
      type: "warning",
      message: "Duplicate donation ID detected: DN105",
      severity: "high",
    },
    {
      type: "error",
      message: "Missing inventory record for item #234",
      severity: "critical",
    },
    {
      type: "info",
      message: "Monthly report generation due in 2 days",
      severity: "low",
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      available: "bg-green-100 text-green-700",
      busy: "bg-orange-100 text-orange-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const getConditionColor = (condition) => {
    const colors = {
      used: "bg-blue-100 text-blue-700",
      perishable: "bg-purple-100 text-purple-700",
      new: "bg-green-100 text-green-700",
    };
    return colors[condition] || "bg-gray-100 text-gray-700";
  };

  const getAlertIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "high":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPendingDonations = async () => {
    try {
      const res = await axios.get(API_URL.NGO_ALL_DONATIONS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = res?.data;

        setPendingDonations(data.donations);
        setStat(data.statistics);
      }
    } catch (error) {
      alert(error);
    }
  };

  const acceptDonations = async (donationId) => {
    try {
      const res = await axios.post(
        API_URL.NGO_ACCEPT_DONATIONS.replace("donationId", donationId),
        {
          pickupDate: "",
          notes: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get(API_URL.NGO_REQUESTS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = res.data.data;
        setRequests(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getAllVolunteers = async () => {
    try {
      const res = await axios.get(API_URL.NGO_ALL_VOLUNTEERS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setVolunteers(res.data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getPendingDonations();
    getRequests();
    getAllVolunteers();
  }, []);

  const respondToRequest = async (id, status) => {
    try {
      const res = await axios.put(
        API_URL.NGO_RESPOND_REQUEST.replace("requestId", id),
        {
          status: status,
          responseMessage: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data.data;
      }
    } catch (error) {
      alert(error);
    }
  };

   const assignTask = async () => {
     try {
     if(assignDetail.requestId && assignDetail.requestId) { 
      const res = await axios.post(
         API_URL.NGO_ASSIGN_TASK.replace("requestId", assignDetail?.requestId),
         {
            volunteerId: assignDetail?.volunteerId,
           scheduledDate: Date.now(),
           notes:"Task is assigned"
         },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       if (res.status === 200) {
         const data = res.data.data;
         setShowAssignVolunteer(false)
         window.location.reload();
       }
      }
       
     } catch (error) {
       alert(error);
     }
   };

   const handleDetail=(e)=>{
   setAssignDetail({...assignDetail,[e.target.name]:e.target.value})
   }

  console.log(
    "dse",
    volunteers
  );

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
                <p className="text-sm text-gray-500">NGO/NSS Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-full">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  HC
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Hope Care Foundation
                  </p>
                  <p className="text-xs text-gray-500">Verified NGO</p>
                </div>
              </div>
              <Link
                to={"/logout"}
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
              Welcome, Hope Care Foundation! 🤝
            </h2>
            <p className="text-emerald-50 mb-6">
              Manage donations, coordinate volunteers, and make a difference in
              your community!
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAssignVolunteer(true)}
                className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center space-x-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Assign Volunteer</span>
              </button>
              <button
                onClick={() => setShowDistributionLog(true)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all flex items-center space-x-2 border-2 border-white"
              >
                <ClipboardList className="w-5 h-5" />
                <span>Log Distribution</span>
              </button>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border-l-4 border-orange-400">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
              System Alerts
            </h3>
            <button className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {getAlertIcon(alert.severity)}
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{alert.message}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    alert.severity === "critical"
                      ? "bg-red-100 text-red-700"
                      : alert.severity === "high"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-pointer border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 p-2">
          <div className="flex space-x-2">
            {["overview", "donations", "volunteers", "request"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Pending Donations Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Pending Donations - Service Region
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
                    Donation ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Donor
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Item
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Condition
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Region
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pendingDonations
                  .filter((el) => el.status !== "approved")
                  ?.map((donation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600">
                          {donation.donationId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-800">
                            {donation.donor.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-800">
                            {donation.itemType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {donation.quantity}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getConditionColor(
                            donation.condition
                          )}`}
                        >
                          {donation.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {donation.donor.address}
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => acceptDonations(donation.donationId)}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                          >
                            Accept
                          </button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold">
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Volunteers Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <Users className="w-5 h-5 mr-2 text-emerald-600" />
                Active Volunteers
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {volunteers.map((volunteer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {volunteer.fullname.firstname.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {volunteer.fullname.firstname +
                          " " +
                          volunteer.fullname.lastname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {volunteer.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      12 {volunteer.tasks}/{volunteer.maxTasks} tasks
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(
                        volunteer.status
                      )}`}
                    >
                      {volunteer.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <ClipboardList className="w-5 h-5 mr-2 text-emerald-600" />
                Recent Distributions
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {distributions.map((dist, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-emerald-600">
                      {dist.id}
                    </span>
                    <span className="text-xs text-gray-500">{dist.date}</span>
                  </div>
                  <p className="text-sm text-gray-800 mb-1">
                    {dist.item} × {dist.quantity}
                  </p>
                  <p className="text-xs text-gray-600">To: {dist.receiver}</p>
                  <p className="text-xs text-gray-600">By: {dist.volunteer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setShowRequest(true)}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer"
          >
            <PieChart className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">Generate Reports</h4>
            <p className="text-sm text-gray-600">
              View monthly summaries and analytics
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all cursor-pointer">
            <FileText className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">
              Inventory Management
            </h4>
            <p className="text-sm text-gray-600">
              Track and categorize donations
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer">
            <Truck className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">Logistics</h4>
            <p className="text-sm text-gray-600">
              Manage pickups and deliveries
            </p>
          </div>
        </div>
      </div>

      {/* Assign Volunteer Modal */}
      {showAssignVolunteer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Assign Volunteer
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation ID
                </label>
                <select
                  onChange={handleDetail}
                  name={"requestId"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                >
                  {requests.map((request, el) => {
                    return (
                      <option value={request._id} key={el}>
                        {request._id} - Winter Clothes
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Volunteer
                </label>
                <select
                  name={"volunteerId"}
                  onChange={handleDetail}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                >
                  {" "}
                  <option>Select Volunteer</option>
                  {volunteers.map((volunteer, el) => {
                    return (
                      <option value={volunteer._id} key={el}>
                        {volunteer.fullname.firstname +
                          " " +
                          volunteer.fullname.lastname}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Additional instructions..."
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowAssignVolunteer(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => assignTask()}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Distribution Log Modal */}
      {showDistributionLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Log Distribution
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation ID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="e.g., DN001"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Receiver Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Organization or individual name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Items Distributed
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="e.g., Winter Clothes"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Volunteer
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent">
                  <option>Rahul Kumar</option>
                  <option>Priya Singh</option>
                  <option>Amit Sharma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Distribution Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowDistributionLog(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowDistributionLog(false)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Log Distribution
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Modal */}
      {showRequest ||
        (activeTab === "request" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl transform transition-all">
              <div className="flex w-full justify-between items-baseline">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Request Made By Receiver
                </h3>
                <button onClick={() => setActiveTab("overview")}>X</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Donation ID
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Receiver Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Request Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Reciever Address
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {requests
                      ?.filter(
                        (el) =>
                          el.status !== "approved" && el.status !== "rejected"
                      )
                      .map((donation, el) => (
                        <tr
                          key={el}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <span className="font-semibold text-emerald-600">
                              {donation?.donationId?._id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-800">
                                {donation?.receiverId?.fullname?.firstname}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-800">
                                {new Date(
                                  donation?.createdAt
                                )?.toLocaleTimeString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {donation?.receiverId?.address}
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  respondToRequest(donation?._id, "approved")
                                }
                                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  respondToRequest(donation?._id, "rejected")
                                }
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NGODash;
