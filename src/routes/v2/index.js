const express = require('express');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

const router = express.Router();

const newRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
];

newRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;
