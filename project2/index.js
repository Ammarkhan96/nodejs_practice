const express = require("express")
const fs = require('fs')
const todos = require('./MOCK_DATA.json')
const yup = require('yup')

const app = express()
const PORT = 8000

//Middleware  (but for now assume this is a Plugin)
app.use(express.urlencoded({ extended: false }))


const todoSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    job_title: yup.string().required()
})

//Routes

app.get("/todos", (req, res) => {
    const html = `
    <ol>
       ${todos.map(user => `<li>${user.first_name}</li>`).join("")}
    </ol>
    `;
    res.send(html);
})
//run (http://localhost:8000/users)


//REST API
app.get('/api/todos', (req, res) => {
    return res.json(todos)
})
//run (http://localhost:8000/api/users)

app
.route("/api/todos/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    return res.json(todo);
})



app.post("/api/todos", async (req, res) => {
    try {
        const body = await todoSchema.validate(req.body);
        todos.push({ ...body, id: todos.length + 1 });
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(todos), (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write to file' });
            }
            return res.json({ status: "success", id: todos.length });
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});



app.patch("/api/todos/:id", async (req, res) => {
    const id = Number(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const updatedTodo = await todoSchema.validate(req.body);
        todos[todoIndex] = { ...todos[todoIndex], ...updatedTodo };
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(todos), (err, data) => {
            return res.json({ status: "success" });
        });
    } catch (error) {
        return res.status(400).json({ error: error.errors.join(', ') });
    }
});


app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    todos.splice(todoIndex, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(todos), (err, data) => {
        return res.json({ status: "success" });
    });
});


app.listen(PORT, () =>console.log(`Server Started at PORT: ${PORT}`))







// const express = require('express');
// const fs = require('fs');
// const yup = require('yup');
// const app = express();

// const dataFilePath = 'data.json';
// app.use(express.urlencoded({ extended: false }))

// const userSchema = yup.object().shape({
//     name: yup.string().required(),
//     email: yup.string().email().required(),
//     age: yup.number().required().positive().integer(),
// });


// let users = require(`./${dataFilePath}`).users;

// // for get
// app.get('/api/users', (req, res) => {
//     res.json({ users });
// });

// app
// .route("/api/users/:id")
// .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// })


// //for posy
// app.post("/api/users", async (req, res) => {
//     try {
//         const body = await userSchema.validate(req.body);
//         users.push({ ...body, id: users.length + 1 });
//         fs.writeFile('./data.json', JSON.stringify(users), (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to write to file' });
//             }
//             return res.json({ status: "success", id: users.length });
//         });
//     } catch (error) {
//         return res.status(400).json({ error: error.message });
//     }
// });



// app.listen(5000, () => {console.log("Server started on port 5000");});