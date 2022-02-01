const express = require('express');
const app = express();
const db = require('./config/db');

app.get('/', (req, res) => res.send("Response nodejs berhasil"));

app.use(express.urlencoded({extended: true}));

db.authenticate().then(() => console.log('DB Connected'));

const UserModel = require('./models/User');

app.post('/users', async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const NewUser = new UserModel({
            username, email, password
        });
        await NewUser.save();
        res.json(NewUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/users', async (req, res) => {
    try {
        const getUsers = await UserModel.findAll({});
        res.json(getUsers);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.get('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const getUser = await UserModel.findOne({
            where: {id:id}
        });
        res.json(getUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await UserModel.destroy({
            where: {id:id}
        });
        await deleteUser;
        res.json('Behasil menghapus user');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {username, email, password} = req.body;
        const updateUser = await UserModel.update({
            username, 
            email, 
            password
        }, {
            where: {id:id}
        });
        await updateUser;
        res.json('User has updated');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(5000, () => console.log("Port berjalan di 4500"));