const express = require('express')
const userMiddleWare = require('../Middleware/User_middleware.js')
const {User,Courses} = require('../Db/database_schema.js')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post('/signup' , async (req,res) => {        // user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username: username});

    if(user){
        res.json({
            msg: "Username Already Exist"
        })
    }

    else
    {
        const hashed = await bcrypt.hash(password,10);

        User.create({
            username: username,
            password: hashed
        })
        .then((response) => {
            res.json({
                msg: "User is Created"
            })
        })
        .catch((err) => {
            res.json({
                msg: "There is some error"
            })
        }) 
    }
})

router.get('/courses', async (req,res) => {   // viewing all courses logic
        const response = await Courses.find({});

        res.json({
            courses: response
        })
})

router.post('/courses/:id', userMiddleWare, (req,res) => {  // purchasing course logic
    const courseId = req.params.id;
    const username = req.headers.username;
   
   
    User.updateOne(
        {username: username},
        { "$push" : {
            purchasedCourses: courseId
        }}
        )
        .then(() => {
           return  res.json({
                msg: "Course Added Successfully"
            })
        })
        .catch(() =>{
            res.json({
                msg: "There is some issue while adding in course"
            })
        })
})

router.get('/purchasedCourses',userMiddleWare, async (req,res) => {  // view purchased courses logic

   
    const user = await User.findOne({username: req.headers.username});

    const courses = await Courses.find({
        _id: {
            "$in":  user.purchasedCourses
        }
    })

    res.json({
        courses
    })


})

module.exports = router;