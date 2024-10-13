const express = require("express");   // helps to create http server
const mongoose = require('mongoose');  // helps to connect database
const jwt = require("jsonwebtoken");   // helps to create a uinqe token for user
const bcrypt = require("bcrypt");       // helps to create hashed password
const jwtPassword = "2209";             // jwtPassword is used to verify the token of user

mongoose.connect("mongodb+srv://admin:admin@cluster0.ugnn6.mongodb.net/userApp")  // connect the database

const User = mongoose.model("User", {           // model of database
    name: String,
    email: String,
    password: String
})


const app = express();
app.use(express.json());            // middleware helps to parse the json

app.post('/signup', async function (req,res) {     // signup logic
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;


    try{
        const existingUser = await User.findOne({email: email});   // check existing user
        if(existingUser)
        {
            return res.json({
                msg: "User Already Exist"
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);  // creating hased password
        const user = new User(
            {
                name: name,                     // store user information in database
                email: email,
                password: hashedPassword
            }
        )
        await user.save();
    
        res.json({
            msg: "User is Created Please Sign In"
        })
    }

    catch(err){
        console.log(err);
        res.json({
            msg: "There is some error"
        })
    }
    
})


app.post("/signin", async (req,res) => {    // signin logic
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.findOne({email: email})
        if(!user)
        {
            res.status(403).json({              // if user is not present
                    msg: "User is not present Please signup first"
                }
            )
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json({           // checking its password
                 msg: "Password Not Match" 
                });
        }
    
        let token = jwt.sign({email: email} , jwtPassword);  // generating token
    
        res.json({
            msg: "You are Logged in",
            token: token
        })
    }

    catch(err)
    {
        res.json({
            msg: "There is Some Error"
        })
    }
  
})

app.listen(3000)