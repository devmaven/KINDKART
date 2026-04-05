const BASE_API = import.meta.env.VITE_BASE_API_URL

export const API_URL = {

    //USER
    REGISTER:`${BASE_API}/auth/register`,
    LOGIN:`${BASE_API}/auth/login`,
    FORGOT_PASSWORD:`${BASE_API}/auth/forgot-password`,
    RESET_PASSWORD:`${BASE_API}/auth/reset-password`,
    LOGOUT:`${BASE_API}/auth/logout`,

    //DONOR
    MYDONATIONS:`${BASE_API}/donations/my-donations/donorId`,
    UPDATEDONATIONS: `${BASE_API}/donations/my-donations/update/donorId`,
    DELETE_DONATIONS: `${BASE_API}/donations/my-donations/delete/id`,
    ADD_DONATIONS:`${BASE_API}/donations/create`,

    //NGO
    NGO_ALL_DONATIONS:`${BASE_API}/ngo/all-donations`,
    NGO_ACCEPT_DONATIONS:`${BASE_API}/ngo/accept-donation/donationId`,
    NGO_REQUESTS: `${BASE_API}/ngo/requests`,
    NGO_RESPOND_REQUEST: `${BASE_API}/ngo/respond-request/requestId`,
    NGO_ALL_VOLUNTEERS: `${BASE_API}/ngo/all-volunteers`,
    NGO_ASSIGN_TASK: `${BASE_API}/ngo/assign-task/requestId`,
    

    //RECEIVER
    RECEIVER_AVAIL_DONATIONS: `${BASE_API}/receiver/available-donations/ngoId`,
    REQUEST_DONATION: `${BASE_API}/receiver/request-donation/assignedId`,

    //VOLUNTEER
    VOLUNTEER_MY_TASKS: `${BASE_API}/volunteer/my-tasks`,

}