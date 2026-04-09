
## Plain Text Format (README.txt)

```text
================================================================================
KINDKART - DONATION MANAGEMENT SYSTEM
================================================================================

KindKart is a comprehensive donation management platform that connects donors, 
NGOs, volunteers, and receivers.

================================================================================
TABLE OF CONTENTS
================================================================================

1. Features
2. Tech Stack
3. Prerequisites
4. Installation
5. Environment Variables
6. Running the Application
7. Folder Structure
8. API Endpoints
9. User Roles
10. Points System
11. Troubleshooting

================================================================================
FEATURES
================================================================================

FOR DONORS:
- Create donation requests (books, clothes, cycles)
- Track donation status
- View donation history and statistics
- Earn 20 points per donation
- Level progression system

FOR NGOS:
- Accept donations from donors
- Manage receiver requests
- Approve/reject receiver requests
- Assign tasks to volunteers
- View dashboard with statistics

FOR RECEIVERS:
- Browse available donations
- Request donations from NGOs
- Track request status
- View received items history

FOR VOLUNTEERS:
- View assigned tasks
- Accept/start/complete deliveries
- Track delivery status
- View activity log
- Earn 15 points per delivery

================================================================================
TECH STACK
================================================================================

BACKEND:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

FRONTEND:
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios

================================================================================
PREREQUISITES
================================================================================

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

================================================================================
INSTALLATION
================================================================================

1. Clone the repository:
   git clone https://github.com/devmaven/KINDKART.git
   cd KINDKART

2. Install Backend Dependencies:
   cd Backend
   npm install

3. Install Frontend Dependencies:
   cd ../frontend
   npm install

================================================================================
ENVIRONMENT VARIABLES
================================================================================

BACKEND (.env file in Backend folder):
----------------------------------------
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

FRONTEND (.env file in frontend folder):
-----------------------------------------
VITE_API_URL=http://localhost:5000/api

================================================================================
RUNNING THE APPLICATION
================================================================================

START BACKEND SERVER:
---------------------
cd Backend
npm start
Backend will run on http://localhost:5000

START FRONTEND SERVER:
----------------------
cd frontend
npm run dev
Frontend will run on http://localhost:5173

================================================================================
FOLDER STRUCTURE
================================================================================

KINDKART/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   └── services/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── .env
└── README.md

================================================================================
API ENDPOINTS
================================================================================

AUTHENTICATION:
---------------
POST   /api/auth/register     - User registration
POST   /api/auth/login        - User login
POST   /api/auth/logout       - User logout

DONATIONS:
----------
POST   /api/donations/create        - Create donation
GET    /api/donations/my-donations  - Get donor's donations
GET    /api/donations/all           - Get all donations (NGO)

NGO OPERATIONS:
---------------
POST   /api/ngo/donations/:donationId/accept  - Accept donation
GET    /api/ngo/requests                      - Get receiver requests
PUT    /api/ngo/requests/:requestId/respond   - Approve/reject request
POST   /api/ngo/requests/:requestId/assign-task - Assign task
GET    /api/ngo/statistics                    - Get NGO statistics

RECEIVER OPERATIONS:
--------------------
GET    /api/receiver/donations/available      - Get available donations
POST   /api/receiver/donations/:assignmentId/request - Request donation
GET    /api/receiver/my-requests              - Get my requests
GET    /api/receiver/statistics               - Get receiver statistics

VOLUNTEER OPERATIONS:
---------------------
GET    /api/volunteer/tasks                   - Get assigned tasks
PUT    /api/volunteer/tasks/:taskId/status    - Update task status
GET    /api/volunteer/statistics              - Get volunteer statistics
GET    /api/volunteer/activities              - Get activity log

================================================================================
USER ROLES
================================================================================

DONOR     - Create donations, track status, view points
NGO       - Accept donations, manage requests, assign tasks
RECEIVER  - Request donations, track requests
VOLUNTEER - Accept tasks, update delivery status, earn points
ADMIN     - Full system access

================================================================================
POINTS SYSTEM
================================================================================

DONORS:
- 20 points per donation made
- Level up every 100 points

VOLUNTEERS:
- 15 points per successful delivery
- Level up every 50 points

================================================================================
TROUBLESHOOTING
================================================================================

1. MONGODB CONNECTION ERROR:
   - Check your MongoDB URI in .env
   - Ensure MongoDB is running

2. AUTHENTICATION ISSUES:
   - Clear browser cache
   - Check if token is stored in localStorage
   - Verify JWT_SECRET in .env

3. CORS ERRORS:
   - Ensure frontend URL is correct in backend CORS config
   - Check VITE_API_URL in frontend .env

4. PORT ALREADY IN USE:
   - Change PORT in backend .env
   - Kill process using the port

================================================================================
LICENSE
================================================================================

This project is licensed under the MIT License.

================================================================================
CONTACT
================================================================================

For any queries or support, please contact the development team.

================================================================================
ACKNOWLEDGMENTS
================================================================================

- Group Members
- Open source community

================================================================================