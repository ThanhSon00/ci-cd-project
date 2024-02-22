const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

const newRoutes = [
  {
    path: '/users',
    route: null,
  },
];
if (config.env !== 'development') {
  defaultRoutes.forEach(route => {
    router.use(route.path, route.route);
  });
}

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach(route => {
    router.use(route.path, route.route);
  });
}

newRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;
