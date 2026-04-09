# KindKart - Donation Management System

```
# KindKart - Donation Management System

KindKart is a comprehensive donation management platform that connects donors, NGOs, volunteers, and receivers. The platform streamlines the donation process from creation to delivery with a reward system for volunteers.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Donors
- Create donation requests (books, clothes, cycles)
- Track donation status (pending, approved, picked_up, delivered)
- View donation history and statistics
- Earn points (20 points per donation)
- Level progression system

### For NGOs
- Accept donations from donors
- Manage receiver requests
- Approve/reject receiver requests
- Assign tasks to volunteers
- View dashboard with statistics:
  - Pending donations
  - Items distributed
  - Total volunteers
  - Total receivers
  - Recent activity

### For Receivers
- Browse available donations
- Request donations from NGOs
- Track request status (pending, approved, rejected, completed)
- View received items history

### For Volunteers
- View assigned tasks
- Accept/start/complete deliveries
- Track delivery status
- View activity log
- Earn points (15 points per delivery)
- Level progression system

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud like MongoDB Atlas)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/devmaven/KINDKART.git
cd KINDKART
```

### 2. Install Backend Dependencies

**bash**

```
cd Backend
npm install
```

### 3. Install Frontend Dependencies

**bash**

```
cd ../frontend
npm install
```

### 4. Set up Environment Variables

#### Backend (.env)

Create a `.env` file in the `Backend` folder:

**env**

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### Frontend (.env)

Create a `.env` file in the `frontend` folder:

**env**

```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

**bash**

```
cd Backend
npm start
# or with nodemon for development
npm run start
```

Backend will run on `http://localhost:5000`

### Start Frontend Development Server

**bash**

```
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Folder Structure

**text**

```
KINDKART/
├── Backend/
│   ├── controllers/
│   │   ├── donation.controller.js
│   │   ├── ngo.controller.js
│   │   ├── receiver.controller.js
│   │   ├── volunteer.controller.js
│   │   └── auth.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── donorprofile.model.js
│   │   ├── assignedDonation.model.js
│   │   ├── receiverRequest.model.js
│   │   ├── task.model.js
│   │   └── activityLog.model.js
│   ├── routes/
│   │   ├── donation.routes.js
│   │   ├── ngo.routes.js
│   │   ├── receiver.routes.js
│   │   ├── volunteer.routes.js
│   │   └── auth.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── services/
│   │   ├── donation.service.js
│   │   ├── task.service.js
│   │   └── assignedDonation.service.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── .env
└── README.md
```

## 🔑 API Endpoints

### Authentication


| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | User registration |
| POST   | `/api/auth/login`    | User login        |
| POST   | `/api/auth/logout`   | User logout       |

### Donations


| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| POST   | `/api/donations/create`       | Create donation         |
| GET    | `/api/donations/my-donations` | Get donor's donations   |
| GET    | `/api/donations/all`          | Get all donations (NGO) |

### NGO Operations


| Method | Endpoint                                   | Description              |
| ------ | ------------------------------------------ | ------------------------ |
| POST   | `/api/ngo/donations/:donationId/accept`    | Accept donation          |
| GET    | `/api/ngo/requests`                        | Get receiver requests    |
| PUT    | `/api/ngo/requests/:requestId/respond`     | Approve/reject request   |
| POST   | `/api/ngo/requests/:requestId/assign-task` | Assign task to volunteer |
| GET    | `/api/ngo/statistics`                      | Get NGO statistics       |

### Receiver Operations


| Method | Endpoint                                        | Description             |
| ------ | ----------------------------------------------- | ----------------------- |
| GET    | `/api/receiver/donations/available`             | Get available donations |
| POST   | `/api/receiver/donations/:assignmentId/request` | Request donation        |
| GET    | `/api/receiver/my-requests`                     | Get my requests         |
| GET    | `/api/receiver/statistics`                      | Get receiver statistics |

### Volunteer Operations


| Method | Endpoint                              | Description              |
| ------ | ------------------------------------- | ------------------------ |
| GET    | `/api/volunteer/tasks`                | Get assigned tasks       |
| PUT    | `/api/volunteer/tasks/:taskId/status` | Update task status       |
| GET    | `/api/volunteer/statistics`           | Get volunteer statistics |
| GET    | `/api/volunteer/activities`           | Get activity log         |

## 👥 User Roles


| Role          | Access Level                                      |
| ------------- | ------------------------------------------------- |
| **Donor**     | Create donations, track status, view points       |
| **NGO**       | Accept donations, manage requests, assign tasks   |
| **Receiver**  | Request donations, track requests                 |
| **Volunteer** | Accept tasks, update delivery status, earn points |
| **Admin**     | Full system access                                |

## 🎯 Points System

### Donors

* 20 points per donation made
* Level up every 100 points

### Volunteers

* 15 points per successful delivery
* Level up every 50 points

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   * Check your MongoDB URI in `.env`
   * Ensure MongoDB is running
2. **Authentication Issues**
   * Clear browser cache
   * Check if token is stored in localStorage
   * Verify JWT\_SECRET in `.env`
3. **CORS Errors**
   * Ensure frontend URL is correct in backend CORS config
   * Check VITE\_API\_URL in frontend `.env`
4. **Port Already in Use**
   * Change PORT in backend `.env`
   * Kill process using the port

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For any queries or support, please contact the development team.

## 🙏 Acknowledgments

* All contributors and volunteers
* Open source community

```
# KindKart - Donation Management System

