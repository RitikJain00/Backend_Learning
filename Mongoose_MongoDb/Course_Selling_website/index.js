const express = require('express');
const bodyParser = require('body-parser') // o parse the body of incoming requests

const app = express();
const PORT = 3000;

const adminRoute = require('./Routes/admin.js');
const userRoute = require('./Routes/user.js');

app.use(bodyParser.json())
app.use('/user', userRoute);
app.use('/admin', adminRoute);



app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})