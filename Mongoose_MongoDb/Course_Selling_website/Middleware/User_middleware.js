
const bcrypt = require('bcrypt') // for creating/checking hashed password
const { User } = require('../Db/database_schema.js')

const userMiddleWare = async (req,res,next) => {    // To verify the user
    const username = req.headers.username;
    const password = req.headers.password;

   const user = await User.findOne({username:username});

   if(!user){
    return res.json({                   // user is not present
        msg: "User does'nt Exist"
    })
   }

   const isMatch = await bcrypt.compare(password, user.password);

   if(!isMatch){
    return res.json({                     // user is presnt but its password is not match
        msg: "Password does'nt match"
    })
   }

   next();      // Everything is correct user verified successfully now transfer the control to the next middleware/route 
    
}

module.exports = userMiddleWare;