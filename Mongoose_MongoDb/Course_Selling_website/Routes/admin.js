const express = require('express')
const adminMiddleWare = require('../Middleware/Admin_middleware.js')
const { Admin } = require('../Db/database_schema.js')
const { Courses } = require('../Db/database_schema.js')
const router = express.Router()
const bcrypt = require('bcrypt')

router.post('/signup' , async (req,res) => {    // admin signup logic
    
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({username: username});
   
    if(user) {
        res.json({
            msg: "Username Already Exist"
        })
    }
    else{

        const hashed = await bcrypt.hash(password,10);   // hashing the password
        Admin.create({
            username: username,
            password: hashed
        })
        .then((response) => {
            res.json({
                msg: "Admin Created Successfully"
            })
        })
        .catch(() => {
            res.status(500).json({
                msg: "There is some Error"
            })
        })
    }

})

router.post('/courses',adminMiddleWare, async (req,res) => {    // Creating Course Logic
        const title = req.body.title;
        const description = req.body.description;
        const imagelink = req.body.imagelink;
        const price = req.body.price;

        const check = await Courses.findOne({title: title});

        if(check){
            res.json({
                msg: "Course Already Exist"
            })
        }
        else{
            Courses.create({
                title,
                description,
                imagelink,
                price
            })
            .then((newCourse) => {
                res.json({
                    msg: "Course Created Seuccessfully",
                    CourseId: newCourse._id
                })
            })
            .catch(() => {
                res.json({
                    msg: "There is some issue while creating an course"
                })
            })
        }
})

router.get('/courses',adminMiddleWare, async (req,res) => {   // Viewing all courses logic
    const courses = await Courses.find({});
    res.json(courses); 
})



module.exports = router;