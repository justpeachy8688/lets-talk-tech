const router = require("express").Router();
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboard-routes.js');

//IMPORT API ROUTES
const apiRoutes = require('./api/');

//CONFIGURE THE ROUTE
router.use('/api', apiRoutes);
// router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

//EXPORT THE ROUTER
module.exports = router;