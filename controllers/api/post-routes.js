// EXPRESS CONNECTION
const router = require('express').Router();

const { User, Comment, Post } = require('../../models');
const sequelize = require('../../config/connection')
const withAuth = require('../../utils/auth');

// Routes

// GET api/post/ -- GET ALL POSTS
router.get('/', (req, res) => {
    Post.findAll({
        // FROM POST TABLE, INCLUDE THE POST ID, URL, TITLE, AND TIMESTAMP FROM POST CREATION
        attributes: [
            'id',
            'content',
            'title',
        ],
        // FROM USER TABLE, INCLUDE THE POST CREATOR'S USER NAME
        // FROM COMMENT TABLE, INCLUDE ALL COMMENTS
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        // RETURN THE POSTS
        .then(postData => res.json(postData))
        // IF THERE WAS A SERVER ERROR, RETURN THE ERROR
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET api/posts/:id -- GET SINGLE POST BY ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            // SPECIFY THE POST ID PARAMETER IN THE QUERY
            id: req.params.id
        },
        // QUERY CONFIGURATION
        attributes: [
            'id',
            'content',
            'title',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(postData => {
            // IF NO POST BY THAT ID, RETURN ERROR
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            // IF SERVER ERROR OCCURRED, RETURN ERROR
            console.log(err);
            res.status(500).json(err);
        });
});

// POST api/post -- CREATE NEW POST
router.post('/', withAuth, (req, res) => {
    // EXPECTS OBJECT {title: 'Sample Title Here', post_text: 'Here's some sample text for a post.', user_id: 1}
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT -- UPDATE POSTS TITLE OR TEXT
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// DELETE
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;