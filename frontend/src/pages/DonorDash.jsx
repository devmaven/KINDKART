import React, { useEffect, useState } from "react";

import {
  Heart,
  Package,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  Truck,
  Trash2,
  XCircle,
  User,
  LogOut,
  Plus,
  Search,
  Filter,
  Pencil,
  CircleCheck,
  Orbit,
  PackageCheck,
  Badge,
  LucideBadge,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constant/api";

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [donationDetail, setDonationDetail] = useState({});
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({});
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const { fullname, _id } = JSON.parse(user);

  let avatar = (fullname?.firstname[0] + fullname?.lastname[0]).toUpperCase();

  const getMyDonations = async () => {
    try {
      const res = await axios.get(API_URL.MYDONATIONS?.replace("donorId", _id),{
        headers: {
          Authorization: `Bearer ${token}`,
        }});
      if (res.status === 200) {
        const data = res?.data?.data;
        console.log('ds', data)
        setDonations(data)
      }
    } catch(error) {
      alert(error);
    }
  };

  const getMyStats = async () => {
    try {
      const res = await axios.get(
        API_URL.DONOR_STATS,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = res?.data?.statistics;
        console.log("dstat", data);
        setStats(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(()=>{
    getMyStats();
getMyDonations();
  },[])



  const handleDonationDetail = (e) => {
    e.preventDefault();
    setDonationDetail({ ...donationDetail, [e.target.name]: e.target.value });
  };

  const addDonations = async () => {
    try {
      const res = await axios.post(API_URL.ADD_DONATIONS, donationDetail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 201) {
        setShowDonationForm(false);
        alert(res.message);
      }
    } catch (error) {
      alert(error);
    }
  };

   const deleteDonations = async (id) => {
     try {
       const res = await axios.delete(
         API_URL.DELETE_DONATIONS?.replace("id", id),
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       if (res.status === 200) {
        window.location.reload();
       }
     } catch(error) {
       alert(error);
     }
   };


   const updateDonations = async (id) => {
     try {
       const res = await axios.delete(
         API_URL.DELETEDONATIONS?.replace("id", id),
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       if (res.status === 200) {
         window.location.reload();
       }
     } catch (error) {
       alert(error);
     }
   };


  const notifications = [
    {
      id: 1,
      type: "approval",
      message: "Your donation for Winter Clothes has been approved!",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "delivery",
      message: "Educational Books will be delivered tomorrow",
      time: "5 hours ago",
      unread: true,
    },
    {
      id: 3,
      type: "info",
      message: "Please update your delivery address",
      time: "1 day ago",
      unread: false,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "picked-up":
        return <Truck className="w-5 h-5 text-blue-500" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      delivered: "bg-green-100 text-green-700",
      "picked-up": "bg-blue-100 text-blue-700",
      approved: "bg-purple-100 text-purple-700",
      pending: "bg-yellow-100 text-yellow-700",
    };
    return styles[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-emerald-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Kindkart
                </h1>
                <p className="text-sm text-gray-500">Donor Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter((n) => n.unread).length}
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
                  <p className="text-xs text-gray-500">Verified Donor</p>
                </div>
              </div>
              <Link to="/logout">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <LogOut className="w-5 h-5 text-gray-700" />{" "}
                  <p className="text-l text-gray-700">
                    <b>Logout</b>
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-20 right-6 w-96 bg-white rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Notifications</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 hover:bg-emerald-50 transition-colors cursor-pointer ${
                  notif.unread ? "bg-emerald-50/30" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <Bell
                    className={`w-5 h-5 ${
                      notif.unread ? "text-emerald-500" : "text-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        notif.unread
                          ? "font-semibold text-gray-800"
                          : "text-gray-600"
                      }`}
                    >
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                  {notif.unread && (
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Banner */}
        <div className="relative bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-2xl p-8 mb-8 text-white shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">
              Welcome! {fullname?.firstname + " " + fullname?.lastname}👋
            </h2>
            <p className="text-emerald-50 mb-6">
              Thank you for your kindness. Your donations are making a real
              difference!
            </p>
            <button
              onClick={() => setShowDonationForm(true)}
              className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Make New Donation</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Donations */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-blue-600 p-3 rounded-lg`}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalDonationsMade}
            </h3>
            <p className="text-sm text-gray-500">Total Donations</p>
          </div>

          {/* Arroved */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-yellow-600 p-3 rounded-lg`}>
                <CircleCheck className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalDonationsApproved}
            </h3>
            <p className="text-sm text-gray-500">Donations Approved</p>
          </div>

          {/* Donations */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-orange-600 p-3 rounded-lg`}>
                <Orbit className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalDonationsPending}
            </h3>
            <p className="text-sm text-gray-500">Pending Donations</p>
          </div>

          {/* Donations */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-green-600 p-3 rounded-lg`}>
                <PackageCheck className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalDonationsDelivered}
            </h3>
            <p className="text-sm text-gray-500">Delivered</p>
          </div>

          {/* Points Earned */}
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`bg-purple-600 p-3 rounded-lg`}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stats.totalPoints}
            </h3>
            <p className="text-sm text-gray-500">Points Earned</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 p-2">
          <div className="flex space-x-2">
            {["overview", "active", "history", "profile"].map((tab) => (
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

        {/* Donations Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              Donation Tracking
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
                    Item Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Condition
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donations.length > 0 &&
                  donations.map((donation, index) => (
                    <tr
                      key={index}
                      className="hover:bg-emerald-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-emerald-600 text-ellipsis">
                          {donation?.donationId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold capitalize text-gray-600">
                          {donation?.itemType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-600">
                          {donation?.quantity}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold capitalize text-gray-600">
                          {donation?.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(donation?.createdAt)?.toLocaleString(
                          "en-US",
                          {
                            day: "numeric",
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                          }
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(donation?.status)}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                              donation?.status
                            )}`}
                          >
                            {donation?.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/* <button className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-semibold text-sm hover:underline">
                          <Pencil />
                        </button>{" "} */}
                        <button
                          onClick={() => deleteDonations(donation?._id)}
                          className="text-red-600 hover:text-red-700 cursor-pointer font-semibold text-sm hover:underline"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer">
            <User className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">Update Profile</h4>
            <p className="text-sm text-gray-600">
              Manage your personal details and preferences
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all cursor-pointer">
            <Clock className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">Schedule Pickup</h4>
            <p className="text-sm text-gray-600">
              Set pickup preferences for your donations
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer">
            <Heart className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">View Impact</h4>
            <p className="text-sm text-gray-600">
              See how your donations help the community
            </p>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <form onSubmit={addDonations}>
          <div className="fixed inset-0 bg-black/30  backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transition-all">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                New Donation
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Item Type
                  </label>
                  <select
                    name="itemType"
                    required
                    onChange={handleDonationDetail}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  >
                    <option value="books">Books</option>
                    <option value="clothes">Clothes</option>
                    <option value="cycles">Cycles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                    placeholder="0"
                    min={1}
                    name="quantity"
                    onChange={handleDonationDetail}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Condition
                  </label>
                  <select
                    name="condition"
                    required
                    onChange={handleDonationDetail}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  >
                    <option>Select Condition</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="perishable">Perishable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pickup Preference
                  </label>
                  <select
                    name="deliveryOption"
                    required
                    onChange={handleDonationDetail}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  >
                    <option>Select your pickup preferences</option>
                    <option value="drop_off">Drop at NGO/NSS</option>
                    <option value="pickup">Volunteer Pickup</option>
                  </select>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowDonationForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[linear-gradient(90deg,#16a34a)] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonorDashboard;
