const express = require("express");
const mongoose = require("mongoose");//mongoose is an ODM used to communicate with mongoDB.So we can connect to the server and perform CRUD operations on the database.
const userRoute = require("./routes/userRoutes");

const compass_string = "mongodb://localhost:27017/cohort8_db"
const atlas_string = "mongodb+srv://kickoffdiscussions_db_user:kickoffdiscussions_db_user@cluster0.jcufcbi.mongodb.net/cohort8_db?appName=Cluster0"


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

app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
})