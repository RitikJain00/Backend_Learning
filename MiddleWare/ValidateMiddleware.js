const express = require('express')

const app = express();

app.use(express.json()) ;  // middleware which is used to parse json data

const validateUserPass = (req,res,next) => {          // middleware  just checking the valid user or not
    const username = req.headers.username;
    const password = req.headers.password;

    if(username != "Ritik" || password != "123")
    {
        res.status(403).json({
            msg: "Invalid user"
        })
    }

    next();    // it will give control to the next middleware/serve request
}

const valdiateCourse = (req,res,next) =>{
    const course = req.body.course;

    if(course != 'MCA')
    {
        res.status(411).json({
            msg: "Course is Invalid"
        })
    }

    next();
}

app.post('/', validateUserPass , valdiateCourse, (req,res) => {
    res.json({
        msg: "Welcome"
    });
})

app.listen(3000);