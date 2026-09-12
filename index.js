//import "dotenv/config"
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");//mongoose is an ODM used to communicate with mongoDB.So we can connect to the server and perform CRUD operations on the database.
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");

const compass_string = process.env.COMPASS_STRING
const atlas_string = process.env.ATLAS_STRING


mongoose.connect(atlas_string) //this is the connection string to connect to the local mongoDB server. The database name is cohort8_db. If the database does not exist, it will be created automatically when we insert data into it.
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("connection error: ", err));

const app = express();
const port = 5555;


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is active");
});

app.use("/users", userRoute);

app.use("/products", productRoute)

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})