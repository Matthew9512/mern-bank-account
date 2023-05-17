const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const logIn = async (req, res) => {};
const signIn = async (req, res) => {
   try {
      const { password, email, username } = req.body;

      if (!password || !email || !username) return res.status(404).json({ message: `No data provided` });

      const duplicate = await userModel.findOne({ email });

      if (duplicate) return res.status(409).json({ message: `email is invalid or already taken` });

      const bcryptPass = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({ password: bcryptPass, email, username });

      return res.status(201).json({ message: `account successfully created, welcome ${username}` });
   } catch (error) {
      console.log(error);
   }
};

module.exports = { logIn, signIn };
