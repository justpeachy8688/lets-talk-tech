const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
const postData = await Post.findAll({
    attributes: { exclude: ['password'] },
    order: [['created_at', 'DESC']],
})
    } catch (err) {

    }
});


router.get('/:id', withAuth, async (req, res) => {
    try{

    } catch (err) {

    }
})