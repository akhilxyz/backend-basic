const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.query['x-access-token'] || req.headers['x-access-token']
        if(!token)  res.status(403).send({success: false, message: "No token Provided"});
        const decoded = jwt.verify(token, "secret");
        let userData = {
            Id:decoded.userId,
            Name:decoded.userName,
            Email:decoded.userEmail,
        }
        req.userData = userData;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            Error: error
        });
    }
};