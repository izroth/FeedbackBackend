//create an authenticate middleware
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errors = {
    no_token: 'No token, authorization denied',
    invalid_token: 'Invalid token'
}
const authenticate = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: errors.no_token });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ msg: errors.invalid_token });
        }
        
        req.userid = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ msg: errors.invalid_token });
    }
}
module.exports = authenticate;
