const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();

const dirpath = path.join(__dirname, 'files')   // __dirname gives the current location
                                                // path.join basiciaclly concat the curr. path and files location 
app.get('/', (req,res) => {

    fs.readdir(dirpath , (err,files) =>{
        if(err)
        {
            res.status(500).json(
                {
                    msg: "Unable to read Directory"
                }
            )
        }

        res.send(`
            <html>
            <body>
                <h2>Files in Directory:</h2>
                <ul>
                    ${files.map((file) => `<li>${file}</li>`).join('')}
                </ul>
            </body>
        </html> `
        )
    })

    app.get('/filesystem/:fileName', (req,res) =>{

        const fileName =req.params.fileName;  // read input fileName
        

        const filePath = path.join(__dirname, 'files', fileName); // creating a path
    


        fs.readFile(filePath, "utf-8", (err,data) =>         // reading a file
        {
            if(err) {
                res.status(404).json({
                    msg: "Invalid FileName"
                })
            }

            res.send(data);
        })
    })
})

app.listen(3000);