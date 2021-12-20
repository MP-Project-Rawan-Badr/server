const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());

require("./db");



const PORT = process.env.PORT /*|| 5000*/;
app.listen(PORT , () => {
    console.log(`Server run on ${PORT}`);
})