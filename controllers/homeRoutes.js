const router = require('express').Router();
const { Post, User } = require('../models');
const User = require('../models/User');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            //GRAB FROM THE POST TABLE..
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ],
        });

        // SERIALIZE DATA SO THE TEMPLATE CAN READ IT
        const posts = postData.map((post) => post.get({ plain: true }));

        //PASS SERIALIZED DATA AND SESSION FLAG INTO TEMPLATE
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

projects = map()
