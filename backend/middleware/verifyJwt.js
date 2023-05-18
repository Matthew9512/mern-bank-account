const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;

   if (!authHeader.startsWith('Bearer ')) return res.status(401).json({ message: `You are not authorized to access this information` });

   const accessToken = authHeader.split(' ')[1];

   jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, decodedInfo) => {
      if (err) return res.status(403).json({ message: `You are not authorized to access this information` });
      req.user = decodedInfo;
      next();
   });
};

module.exports = verifyJwt;
