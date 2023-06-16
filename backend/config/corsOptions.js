const allowlist = [
   'https://mern-bank-account.netlify.app',
   'https://mern-bank-account.onrender.com',
   'http://localhost:8000',
];
const corsOptionsDelegate = function (req, callback) {
   let corsOptions;
   if (allowlist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
   } else {
      corsOptions = { origin: false }; // disable CORS for this request
   }
   callback(null, corsOptions); // callback expects two parameters: error and options
};

module.exports = corsOptionsDelegate;
// const whitelist = [
//    'https://mern-bank-account.netlify.app',
//    'http://127.0.0.1:5173',
//    'https://mern-bank-account.onrender.com',
// ];
// const corsOptions = {
//    credentials: true,
//    optionsSuccessState: 200,

//    origin: (origin, callback) => {
//       if (whitelist.indexOf(origin) !== -1) callback(null, true);
//       else callback(new Error('Not allowed by CORS'));
//    },
// };

// module.exports = corsOptions;
