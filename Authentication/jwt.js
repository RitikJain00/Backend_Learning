const express = require('express');
const app = express();
const jwt = require('jsonwebtoken')

const jwtPassword = '123456';

app.use(express.json());

const Users = [
    {
        username: "ritikjain590@gmail.com",
        password: "987",
        name: "Ritik"
    },
    {
        username: "kanishk27@gmail.com",
        password: "658",
        name: "Kanishk"
    },
    {
        username: "shantanu@gmail.com",
        password: "3561",
        name: "Shantanu"
    }
];

const checkValid = (username,password) => {
    for(let i = 0  ; i < Users.length ; i++)
    {
        if(Users[i].username === username && Users[i].password === password) return true;
    }
    return false;
}


app.post('/signin', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!checkValid(username,password))
    {
        res.status(403).json({
            msg: "Invalid User"
        })
    }

    let token = jwt.sign({username: username}, jwtPassword)   //  creating token for the user
    res.json({
        token
    })
})

app.get('/users', (req,res) =>{
    try {
        let token = req.headers.authorization;
        const decoded = jwt.verify(token , jwtPassword);  // verifying the token of user
        res.json({
            msg: `Welcome ${decoded.username}`
        })
    }
    catch(err)
    {
        res.json({
            msg: "Invalid User"
        })
    }
   
})


app.listen(3000)