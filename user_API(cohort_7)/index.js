const express = require("express") // Import express framework
const mongoose = require("mongoose"); //Import mongoose
const app = express() // Create express application
app.use(express.json()); // Initializing middleware used to get information from the frontend
const userRoute = require("./route/user.route");


mongoose.connect("mongodb+srv://itz_tycon:3M7tE5tm7aPi6B15@axiacohort7.wdev4.mongodb.net/cohort8?retryWrites=true&w=majority&appName=AxiaCohort7")
.then(() => {
  console.log("Connected to Database");
})
.catch(() => {
  console.log("There is an error");
});

app.use(userRoute);


app.listen(4000, () => {
  console.log("app is listening")
})