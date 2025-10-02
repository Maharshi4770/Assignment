const jwt = require('jsonwebtoken')
// const {JWT_FARMER_SECRET, JWT_BUYER_SECRET} = require('../config');

function authmiddleware(password) {
    return function (req, res, next) {
        const token = req.headers.token;
        const token1 = req.header;
        let decoded;
        try {
            decoded = jwt.verify(token, password);
        } catch (e) {
            return res.status(401).json({ msg: 'Invalid or expired token' });
        }
        if (decoded) {
            req.userId = decoded.id;
            next();
        } else {
            res.status(403).json({
                msg: 'You are not signedIn'
            });
        }
    }
}


module.exports = {
    authmiddleware: authmiddleware
}