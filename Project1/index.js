const express = require("express")
const fs = require('fs')
const mongoose = require('mongoose')
// const users = require('./MOCK_DATA.json')

const app = express()
const PORT = 5000

//connection
mongoose.connect("mongodb://127.0.0.1:27017/my-first-mongo-app").then(() => 
console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error", err))

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,   // same email database me na ho
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
}, 
{ timestamps: true }
)

const User = mongoose.model('user', userSchema)

//Middleware  (but for now assume this is a Plugin)
app.use(express.urlencoded({ extended: false }))

// app.use((req, res, next) => {
//     console.log("Hello from Middleware 1");
//     next()
// })

// app.use((req, res, next) => {
//     console.log("Hello from Middleware 2" );
//     next()
// })

//Routes

// app.get("/users", (req, res) => {
//     const html = `
//     <ol>
//        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
//     </ol>
//     `;
//     res.send(html);
// })
//run (http://localhost:5000/users)

app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({})
         const html = `
         <ol>
            ${allDbUsers.map(user => `<li>${user.firstName} - ${user.email}</li>`).join("")}
         </ol>
         `;
     res.send(html);
    })


//REST API
// app.get('/api/users', (req, res) => {
//     // res.setHeader('myName', 'Ammar Khan')
//     return res.json(users)
// })
//run (http://localhost:5000/api/users)

app.get('/api/users', async(req, res) => {
    const allDbUsers = await User.find({})
    //  res.setHeader('myName', 'Ammar Khan')
    return res.json(allDbUsers)
})

// app
// .route("/api/users/:id")
// .get((req, res) => {
//     const id = Number(req.params.id);
//     // const user = users.find((user) => user[0].id === id); //server error 500
//     const user = users.find((user) => user.id === id);
//     if(!user) return res.status(404).json({ error: "User not found" })
//     return res.json(user);
// })

app
.route("/api/users/:id")
.get(async (req, res) => {
    
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({ error: "User not found" })
    return res.json(user);
})

// .patch((req, res) => {
//     //edit user with id
//     return res.json({status: "Pending"})
// })

.patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"})
    //edit user with id
    return res.json({status: "Success"})
})

.delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)

    //delete user with id
    return res.json({status: "Success"})
})


// .delete((req, res) => {
//     //delete user with id
//     return res.json({status: "Pending"})
// })
// run (http://localhost:5000/api/users/23)


 app.post("/api/users", async (req, res) => {
         //TODO: Create new user
         const body = req.body
        //  console.log('Body', body);
        if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
            return res.status(400).json({msg: "All fields req..."})
        }

        const result = await User.create({
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            jobTitle: body.job_title,
            gender: body.gender
        })
        // console.log("result", result);
        return res.status(201).json({msg: 'success'})

        // users.push({...body, id: users.length + 1});
        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        //     return res.status(201).json({ status: "success", id: users.length })
        // })
//    return res.json({ status: "pending" })
 })


 app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex] = { ...users[userIndex], ...req.body };
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update user' });
        }
        return res.json({ status: "success" });
    });
});




app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        return res.json({ status: "success" });
    });
});

 

//  app.patch("/api/users", (req, res) => {
//     //Remove user
//     const body = req.body
//     users.pop({...body, id: users.length - 1})
//     fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
//         return res.json({status: "success", id: user.length})
//     })
//  })


// app.patch("/api/users/:id", (req, res) => {
//     //TODO: Edit the User with id
//     return res.json({ status: "pending" })
// })

// app.delete("/api/users/:id", (req, res) => {
//     //TODO: Delete the User with id
//     return res.json({ status: "pending" })
// })


app.listen(PORT, () =>console.log(`Server Started at PORT: ${PORT}`))