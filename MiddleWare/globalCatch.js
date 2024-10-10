const express = require('express')

const app = express();

app.use(express.json()) ;  // middleware which is used to parse json data


app.post('/',  (req,res) => {

    const name = req.body.name;
    const course = req.body.course;
    const skills = req.body.skills;

    res.json({
        msg: `Your name is ${name}. you are persuing ${course} and your skills is ${skills}`
    });
})

// Global Catch (have 4 parameters)   if anywhere error comes then it is redirected to this middleware
// express understand it as a error handler

app.use((err,req,res,next) =>{
    res.status(411).json({
        msg: "Invalid Input"
    })
})

app.listen(3000);