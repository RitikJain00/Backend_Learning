const express = require("express");

const app = express();

let noOfRequest = 0;

const calculateRequest = (req,res,next) => {
    noOfRequest++;
    next();
}

app.use(calculateRequest);   // it runs for wvery route request

app.get('/', (req,res) => {
    res.status(200).json({
        msg: noOfRequest
    })
})

app.get('/ritik' , (req,res) => {
    res.status(200).json({
        msg: noOfRequest
    })
})

app.listen(3000);