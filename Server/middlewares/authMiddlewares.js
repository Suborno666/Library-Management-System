require('dotenv').config()
const jwt = require('jsonwebtoken');

function authenticateToken(roles) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token:', token);

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        console.log('Token verification error:', err);
        return res.sendStatus(403);
      }

      console.log('Decoded User:', user);

      if (!roles.includes(user.role)) {
        console.log('User role not allowed:', user.role);
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  };
}



module.exports = { authenticateToken };