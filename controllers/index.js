const { Router } = require("express");
const { resourceLimits } = require("worker_threads");
const router = require('express').Router();

//IMPORT API ROUTES
const apiRoutes = require('./api/');

//CONFIGURE THE ROUTE
router.use('/api', apiRoutes);

// router.use((req, res) => {
//     res.send("<h1>Wrong Route!</h1>")
// });

//EXPORT THE ROUTER
module.exports = router;