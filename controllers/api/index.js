//CREATE A ROUTER BY REQUIRE EXPRESS
const router = require('express').Router();

//IMPORT ALL OF OUR ROUTING FILES
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');

//CONFIGURE THE ROUTES 
router.use("/comment", commentRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);

//EXPORT ROUTER
module.exports = router;