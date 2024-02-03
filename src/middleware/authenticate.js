const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    // Extract token from headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        } else {
            // Attach user information including role to request object
            req.user = decoded;
            next();
        }
    });
}

module.exports = authenticate;
