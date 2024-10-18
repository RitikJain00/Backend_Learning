const bcrypt = require('bcrypt')        // for creating/checking hashed password
const { Admin } = require('../Db/database_schema.js')  

const adminMiddleWare = async (req,res,next) => {  // To verify the admin
    const username = req.headers.username;
    const password = req.headers.password;

   const admin = await Admin.findOne({username:username});  // check admin is present or not

   if(!admin){
    return res.json({
        msg: "Admin does'nt Exist"      // Admin is not present
    })
   }

   const isMatch = await bcrypt.compare(password, admin.password);

   if(!isMatch){
    return res.json({
        msg: "Password does'nt match"       // Admin is presnt but its password is not match
    })
   }

   next();  // Everything is correct Admin verified successfully now transfer the control to the next middleware/route 
    

}

module.exports = adminMiddleWare;