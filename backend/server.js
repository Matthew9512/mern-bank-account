require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cacheControl = require('./middleware/cacheControl');

const app = express();
const PORT = 8000;
const connDB = require('./config/connDB');
const verifyJwt = require('./middleware/verifyJwt');

app.use(cors(corsOptions));
// app.use(cors());
// app.use(compression())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cacheControl);

app.use('/auth', require('./routes/authRouter'));
app.use('/account', verifyJwt, require('./routes/accountMovementsRouter'));

connDB();

app.listen(PORT, () => {
   console.log(`server started`);
});
