import React, { useState } from 'react';
import { Heart, Gift, Bell, Clock, CheckCircle, Package, User, LogOut, Plus, Search, Filter, FileText, Truck } from 'lucide-react';
import { Link } from "react-router-dom";

const ReceiverDash = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const stats = [
    { label: 'Active Requests', value: '5', icon: Package, color: 'bg-emerald-500' },
    { label: 'Items Received', value: '12', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Pending Approval', value: '3', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Notifications', value: '8', icon: Bell, color: 'bg-teal-500' }
  ];

  const requests = [
    { id: 'RQ001', item: 'Winter Clothes', quantity: 5, status: 'approved', date: '2025-01-10', need: 'Family of 5 needs warm clothing' },
    { id: 'RQ002', item: 'Educational Books', quantity: 10, status: 'delivered', date: '2025-01-12', need: 'For community library' },
    { id: 'RQ003', item: 'Food Items', quantity: 8, status: 'pending', date: '2025-01-15', need: 'Monthly rations needed' },
    { id: 'RQ004', item: 'Medical Supplies', quantity: 3, status: 'in-transit', date: '2025-01-16', need: 'First aid supplies' }
  ];

  const notifications = [
    { id: 1, type: 'approval', message: 'Your request for Winter Clothes has been approved!', time: '2 hours ago', unread: true },
    { id: 2, type: 'delivery', message: 'Educational Books will be delivered tomorrow', time: '5 hours ago', unread: true },
    { id: 3, type: 'info', message: 'Please update your delivery address', time: '1 day ago', unread: false }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-transit': return <Truck className="w-5 h-5 text-blue-500" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      delivered: 'bg-green-100 text-green-700',
      'in-transit': 'bg-blue-100 text-blue-700',
      approved: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-yellow-100 text-yellow-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-emerald-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-2 rounded-xl shadow-lg hover:scale-105 transition-transform">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div> */}
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  KindKart
                </h1>
                <p className="text-sm text-gray-500">Receiver Dashboard</p>
              </div>
            </div>
           
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              </button>
              <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-full">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Sarah Miller</p>
                  <p className="text-xs text-gray-500">Verified Receiver</p>
                </div>
              </div>
              <Link to="/Logout">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <LogOut className="w-5 h-5 text-gray-700" /> <p className="text-l text-gray-700"><b>Logout</b></p>
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
                className={`p-4 hover:bg-emerald-50 transition-colors cursor-pointer ${notif.unread ? 'bg-emerald-50/30' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <Bell className={`w-5 h-5 ${notif.unread ? 'text-emerald-500' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <p className={`text-sm ${notif.unread ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                  {notif.unread && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
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
            <h2 className="text-3xl font-bold mb-2">Welcome! 🎁</h2>
            <p className="text-emerald-50 mb-6">We're here to help connect you with the resources you need!</p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:-translate-y-1 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Submit New Request</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8 p-2">
          <div className="flex space-x-2">
            {['overview', 'my-requests', 'history', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Request History</h3>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Request ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Item Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Need Justification</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request, index) => (
                  <tr
                    key={index}
                    className="hover:bg-emerald-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-emerald-600">{request.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Gift className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-800">{request.item}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{request.quantity}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{request.need}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{request.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer">
            <User className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">Update Profile</h4>
            <p className="text-sm text-gray-600">Update contact info for delivery coordination</p>
          </div>
         
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all cursor-pointer">
            <FileText className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">View Notifications</h4>
            <p className="text-sm text-gray-600">Check allocation and delivery updates</p>
          </div>
         
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer">
            <CheckCircle className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-bold text-gray-800 mb-2">Confirm Delivery</h4>
            <p className="text-sm text-gray-600">Acknowledge receipt of donated items</p>
          </div>
        </div>
      </div>

      {/* Request Form Modal */}
      {showRequestForm && (
        <div className="fixed inset-0 bg-[linear-gradient(135deg,#74ffac_0%,#2bff95_100%)] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transition-all max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Submit Item Request</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Item Type</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  placeholder="e.g., Clothes, Food, Books"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Need Justification</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-none"
                  placeholder="Please explain why you need these items..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                <textarea
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none resize-none"
                  placeholder="Enter your delivery address..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 px-6 py-3 bg-[linear-gradient(90deg,#16a34a)] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiverDash;