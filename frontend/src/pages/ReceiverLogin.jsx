// import React from "react";
// import { Link } from "react-router-dom";
// import { Mail, Lock, Eye } from "lucide-react";

// const ReceiverLogin = () => {
//   return (
//     <div className="min-h-screen w-full flex items-center justify-center relative">

//       {/* DARK OVERLAY */}
//       <div className="absolute inset-0 bg-white/100"></div> 

//       {/* LOGIN CARD */}
//       <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

//         {/* TOP GRADIENT HEADER */}
//         <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white text-center py-8 px-6">
//           <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
//             <span className="text-red-500 text-3xl">❤</span>
//           </div>

//           <h2 className="text-2xl font-bold">Welcome Back.</h2>
//           <p className="text-sm opacity-90 mt-1">
//             Sign in to continue making a difference
//           </p>
//         </div>

//         {/* FORM SECTION */}
//         <div className="p-8">
//           <form className="space-y-5">

//             {/* EMAIL */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//               </div>
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 <input
//                   type="password"
//                   placeholder="Enter your password"
//                   className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 />
//                 <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={18} />
//               </div>
//             </div>

//             {/* FORGOT PASSWORD */}
//             <div className="text-right">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot Password?
//               </Link>
//             </div>

//             {/* SIGN IN BUTTON */}
//             <button
//               type="submit"
//               className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-green-500 hover:opacity-90 transition shadow-lg"
//             >
//               Sign In
//             </button>
//           </form>

//           {/* FOOTER LINKS */}
//           <div className="text-center text-sm text-gray-600 mt-6">
//             <p>
//               New <b>Receiver</b> to KINDKART?{" "}
//               <Link to="/receiversignup" className="text-blue-600 font-medium hover:underline">
//                 Sign Up
//               </Link>
//             </p>

//             <Link
//               to="/"
//               className="block mt-3 text-gray-500 hover:underline"
//             >
//               ← Back to Home
//             </Link>
//             </div>

//             <br></br>

//             {/* TERMS */}
//         <div className="text-center text-xs text-gray-500 px-6 pb-6">
//           By continuing, you agree to KINDKART{" "}
//           <span className="underline cursor-pointer">Terms of Service</span>{" "}
//           and{" "}
//           <span className="underline cursor-pointer">Privacy Policy</span>
        

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReceiverLogin;
