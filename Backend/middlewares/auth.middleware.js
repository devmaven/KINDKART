const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ================= USER AUTH =================
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (user.isLocked) {
            return res.status(403).json({ message: 'Your account is blocked' });
        }

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// ================= ADMIN AUTH =================
module.exports.authAdmin = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        if (user.isLocked) {
            return res.status(403).json({ message: 'Your account is blocked' });
        }

        req.user = user;
        
        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
