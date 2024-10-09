const express = require('express')

const app = express();
const PORT = 3000;

app.use(express.json());

let database = [                // initial database
    {
        id: 1,
        name: "Ashish",

        healthyOrgans: ['heart','kidney','lungs'],
        unHealthyOrgans: ['Liver']
    },

    {
        id: 2,
        name: "Shrishty",

        healthyOrgans: ['heart','Brain','lungs'],
        unHealthyOrgans: ['kidney']
    },

    {
        id: 3,
        name: "Rakul",

        healthyOrgans: ['heart','kidney','lungs'],
        unHealthyOrgans: ['Brain']
    },
]

app.get('/', (req,res) =>{   // simply return show the current database
    res.json(database);
})

app.post('/', (req,res) =>{  // add new patient information
    const obj = req.body;
    database.push(obj);

    res.json(database);
})

app.put('/', (req,res) =>{    // update patient information
    const obj = req.body;

    if(obj.id > database.length) res.status(411).json({msg: "Invalid Id"});

    database[obj.id-1].healthyOrgans = obj.healthyOrgans;
    database[obj.id-1].unHealthyOrgans = obj.unHealthyOrgans;
    res.json(database);

})

app.delete('/', (req,res) =>{   // delete patient information
    const obj = req.body;
    if(obj.id > database.length) res.status(411).json({msg: "Invalid Id"});
    const newDatabase = database.filter((data) => {
        return (data.id != obj.id);
    }) 

    database = newDatabase;
    res.json(database);
})

app.listen(PORT, () => {
    `Server is running at ${PORT}`
})