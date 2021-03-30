// REQUIRE MODEL AND DATATYPES FROM SEQUELIZE
const { Model, DataTypes } = require("sequelize");
// REQUIRE SEQUELIZE OBJECT FROM CONNECTION
const sequelize = require("../config/connection");

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        validate: {
            len: [3]
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post',
            key: 'id'
        }
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
        modelName: "comment",
    }
)

module.exports = Comment;