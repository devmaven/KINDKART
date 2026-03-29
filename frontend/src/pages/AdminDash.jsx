import React, { useState } from 'react';
import {
  Shield, Users, Package, BarChart2, Bell, LogOut, Search, Filter,
  CheckCircle, XCircle, Clock, Truck, AlertTriangle, TrendingUp,
  UserCheck, UserX, Trash2, Ban, Eye, ChevronDown, Download,
  Activity, Award, RefreshCw, Settings, Home, Menu, X,
  ArrowUpRight, ArrowDownRight, Copy, Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────── MOCK DATA ─────────────────────────── */
const statsData = [
  { label: 'Total Users',      value: '248',  icon: Users,    color: 'bg-blue-500',    trend: '+12%', up: true },
  { label: 'Total Donations',  value: '1,042', icon: Package,  color: 'bg-emerald-500', trend: '+8%',  up: true },
  { label: 'Pending Approvals',value: '17',   icon: Clock,    color: 'bg-yellow-500',  trend: '+3',   up: false },
  { label: 'NGOs Registered',  value: '14',   icon: Award,    color: 'bg-purple-500',  trend: '+2',   up: true  },
  { label: 'Active Volunteers',value: '63',   icon: UserCheck, color: 'bg-teal-500',   trend: '+5',   up: true  },
  { label: 'Items Delivered',  value: '874',  icon: Truck,    color: 'bg-green-600',   trend: '+21%', up: true  },
];

const allUsers = [
  { id: 'U001', name: 'John Doe',      email: 'john@example.com',   role: 'Donor',     status: 'Active',    joined: '2025-01-05' },
  { id: 'U002', name: 'Priya Sharma',  email: 'priya@ngo.org',      role: 'NGO',       status: 'Active',    joined: '2025-01-08' },
  { id: 'U003', name: 'Ravi Kumar',    email: 'ravi@vol.com',       role: 'Volunteer', status: 'Active',    joined: '2025-01-10' },
  { id: 'U004', name: 'Meena Gupta',   email: 'meena@recv.in',      role: 'Receiver',  status: 'Blocked',   joined: '2025-01-12' },
  { id: 'U005', name: 'Amit Joshi',    email: 'amit@donor.com',     role: 'Donor',     status: 'Active',    joined: '2025-01-15' },
  { id: 'U006', name: 'Sunita Rao',    email: 'sunita@ngo.org',     role: 'NGO',       status: 'Pending',   joined: '2025-01-18' },
  { id: 'U007', name: 'Kiran Singh',   email: 'kiran@vol.net',      role: 'Volunteer', status: 'Active',    joined: '2025-01-20' },
  { id: 'U008', name: 'Deepa Nair',    email: 'deepa@recv.org',     role: 'Receiver',  status: 'Active',    joined: '2025-01-22' },
];

const allDonations = [
  { id: 'DN001', donor: 'John Doe',   item: 'Winter Clothes', qty: 5,  ngo: 'GreenHope NGO', status: 'delivered', date: '2025-01-10', duplicate: false },
  { id: 'DN002', donor: 'Amit Joshi', item: 'Books',          qty: 10, ngo: 'EduCare NSS',   status: 'picked-up', date: '2025-01-12', duplicate: false },
  { id: 'DN003', donor: 'John Doe',   item: 'Toys',           qty: 8,  ngo: 'GreenHope NGO', status: 'pending',   date: '2025-01-15', duplicate: false },
  { id: 'DN004', donor: 'Riya Mehta', item: 'Food Items',     qty: 3,  ngo: 'FoodBank NSS',  status: 'approved',  date: '2025-01-16', duplicate: false },
  { id: 'DN005', donor: 'John Doe',   item: 'Winter Clothes', qty: 5,  ngo: 'GreenHope NGO', status: 'pending',   date: '2025-01-17', duplicate: true  },
  { id: 'DN006', donor: 'Kavya P.',   item: 'Cycles',         qty: 2,  ngo: 'RideForAll',    status: 'approved',  date: '2025-01-18', duplicate: false },
  { id: 'DN007', donor: 'Priya S.',   item: 'Books',          qty: 15, ngo: 'EduCare NSS',   status: 'delivered', date: '2025-01-19', duplicate: false },
];

const recentActivity = [
  { msg: 'NGO "Sunita Rao" registration pending approval', time: '10 min ago', type: 'warning' },
  { msg: 'Duplicate donation DN005 flagged for review',     time: '25 min ago', type: 'alert'   },
  { msg: 'Donor John Doe submitted 3 donations today',      time: '1 hr ago',   type: 'info'    },
  { msg: 'Volunteer Ravi Kumar completed 5 deliveries',     time: '2 hrs ago',  type: 'success' },
  { msg: 'User Meena Gupta blocked for suspicious activity',time: '3 hrs ago',  type: 'alert'   },
];

const notifications = [
  { id: 1, msg: 'New NGO registration requires approval',    time: '10 min ago', unread: true  },
  { id: 2, msg: 'Duplicate donation DN005 flagged',          time: '25 min ago', unread: true  },
  { id: 3, msg: 'Monthly donation report is ready',          time: '1 day ago',  unread: false },
];

/* ─────────────────────────── HELPERS ─────────────────────────── */
const statusStyle = {
  delivered:  'bg-green-100 text-green-700',
  'picked-up':'bg-blue-100 text-blue-700',
  approved:   'bg-purple-100 text-purple-700',
  pending:    'bg-yellow-100 text-yellow-700',
  rejected:   'bg-red-100 text-red-700',
};
const userStatusStyle = {
  Active:  'bg-green-100 text-green-700',
  Blocked: 'bg-red-100 text-red-700',
  Pending: 'bg-yellow-100 text-yellow-700',
};
const roleStyle = {
  Donor:     'bg-blue-100 text-blue-700',
  NGO:       'bg-purple-100 text-purple-700',
  Volunteer: 'bg-teal-100 text-teal-700',
  Receiver:  'bg-orange-100 text-orange-700',
  Admin:     'bg-gray-200 text-gray-700',
};
const activityColor = {
  warning: 'text-yellow-500',
  alert:   'text-red-500',
  info:    'text-blue-500',
  success: 'text-green-500',
};

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */
const AdminDash = () => {
  const [activePage, setActivePage]           = useState('dashboard');
  const [showNotif, setShowNotif]             = useState(false);
  const [sidebarOpen, setSidebarOpen]         = useState(false);
  const [userSearch, setUserSearch]           = useState('');
  const [userRoleFilter, setUserRoleFilter]   = useState('All');
  const [donSearch, setDonSearch]             = useState('');
  const [donStatusFilter, setDonStatusFilter] = useState('All');
  const [users, setUsers]                     = useState(allUsers);
  const [donations, setDonations]             = useState(allDonations);

  const unreadCount = notifications.filter(n => n.unread).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard',       icon: Home    },
    { id: 'users',     label: 'Manage Users',    icon: Users   },
    { id: 'donations', label: 'Manage Donations',icon: Package },
    { id: 'reports',   label: 'Reports',         icon: BarChart2 },
  ];

  /* ── user actions ── */
  const blockUser   = (id) => setUsers(u => u.map(x => x.id === id ? { ...x, status: x.status === 'Blocked' ? 'Active' : 'Blocked' } : x));
  const deleteUser  = (id) => setUsers(u => u.filter(x => x.id !== id));
  const approveUser = (id) => setUsers(u => u.map(x => x.id === id ? { ...x, status: 'Active' } : x));

  /* ── donation actions ── */
  const removeDonation  = (id) => setDonations(d => d.filter(x => x.id !== id));
  const resolveDuplicate= (id) => setDonations(d => d.map(x => x.id === id ? { ...x, duplicate: false } : x));

  /* ── filtered lists ── */
  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole   = userRoleFilter === 'All' || u.role === userRoleFilter;
    return matchSearch && matchRole;
  });

  const filteredDonations = donations.filter(d => {
    const matchSearch = d.donor.toLowerCase().includes(donSearch.toLowerCase()) ||
                        d.item.toLowerCase().includes(donSearch.toLowerCase()) ||
                        d.id.toLowerCase().includes(donSearch.toLowerCase());
    const matchStatus = donStatusFilter === 'All' || d.status === donStatusFilter;
    return matchSearch && matchStatus;
  });

  const duplicateCount = donations.filter(d => d.duplicate).length;

  /* ════════════════════════ RENDER PAGES ════════════════════════ */

  /* ── DASHBOARD OVERVIEW ── */
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full -mr-36 -mt-36" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24" />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">Admin Control Centre 🛡️</h2>
            <p className="text-emerald-50">Full system oversight — manage users, donations, and platform health.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all">
              <Download className="w-4 h-4" /> Export Report
            </button>
            <button className="bg-white text-emerald-600 px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsData.map((s, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`${s.color} p-2.5 rounded-lg`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? 'text-green-500' : 'text-red-400'}`}>
                {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Duplicate Alert */}
      {duplicateCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-red-700">{duplicateCount} Duplicate Donation{duplicateCount > 1 ? 's' : ''} Detected</p>
            <p className="text-sm text-red-500">Please review flagged entries in Manage Donations.</p>
          </div>
          <button onClick={() => setActivePage('donations')} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors">
            Review Now
          </button>
        </div>
      )}

      {/* Recent Activity + Pending NGOs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-500" /> Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((a, i) => (
              <div key={i} className="p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors">
                <span className={`mt-0.5 ${activityColor[a.type]}`}>
                  {a.type === 'warning' && <AlertTriangle className="w-4 h-4" />}
                  {a.type === 'alert'   && <Flag className="w-4 h-4" />}
                  {a.type === 'info'    && <Activity className="w-4 h-4" />}
                  {a.type === 'success' && <CheckCircle className="w-4 h-4" />}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{a.msg}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending NGO Approvals */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Award className="w-5 h-5 text-purple-500" /> Pending NGO Approvals</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {users.filter(u => u.role === 'NGO' && u.status === 'Pending').length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <CheckCircle className="w-10 h-10 mx-auto mb-2 text-green-300" />
                <p className="text-sm">All NGOs verified!</p>
              </div>
            ) : (
              users.filter(u => u.role === 'NGO' && u.status === 'Pending').map(u => (
                <div key={u.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{u.name}</p>
                    <p className="text-xs text-gray-400">{u.email} · Joined {u.joined}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approveUser(u.id)} className="bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button onClick={() => deleteUser(u.id)} className="bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-200 transition-colors flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: Users,   color: 'blue',   title: 'Manage Users',      desc: 'View, block, or remove platform users',   page: 'users'     },
          { icon: Package, color: 'emerald', title: 'Manage Donations',  desc: 'Review and resolve donation issues',       page: 'donations' },
          { icon: BarChart2,color:'purple', title: 'View Reports',       desc: 'Full analytics and system insights',       page: 'reports'   },
        ].map((q, i) => (
          <div key={i} onClick={() => setActivePage(q.page)}
            className={`bg-gradient-to-br from-${q.color}-50 to-${q.color}-100 rounded-xl p-6 border border-${q.color}-200 hover:shadow-lg transition-all cursor-pointer`}>
            <q.icon className={`w-8 h-8 text-${q.color}-600 mb-3`} />
            <h4 className="font-bold text-gray-800 mb-1">{q.title}</h4>
            <p className="text-sm text-gray-600">{q.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── MANAGE USERS ── */
  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
          <p className="text-sm text-gray-500">{filteredUsers.length} users found</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={userSearch} onChange={e => setUserSearch(e.target.value)}
              placeholder="Search name / email…"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 outline-none w-56" />
          </div>
          {/* Role Filter */}
          <select value={userRoleFilter} onChange={e => setUserRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 outline-none">
            {['All','Donor','NGO','Volunteer','Receiver'].map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Summary chips */}
      <div className="flex gap-3 flex-wrap">
        {[
          { label: 'Total',    val: users.length,                         color: 'bg-gray-100 text-gray-700'    },
          { label: 'Active',   val: users.filter(u=>u.status==='Active').length,  color: 'bg-green-100 text-green-700'  },
          { label: 'Blocked',  val: users.filter(u=>u.status==='Blocked').length, color: 'bg-red-100 text-red-700'     },
          { label: 'Pending',  val: users.filter(u=>u.status==='Pending').length, color: 'bg-yellow-100 text-yellow-700'},
        ].map((c,i) => (
          <span key={i} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${c.color}`}>
            {c.label}: {c.val}
          </span>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['User ID','Name','Email','Role','Status','Joined','Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((u, i) => (
                <tr key={i} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="px-5 py-4"><span className="font-mono text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{u.id}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{u.email}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleStyle[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${userStatusStyle[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{u.joined}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      {u.status === 'Pending' && (
                        <button onClick={() => approveUser(u.id)}
                          title="Approve" className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => blockUser(u.id)} title={u.status === 'Blocked' ? 'Unblock' : 'Block'}
                        className={`p-1.5 rounded-lg transition-colors ${u.status === 'Blocked' ? 'bg-green-100 text-green-600 hover:bg-green-200' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`}>
                        <Ban className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteUser(u.id)} title="Delete"
                        className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>No users match your search.</p>
          </div>
        )}
      </div>
    </div>
  );

  /* ── MANAGE DONATIONS ── */
  const renderDonations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Donations</h2>
          <p className="text-sm text-gray-500">{filteredDonations.length} donations · {duplicateCount} duplicate{duplicateCount !== 1 ? 's' : ''} flagged</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={donSearch} onChange={e => setDonSearch(e.target.value)}
              placeholder="Search donor / item / ID…"
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 outline-none w-56" />
          </div>
          <select value={donStatusFilter} onChange={e => setDonStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 outline-none">
            {['All','pending','approved','picked-up','delivered'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
        </div>
      </div>

      {/* Duplicate banner */}
      {duplicateCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
          <Copy className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-700 font-medium">{duplicateCount} donation(s) marked as duplicate — review and resolve below.</p>
        </div>
      )}

      {/* Status chips */}
      <div className="flex gap-3 flex-wrap">
        {['pending','approved','picked-up','delivered'].map(s => {
          const cnt = donations.filter(d => d.status === s).length;
          return (
            <span key={s} className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle[s]}`}>
              {s.charAt(0).toUpperCase()+s.slice(1)}: {cnt}
            </span>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Donation ID','Donor','Item','Qty','NGO Assigned','Status','Date','Duplicate','Actions'].map(h => (
                  <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDonations.map((d, i) => (
                <tr key={i} className={`hover:bg-emerald-50/40 transition-colors ${d.duplicate ? 'bg-red-50/30' : ''}`}>
                  <td className="px-5 py-4"><span className="font-mono text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{d.id}</span></td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-700">{d.donor}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm text-gray-700">{d.item}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{d.qty}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{d.ngo}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[d.status]}`}>{d.status}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{d.date}</td>
                  <td className="px-5 py-4">
                    {d.duplicate
                      ? <span className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full"><AlertTriangle className="w-3.5 h-3.5" /> Duplicate</span>
                      : <span className="text-xs text-gray-400">—</span>
                    }
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1.5">
                      {d.duplicate && (
                        <button onClick={() => resolveDuplicate(d.id)} title="Resolve Duplicate"
                          className="p-1.5 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200 transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => removeDonation(d.id)} title="Remove"
                        className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDonations.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p>No donations match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );

  /* ── REPORTS ── */
  const renderReports = () => {
    const totalDonations   = donations.length;
    const deliveredCount   = donations.filter(d => d.status === 'delivered').length;
    const pendingCount     = donations.filter(d => d.status === 'pending').length;
    const deliveryRate     = Math.round((deliveredCount / totalDonations) * 100);
    const totalUsers       = users.length;
    const activeUsers      = users.filter(u => u.status === 'Active').length;

    const itemBreakdown = donations.reduce((acc, d) => {
      acc[d.item] = (acc[d.item] || 0) + d.qty;
      return acc;
    }, {});
    const maxQty = Math.max(...Object.values(itemBreakdown));

    const itemColors = ['bg-emerald-400', 'bg-teal-400', 'bg-blue-400', 'bg-purple-400', 'bg-yellow-400'];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">System Reports & Analytics</h2>
          <p className="text-sm text-gray-500">Platform-wide performance overview</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Delivery Rate',   value: `${deliveryRate}%`, sub: `${deliveredCount}/${totalDonations} delivered`, icon: TrendingUp, color: 'emerald' },
            { label: 'Active Users',    value: activeUsers,        sub: `of ${totalUsers} total`,                        icon: UserCheck,  color: 'blue'    },
            { label: 'Pending Items',   value: pendingCount,       sub: 'require action',                                icon: Clock,      color: 'yellow'  },
            { label: 'Duplicate Alerts',value: duplicateCount,     sub: 'flagged entries',                               icon: Copy,       color: 'red'     },
          ].map((k, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
              <div className={`w-10 h-10 bg-${k.color}-100 rounded-lg flex items-center justify-center mb-3`}>
                <k.icon className={`w-5 h-5 text-${k.color}-600`} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{k.value}</p>
              <p className="text-sm font-semibold text-gray-700 mt-0.5">{k.label}</p>
              <p className="text-xs text-gray-400">{k.sub}</p>
            </div>
          ))}
        </div>

        {/* Item Breakdown Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-500" /> Items Donated by Category
          </h3>
          <div className="space-y-4">
            {Object.entries(itemBreakdown).map(([item, qty], i) => (
              <div key={item} className="flex items-center gap-4">
                <span className="text-sm text-gray-600 w-32 flex-shrink-0 font-medium">{item}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${itemColors[i % itemColors.length]} h-3 rounded-full transition-all`}
                    style={{ width: `${(qty / maxQty) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-10 text-right">{qty}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donation Status Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-500" /> Donation Status Breakdown
            </h3>
            <div className="space-y-3">
              {['pending','approved','picked-up','delivered'].map(s => {
                const cnt = donations.filter(d => d.status === s).length;
                const pct = Math.round((cnt / donations.length) * 100);
                return (
                  <div key={s} className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full flex-shrink-0 ${statusStyle[s].split(' ')[0].replace('100','400')}`} />
                    <span className="text-sm text-gray-600 capitalize w-24">{s}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${statusStyle[s].split(' ')[0].replace('100','400')} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* User Role Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" /> User Role Distribution
            </h3>
            <div className="space-y-3">
              {['Donor','NGO','Volunteer','Receiver'].map((role, i) => {
                const cnt = users.filter(u => u.role === role).length;
                const pct = Math.round((cnt / users.length) * 100);
                return (
                  <div key={role} className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${roleStyle[role]} flex-shrink-0 w-20 text-center`}>{role}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${itemColors[i]} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-700">{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Export */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-200 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="font-semibold text-gray-800">Export Full Report</p>
            <p className="text-sm text-gray-500">Download a complete CSV or PDF of all system data.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export CSV
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>
      </div>
    );
  };

  const pageContent = {
    dashboard: renderDashboard,
    users:     renderUsers,
    donations: renderDonations,
    reports:   renderReports,
  };

  /* ════════════════════════ LAYOUT ════════════════════════ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex">

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-95 bg-white shadow-xl border-r-4 border-emerald-400
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:flex lg:flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Kindkart</h1>
          <p className="text-xs text-gray-400 mt-0.5">Admin Dashboard</p>
        </div>

        {/* Admin Badge */}
        <div className="px-4 py-3 mx-4 mt-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">Super Admin</p>
            <p className="text-xs text-gray-400">Full Access</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 mt-6 space-y-1">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                activePage === item.id
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.id === 'donations' && duplicateCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{duplicateCount}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <Link to="/Logout">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors font-semibold text-sm">
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-lg font-bold text-gray-800 capitalize">{activePage === 'dashboard' ? 'Overview' : navItems.find(n=>n.id===activePage)?.label}</h2>
              <p className="text-xs text-gray-400">KindKart Administration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button onClick={() => setShowNotif(!showNotif)} className="relative p-2 hover:bg-emerald-50 rounded-full transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotif && (
                <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-2xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-800">Notifications</h3>
                    <button onClick={() => setShowNotif(false)}><X className="w-4 h-4 text-gray-400" /></button>
                  </div>
                  {notifications.map(n => (
                    <div key={n.id} className={`p-4 hover:bg-emerald-50 transition-colors border-b border-gray-50 ${n.unread ? 'bg-emerald-50/40' : ''}`}>
                      <div className="flex items-start gap-3">
                        <Bell className={`w-4 h-4 mt-0.5 flex-shrink-0 ${n.unread ? 'text-emerald-500' : 'text-gray-300'}`} />
                        <div className="flex-1">
                          <p className={`text-sm ${n.unread ? 'font-semibold text-gray-800' : 'text-gray-500'}`}>{n.msg}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                        {n.unread && <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Admin</p>
                <p className="text-xs text-gray-400">Super User</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {(pageContent[activePage] || renderDashboard)()}
        </main>
      </div>
    </div>
  );
};

export default AdminDash;