// const userModel = require('../models/user.model');
//   console.log("HEADER:", req.header('Authorization')); 
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const blacklistTokenModel = require('../models/blacklistToken.model');

// // ================= USER AUTH =================
// module.exports.authUser = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
    
//     const isBlacklisted = await blacklistTokenModel.findOne({ token });
//     if (isBlacklisted) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
    
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         if (!user) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         if (user.isLocked) {
//             return res.status(403).json({ message: 'Your account is blocked' });
//         }

//         req.user = user;

//         return next();

//     } catch (err) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// // ================= ADMIN AUTH =================
// module.exports.authAdmin = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
     
//     const isBlacklisted = await blacklistTokenModel.findOne({ token });
//     if (isBlacklisted) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         if (!user || user.role !== 'admin') {
//             return res.status(403).json({ message: 'Access denied' });
//         }

//         if (user.isLocked) {
//             return res.status(403).json({ message: 'Your account is blocked' });
//         }

//         req.user = user;
        
//         return next();

//     } catch (err) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// // const jwt = require('jsonwebtoken');
// const User = require('../models/user.model');

// const authUser = async (req, res, next) => {
//   try {
//         const token = req.header('Authorization')?.replace('Bearer ', '');
//             if (!token) {
//       return res.status(401).json({ message: 'No token, access denied' });
//     }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         decoded = { id: userId }
//             const user = await User.findById(decoded.id).select('-password');
//                 req.user = user;
           
//     next();
//       } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

// module.exports = { authUser };


const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

// ================= USER AUTH =================
const authUser = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        if (user.isLocked) {
            return res.status(403).json({ message: 'Your account is blocked' });
        }

        req.user = user; // Attach user to request
        next();

    } catch (err) {
        console.error('Auth Error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// ================= ADMIN AUTH =================
const authAdmin = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB
        const user = await userModel.findById(decoded._id);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        if (user.isLocked) {
            return res.status(403).json({ message: 'Your account is blocked' });
        }

        req.user = user; // Attach admin user to request
        next();

    } catch (err) {
        console.error('Admin Auth Error:', err.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { authUser, authAdmin };