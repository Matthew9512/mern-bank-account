require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();
const PORT = 6000;
const connDB = require('./config/connDB');

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', require('./routes/userRouter'));
app.use('/dashboard', require('./routes/dashboardRouter'));

connDB();

app.listen(PORT, () => {
   console.log(`server started`);
});
