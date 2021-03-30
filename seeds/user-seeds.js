const { User } = require('../models');

const userData = [{
    id: 1,
    username: 'Taylor',
    password: 'taylor'
},
{
    id: 2,
    username: 'Braden',
    password: 'braden'
},
{
    id: 3,
    username: 'Cameron',
    password: 'cameron'
},
{
    id: 4,
    username: 'Kimberly',
    password: 'kimberly'
},
{
    id: 5,
    username: 'Patrick',
    password: 'patrick'
}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;