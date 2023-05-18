const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const logIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(404).json({ message: `No data provided` });

      const findUser = await userModel.findOne({ email });

      if (!findUser) return res.status(404).json({ message: `User no found` });

      const verifyPass = await bcrypt.compare(password, findUser.password);

      if (!verifyPass) return res.status(404).json({ message: `Wrong username or password` });

      //   res.status(200).json({ message: `Login successfull, welcome ${findUser.username}` });

      const accessToken = jwt.sign({ email, userID: findUser.id }, process.env.ACCESS_TOKEN, { expiresIn: '40s' });

      const refreshToken = jwt.sign({ email, userID: findUser.id }, process.env.REFRESH_TOKEN, { expiresIn: '1d' });

      res.cookie('jwt', refreshToken, {
         httpOnly: true, //accessible only by web server
         secure: true, //https
         sameSite: 'None', //cross-site cookie
         maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });

      res.status(200).json({ accessToken, message: `Login successful, welcome back ${findUser.username}` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const signIn = async (req, res, next) => {
   try {
      const { password, email, username } = req.body;

      if (!password || !email || !username) return res.status(404).json({ message: `No data provided` });

      const duplicate = await userModel.findOne({ email });

      if (duplicate) return res.status(409).json({ message: `Email is invalid or already taken` });

      const bcryptPass = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({ password: bcryptPass, email, username });

      return res.status(201).json({ message: `Account successfully created, welcome ${username}` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const deleteAcc = async (req, res, next) => {
   /**
    * @todo verifyJwt
    */
   try {
      const { id, password } = req.body;

      if (!password || !id) return res.status(404).json({ message: `Incorrect users data` });

      const deleteUser = await userModel.findByIdAndDelete(id);

      if (!deleteUser) return res.status(400).json({ message: `User not found` });

      res.status(200).json({ message: `User deleted` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { logIn, signIn, deleteAcc };
