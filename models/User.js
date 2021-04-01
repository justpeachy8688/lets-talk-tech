// REQUIRE MODEL AND DATATYPES FROM SEQUELIZE
const { Model, DataTypes } = require("sequelize");
// REQUIRE SEQUELIZE OBJECT FROM CONNECTION
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

// CREATE USER MODEL
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// CALL OUR MODEL, DEFINE TABLE COLUMNS AND CONFIGURATION
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // THE PASSWORD MUST BE AT LEAST 8 CHARACTERS LONG
        len: [8],
      }
    }
  },
  {
    // HOOKS
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // PASS IN OUR IMPORTED SEQUELIZE CONNECTION(DIRECT CONNECTION TO OUR DATABASE)
    sequelize,
    // DON'T AUTOMATICALLY CREATE createdAt/updatedAt TIMESTAMP FIELDS
    timestamps: false,
    // DON'T PLURALIZE NAME OF DATABASE FIELD
    freezeTableName: true,
    // USE UNDER_SCORES INSTEAD OF CamelCasing
    underscored: true,
    // MODEL NAME STAYS LOWERCASE IN THE DATABASE
    modelName: "User",
  }

);

module.exports = User;