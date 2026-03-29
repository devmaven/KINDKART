import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant/api";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(false);
  const [form, setForm] = useState({"email":"","password":""});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post(API_URL.RESET_PASSWORD, form);
      navigate("/login");
    } catch (error) {
      alert("Failed to send reset link. Please try again.");
      console.error(error)
    } finally {
      setLoading(false);
    }
  };
  
  const handleBlurChange = (e) => {
 setForm({...form,["email"]:e.target.value})
 clearTimeout(window.emailTimeout);
 window.emailTimeout =setTimeout(async ()=>{
  setLoading(true)
   if(form.email){
     try{
      const res = await axios.post(API_URL.FORGOT_PASSWORD, { "email": e.target.value });

      if(res.status===200){
        setLoading(false)
        setEmail(true)

      }
     }catch(error){
      setLoading(false)
      console.error(error);
     }
    }
     },2000)
  


  }
  const handlePasswordChange = (e) => {
    console.log('s', form)
    setForm({...form,["password"]:e.target.value})
  }
  return (
    <div className="h-screen flex justify-center items-center bg-[linear-gradient(135deg,#74ffac_0%,#2bff95_100%)]">
      <form
        className="bg-white p-[35px] rounded-[16px] w-[360px] text-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-[26px] font-[700]">Forgot Password</h2>

        <p className="text-[14px] text-[#6b7280] mb-[20px]">
          Enter your email to receive a password reset link
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleBlurChange}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db]"
        />
       {loading && <div className="text-xs flex items-center space-x-4 mx-auto"><AiOutlineLoading3Quarters className="animate-spin "/>  Verifying your email...</div>}
       {email && <p className="text-xs my-4 text-green-400 flex items-center space-x-2"> <MdVerified /> Email verified! Now enter your new password.</p>}
         {email && <><input
          type="password"
          placeholder="Enter your new password"
          onChange={handlePasswordChange}
          required
          className="w-full p-[12px] mb-[15px] rounded-[10px] border border-[#d1d5db]"
        />

        <button
          type="submit"
          disabled={loading} // ✅ ADDED
          className="w-full p-[12px] bg-[linear-gradient(90deg,#16a34a)] text-white rounded-[12px] cursor-pointer disabled:opacity-60"
        >
          <b>Reset Password</b> {/* ✅ ADDED */}
        </button></>}

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-[15px] bg-none border-none text-[#6b7280] cursor-pointer text-[14px]"
        >
          ← Back to Login
        </button>
      </form>
    </div>
  );
}
