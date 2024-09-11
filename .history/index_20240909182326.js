const express = require('express');
const mongoose = require('mongoose');

// express app initialization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose.connect('mongodb://localhost/todos', {useNewUrlParser: true,})
.then(()=> console.log("Connection successful"))
.catch((err)=> console.log(err));

// application routes

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