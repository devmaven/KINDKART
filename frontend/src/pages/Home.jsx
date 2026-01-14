// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen w-full flex flex-col">

//       {/* IMAGE SECTION (FROM public/bg.jpg) */}
//       <div
//         className="h-[65vh] w-full bg-cover bg-center flex items-center justify-center"
//         style={{ backgroundImage: "url('/bg.jpg')" }}
//       >
//         <h1 className="text-gray-800 text-4xl md:text-5xl font-bold drop-shadow-lg text-center">
//           Welcome to KINDKART
//         </h1>
//       </div>

//       {/* BUTTONS SECTION (YOUR CODE – WHITE BACKGROUND) */}
//       <div className="bg-white/90 backdrop-blur p-6 flex flex-col items-center gap-4">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Get Started As
//         </h2>

//         <div className="grid grid-cols-2 gap-4 w-full max-w-md">
//           <button
//             onClick={() => navigate('/Login')}
//             className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
            
//             join us
//           </button>
//           {/*
//           <button
//             onClick={() => navigate('/receiverlogin')}
//             className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
//           >
//            Receiver
//           </button> 
          
//           <button
//             onClick={() => navigate('/ngologin')}
//             className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
//           >
//             NGO
//           </button>

//           <button
//             onClick={() => navigate('/volunteerlogin')}
//             className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
//           >
//             Volunteer
//           </button> */}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f9ff] font-sans">

      {/* HERO SECTION */}
      <main className="grid md:grid-cols-2 gap-16 px-10 py-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-6xl leading-tight font-serif text-gray-900">
            Small Help.
            <br />
            <span className="text-green-600">Big Change.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-md">
            KINDKART connects donors, NGOs, volunteers, and receivers to make
            kindness impactful and accessible.
          </p>

          {/* CTA CARD */}
          <div className="mt-10 bg-white rounded-2xl p-6 shadow-md w-full max-w-md">
            <button
              onClick={() => navigate("/Login")}
              className="w-full py-3 bg-green-600 text-white rounded-lg text-lg hover:bg-green-700 transition"
            >
              Join Our Mission
            </button>

            <div className="text-center text-gray-400 my-4">OR</div>

            <button
              onClick={() => navigate("/Login")}
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition"
            >
              Login to Continue
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="/bg.jpg"
            alt="Donation Impact"
            className="rounded-2xl w-full max-w-lg object-cover shadow-lg"
          />
        </div>

      </main>
    </div>
  );
};

export default Home;


