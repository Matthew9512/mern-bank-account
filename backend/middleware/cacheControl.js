const cacheControl = function (req, res, next) {
   const period = 60 * 2;

   if (req.method === 'GET') res.set('Cache-control', `public, max-age=${period}`);
   res.set('Cache-control', 'no-store');

   next();
};

module.exports = cacheControl;
