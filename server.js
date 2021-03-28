const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//SET UP handlebars.js ENGINE WITH CUSTOM HELPERS
const hbs = exhbs.create();

const sess = {
  secret: "",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//INFORM Express.js ON WHICH TEMPLATE TO USE
app.engine("handlebars", hbs.engine);
app.set("view engine");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
