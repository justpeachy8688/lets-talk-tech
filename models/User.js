//REQUIRE MODEL AND DATATYPES FROM SEQUELIZE
const { Model, Datatypes, DataTypes } = require("sequelize");
//REQUIRE SEQUELIZE OBJECT FROM CONNECTION
const sequelize = require("../config/connection");

//CREATE USER MODEL
class User extends Model { }

//CALL OUR MODEL, DEFINE TABLE COLUMNS AND CONFIGURATION
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
