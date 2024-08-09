const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require("cookie-parser");
const Router = require('./Router/Router');
const CONSTANTS = require('./constant/constant');
const session = require('express-session');

const port = process.env.PORT || 2000;

const corsOptions = {
  origin: CONSTANTS.BASE_URL_OF_FRONT_END,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use('/', Router);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
