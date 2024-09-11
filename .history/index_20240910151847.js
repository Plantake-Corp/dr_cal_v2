const express = require('express');
const mongoose = require('mongoose');
const foodHandler = require("./food.handler");

// express app initialization
const app = express();
app.use(express.json());

//mongodb+srv://plantake:Thisisatemppass321@cluster0.brgz2.mongodb.net/?retryWrites=true&w=majority&appName=cluster0
//mongodb+srv://plantake:Thisisatemppass321@cluster0.brgz2.mongodb.net/calorieTrackerDB?retryWrites=true&w=majority&appName=cluster0
// database connection with mongoose
mongoose.connect('mongodb+srv://plantake:Thisisatemppass321@cluster0.brgz2.mongodb.net/calorieTrackerDB?retryWrites=true&w=majority&appName=cluster0') // mongodb+srv://admin:admin@Cluster0.7vvfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
.then(()=> console.log("Connection successful"))
.catch((err)=> console.log(err));

// application routes
app.use("/foods", foodHandler);

// default error handler
function errorHandler(err, req, res, next){
    if (res.headersSent){
        return next(err);
    }
    res.status(500).json({error: err});
}

app.listen(3000, ()=>{
    console.log("app listening at port 3000");
});