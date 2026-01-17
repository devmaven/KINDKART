import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {API_URL} from "../constant/api";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    role: "donor",
  });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log("hello",form)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL.REGISTER, {
        fullname: {
          firstname: form.firstname,
          lastname: form.lastname,
        },
        email: form.email,
        password: form.password,
        address: form.address,
        role: "admin",
      });
      if(res.status===201){
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);

      navigate("/");
      }
    } catch(error){
      console.error(error)
      alert("Registration failed");
    }
  };

  return (
    <div className="max-h-screen  w-full grid grid-cols-12">
      <div className="left col-span-6 flex justify-center items-center bg-[linear-gradient(135deg,#74ffac_0%,#2bff95_100%)] p-12">

      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-[35px] rounded-lg w-[480px]"
      >
        <div className="text-center mb-[20px]">
          <h2 className="text-[26px] font-[700]">Join Our Cause</h2>
          <p className="text-[14px] text-[#6b7280]">
            Create an account to start helping
          </p>
        </div>

        <label className="text-[14px] font-[600]">First Name</label>
        <input
          name="firstname"
          onChange={handleChange}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db] outline-none"
        />

        <label className="text-[14px] font-[600]">Last Name</label>
        <input
          name="lastname"
          onChange={handleChange}
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db] outline-none"
        />

        <label className="text-[14px] font-[600]">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db] outline-none"
        />

        <label className="text-[14px] font-[600]">Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db] outline-none"
        />

        <label className="text-[14px] font-[600]">Address</label>
        <input
          name="address"
          onChange={handleChange}
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db] outline-none"
        />

        <label className="text-[14px] font-[600]">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db] outline-none"
        >
          <option value="donor">Donor</option>
          <option value="ngo">NGO</option>
          <option value="receiver">Receiver</option>
          <option value="volunteer">Volunteer</option>
        </select>

        <button
          type="submit"
          className="w-full p-[12px] bg-[linear-gradient(90deg,#16a34a)] text-white rounded-[12px] cursor-pointer"
        >
          <b>Create Account</b>
        </button>

        <p className="text-center mt-[15px]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2563eb] font-[600]">
            Login
          </Link>
        </p>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-[14px] w-full bg-none border-none p-0 text-[#6b7280] cursor-pointer text-[14px] font-[500] text-center outline-none"
        >
          ← Back to Home
        </button>
      </form>
      </div>
      <div className="right col-span-6 flex bg-center bg-cover bg-[url(img3.jpg)] overflow-hidden" ></div>
    </div>
  );
}
