const BASE_API = import.meta.env.VITE_BASE_API_URL

export const API_URL = {
    REGISTER:`${BASE_API}/auth/register`,
    LOGIN:`${BASE_API}/auth/login`,
    FORGOT_PASSWORD:`${BASE_API}/auth/forgot-password`,
    RESET_PASSWORD:`${BASE_API}/auth/reset-password`,
    

}