const whitelist = ['https://mern-bank-account.netlify.app', 'http://127.0.0.1:5173', 'http://localhost:8000'];
const corsOptions = {
   credentials: true,
   optionsSuccessState: 200,
   origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error('Not allowed by CORS'));
   },
};

module.exports = corsOptions;
