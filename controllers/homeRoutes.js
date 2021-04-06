const router = require('express').Router();
const { Post, User, Comment } = require('../models');

//THIS GETS ALL POSTS FOR HOMEPAGE
router.get('/', async (req, res) => {

    try {
        let postData = await Post.findAll({
            include: [User]
        });
        console.log("postData:", postData)
        const posts = postData.map(post => post.get({
            plain: true
        }));
        console.log("POSTS:", posts)
        res.render('homepage', { posts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//GET SINGLE POST BY ID
router.get('/post/:id', async (req, res) => {
    try {
        let postData = await Post.findByPk(req.params.id, {
            include: [User, {
                model: Comment,
                include: [User],
            }]
        })
        if (postData) {
            const post = postData.get({
                plain: true
            });
            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});


//Export//
module.exports = router;