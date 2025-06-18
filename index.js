require('dotenv').config();
const express = require("express");
const app = express();
const router = require("./src/router");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use("/", router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

