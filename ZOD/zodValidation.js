const express = require('express');
const zod = require('zod')
const app = express()

app.use(express.json())

const schema = zod.object({
    email: zod.string().email(),
    name: zod.string(),
    phone: zod.string().min(10).max(10)
});

app.post('/', (req,res) => {
    const obj = req.body;
    const response = schema.safeParse(obj);

    if(response.success)
    {
        res.json({
            msg: "All Okay"
        })
    }
    else {
        res.status(411).json({
            msg: "Invalid data"
        })
    }
})


app.listen(3000);