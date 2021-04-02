const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET ALL USERS
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    //console.log('WE ARE HITTING THIS ROUTE')
    User.findAll({

        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//GET USER BY ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user with that id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

//CREATE NEW USER
router.post('/', async (req, res) => {
    console.log('This is the body', req.body);
    try {
        // res.json({ msg: "I have been hit" });
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        console.log("password:", password);
        // console.log(newUser);
        console.log(username);
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;


            //res.status(200).json(newUser);
        });
        res.json(newUser)

    } catch (err) {
        res.json(err);
    }
});

//USER LOGIN (POST)
router.post('/login', async (req, res) => {
    console.log("Hello");
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        console.log("user:", user);
        if (!user) {
            console.log("I MADE IT HERE!");
            res
                .status(400)
                .json({ message: 'No user account found!' });
            return;
        }
        // console.log(user);
        const validPassword = await user.checkPassword(req.body.password);
        console.log("valid:", validPassword);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;

            res.json({ user, message: 'You are now logged in!' });
        });

    } catch (err) {
        //CHANGE TO MESSAGE
        res.status(400).json(err);
    }
});

//USER LOGOUT (POST)
router.post('/logout', withAuth, (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//UPDATE USER (PUT)
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body,
        {
            where: {
                id: req.params.id
            }
        })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: 'No user found with this id'
                });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
})

//DELETE USER
router.delete('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
