// const BASE_API = import.meta.env.VITE_BASE_API_URL

// export const API_URL = {
//     REGISTER:`${BASE_API}/auth/register`,
//     LOGIN:`${BASE_API}/auth/login`,
//     FORGOT_PASSWORD:`${BASE_API}/auth/forgot-password`,
//     RESET_PASSWORD:`${BASE_API}/auth/reset-password`,
//     LOGOUT:`${BASE_API}/auth/logout`,
    

// }

const BASE_API = import.meta.env.VITE_BASE_API_URL;

export const API_URL = {
  // 🔐 AUTH
  REGISTER: `${BASE_API}/auth/register`,
  LOGIN: `${BASE_API}/auth/login`,
  FORGOT_PASSWORD: `${BASE_API}/auth/forgot-password`,
  RESET_PASSWORD: `${BASE_API}/auth/reset-password`,
  LOGOUT: `${BASE_API}/auth/logout`,

  // 🎁 DONOR
  CREATE_DONATION: `${BASE_API}/donor/create-donation`,
  MY_DONATIONS: `${BASE_API}/donor/my-donations`,

  // 🛠 ADMIN
  GET_DONATIONS: `${BASE_API}/admin/donations`,
  APPROVE_DONATION: (id) => `${BASE_API}/admin/approve/${id}`,
  REJECT_DONATION: (id) => `${BASE_API}/admin/reject/${id}`,
};