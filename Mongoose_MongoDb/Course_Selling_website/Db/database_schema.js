const mongoose = require('mongoose')   // mongoose library used for communicate with database

mongoose.connect("mongodb+srv://username:password@cluster0.ugnn6.mongodb.net/Course_Selling") // connect database


const AdminSchema = new mongoose.Schema({  // Admin Schema
    username: String,
    password: String,
});

const CoursesSchema = new mongoose.Schema({   // Course Schema
    title: String,
    discription: String,
    imageLink: String,
    price: Number
});

const UserSchema = new mongoose.Schema({   // User Schema
    username: String,
    password: String,
    purchasedCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses"
        }
    ]
});


const Admin = mongoose.model("Admin", AdminSchema);       // Creating Model
const Courses = mongoose.model("Courses", CoursesSchema);
const User = mongoose.model("User", UserSchema);



module.exports = {   // export to other files
    Admin,
    User,
    Courses
}

