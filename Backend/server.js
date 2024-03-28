const express = require("express");
const mongoose = require("mongoose");
const EmployeeRoute = require("./Routes/EmployeeRoute.js")
const connectDB = require("./Config/db.js")
const dotenv = require("dotenv")
const cors = require("cors");
const app = express();

dotenv.config(); 
connectDB();

app.use(cors());
app.use(express.json());

//Routes
app.use('/employees',EmployeeRoute );

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
 