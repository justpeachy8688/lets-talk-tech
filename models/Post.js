// REQUIRE MODEL AND DATATYPES FROM SEQUELIZE
const { Model, DataTypes } = require('sequelize');
// REQUIRE SEQUELIZE OBJECT FROM CONNECTION
const sequelize = require('../config/connection');

// CREATE POST MODEL
class Post extends Model { }

// CALL OUR MODEL, DEFINE TABLE COLUMNS AND CONFIGURATION
Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        // PASS IN OUR IMPORTED SEQUELIZE CONNECTION(DIRECT CONNECTION TO OUR DATABASE)
        sequelize,
        // DON'T AUTOMATICALLY CREATE createdAt/updatedAt TIMESTAMP FIELDS
        timestamps: false,
        // DONT PLURALIZE NAME OF DATABASE FIELD
        freezeTableName: true,
        // USE UNDER_SCORES INSTEAD OF CamelCasing
        underscored: true,
        // MODEL NAME STAYS LOWERCASE IN THE DATABASE
        modelName: "post",
    }
);

module.exports = Post;