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

      const accessToken = jwt.sign({ email, userID: findUser.id }, process.env.ACCESS_TOKEN, { expiresIn: '10s' });

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

      // const accountNumber =

      const newUser = await userModel.create({ password: bcryptPass, email, username });

      return res.status(201).json({ message: `Account successfully created, welcome ${username}` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const logOut = async (req, res, next) => {
   try {
      // const cookies = req.cookies;
      // if (!cookies?.jwt) return res.sendStatus(204); //No content
      // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      res.status(200).json({ message: `Logout successfull` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

const deleteAcc = async (req, res, next) => {
   try {
      const { id } = req.body;

      if (!id) return res.status(404).json({ message: `Incorrect users data` });

      // decoded users info
      const { userID } = req.user;

      if (id !== userID) return res.status(403).json({ message: `You are not authorized to access this information` });

      const deleteUser = await userModel.findByIdAndDelete(id);

      if (!deleteUser) return res.status(400).json({ message: `User not found` });

      res.status(200).json({ message: `Account successfully deleted` });
   } catch (error) {
      console.log(error);
      next(error);
   }
};

module.exports = { logIn, signIn, logOut, deleteAcc };
