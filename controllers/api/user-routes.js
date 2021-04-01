const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    console.log('This is the body', req.body);
    try {
        // res.json({ msg: "I have been hit" });
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        console.log(password);
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

router.post('/login', async (req, res) => {
    // console.log("Hello");
    try {
        const user = await User.findOne({ where: { username: req.body.username } });

        if (!user) {
            res
                .status(400)
                .json({ message: 'No user account found!' });
            return;
        }
        // console.log(user);
        const validPassword = await user.checkPassword(req.body.password);
        console.log(validPassword);
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

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
