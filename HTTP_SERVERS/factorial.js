
const express = require("express");

const app = express();
const PORT = 3000;

const fact = (val) =>{
    let ans = 1;
    for(let i = 1 ; i <= val ; i++)
    {
        ans = ans * i;
    }
    return ans;
}

app.get("/", (req,res) => {

    const n = parseInt(req.query.n);  // taking input from query
    const ans = fact(n);             // calculating ans
    res.send(ans.toString());       // always send ans in string outherwise it will understand as a status code
})
app.listen(PORT, () => {console.log(`Server is Running at ${PORT}`)});