KindKart is a comprehensive donation management platform that connects donors, NGOs, volunteers, and receivers. The platform streamlines the donation process from creation to delivery with a reward system for volunteers.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Donors
- Create donation requests (books, clothes, cycles)
- Track donation status (pending, approved, picked_up, delivered)
- View donation history and statistics
- Earn points (20 points per donation)
- Level progression system

### For NGOs
- Accept donations from donors
- Manage receiver requests
- Approve/reject receiver requests
- Assign tasks to volunteers
- View dashboard with statistics:
  - Pending donations
  - Items distributed
  - Total volunteers
  - Total receivers
  - Recent activity

### For Receivers
- Browse available donations
- Request donations from NGOs
- Track request status (pending, approved, rejected, completed)
- View received items history

### For Volunteers
- View assigned tasks
- Accept/start/complete deliveries
- Track delivery status
- View activity log
- Earn points (15 points per delivery)
- Level progression system

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React Icons

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud like MongoDB Atlas)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/devmaven/KINDKART.git
cd KINDKART
```

### 2. Install Backend Dependencies

**bash**

```
cd Backend
npm install
```

### 3. Install Frontend Dependencies

**bash**

```
cd ../frontend
npm install
```

### 4. Set up Environment Variables

#### Backend (.env)

Create a `.env` file in the `Backend` folder:

**env**

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

#### Frontend (.env)

Create a `.env` file in the `frontend` folder:

**env**

```
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

**bash**

```
cd Backend
npm start
# or with nodemon for development
npm run start
```

Backend will run on `http://localhost:5000`

### Start Frontend Development Server

**bash**

```
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📁 Folder Structure

**text**

```
KINDKART/
├── Backend/
│   ├── controllers/
│   │   ├── donation.controller.js
│   │   ├── ngo.controller.js
│   │   ├── receiver.controller.js
│   │   ├── volunteer.controller.js
│   │   └── auth.controller.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── donorprofile.model.js
│   │   ├── assignedDonation.model.js
│   │   ├── receiverRequest.model.js
│   │   ├── task.model.js
│   │   └── activityLog.model.js
│   ├── routes/
│   │   ├── donation.routes.js
│   │   ├── ngo.routes.js
│   │   ├── receiver.routes.js
│   │   ├── volunteer.routes.js
│   │   └── auth.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── services/
│   │   ├── donation.service.js
│   │   ├── task.service.js
│   │   └── assignedDonation.service.js
│   ├── config/
│   │   └── database.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── .env
└── README.md
```

## 🔑 API Endpoints

### Authentication


| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | User registration |
| POST   | `/api/auth/login`    | User login        |
| POST   | `/api/auth/logout`   | User logout       |

### Donations


| Method | Endpoint                      | Description             |
| ------ | ----------------------------- | ----------------------- |
| POST   | `/api/donations/create`       | Create donation         |
| GET    | `/api/donations/my-donations` | Get donor's donations   |
| GET    | `/api/donations/all`          | Get all donations (NGO) |

### NGO Operations


| Method | Endpoint                                   | Description              |
| ------ | ------------------------------------------ | ------------------------ |
| POST   | `/api/ngo/donations/:donationId/accept`    | Accept donation          |
| GET    | `/api/ngo/requests`                        | Get receiver requests    |
| PUT    | `/api/ngo/requests/:requestId/respond`     | Approve/reject request   |
| POST   | `/api/ngo/requests/:requestId/assign-task` | Assign task to volunteer |
| GET    | `/api/ngo/statistics`                      | Get NGO statistics       |

### Receiver Operations


| Method | Endpoint                                        | Description             |
| ------ | ----------------------------------------------- | ----------------------- |
| GET    | `/api/receiver/donations/available`             | Get available donations |
| POST   | `/api/receiver/donations/:assignmentId/request` | Request donation        |
| GET    | `/api/receiver/my-requests`                     | Get my requests         |
| GET    | `/api/receiver/statistics`                      | Get receiver statistics |

### Volunteer Operations


| Method | Endpoint                              | Description              |
| ------ | ------------------------------------- | ------------------------ |
| GET    | `/api/volunteer/tasks`                | Get assigned tasks       |
| PUT    | `/api/volunteer/tasks/:taskId/status` | Update task status       |
| GET    | `/api/volunteer/statistics`           | Get volunteer statistics |
| GET    | `/api/volunteer/activities`           | Get activity log         |

## 👥 User Roles


| Role          | Access Level                                      |
| ------------- | ------------------------------------------------- |
| **Donor**     | Create donations, track status, view points       |
| **NGO**       | Accept donations, manage requests, assign tasks   |
| **Receiver**  | Request donations, track requests                 |
| **Volunteer** | Accept tasks, update delivery status, earn points |
| **Admin**     | Full system access                                |

## 🎯 Points System

### Donors

* 20 points per donation made
* Level up every 100 points

### Volunteers

* 15 points per successful delivery
* Level up every 50 points

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   * Check your MongoDB URI in `.env`
   * Ensure MongoDB is running
2. **Authentication Issues**
   * Clear browser cache
   * Check if token is stored in localStorage
   * Verify JWT\_SECRET in `.env`
3. **CORS Errors**
   * Ensure frontend URL is correct in backend CORS config
   * Check VITE\_API\_URL in frontend `.env`
4. **Port Already in Use**
   * Change PORT in backend `.env`
   * Kill process using the port

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For any queries or support, please contact the development team.

## 🙏 Acknowledgments

* Group members
* Open source community

KindKart is a comprehensive donation management platform that connects donors, NGOs, volunteers, and receivers. The platform streamlines the donation process from creation to delivery with a reward system for volunteers.
