const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// refresh json web token
const refreshJwt = (req, res) => {
   const cookies = req.cookies;
   console.log(cookies);
   if (!cookies?.jwt) return res.status(401).json({ message: `You are not authorized to access this information` });
   const refreshToken = cookies.jwt;

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (error, decodedInfo) => {
      if (error) {
         console.log(error);
         return res.status(403).json({ message: `You are not authorized to access this information` });
      }
      const findUser = await userModel.findOne({ _id: decodedInfo.userID });
      if (!findUser) return res.status(401).json({ message: 'User not found, refresh' });

      const accessToken = jwt.sign({ email: findUser.email, userID: findUser.id }, process.env.ACCESS_TOKEN, { expiresIn: '20s' });

      res.json({ accessToken });
   });
};

module.exports = refreshJwt;
