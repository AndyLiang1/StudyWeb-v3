const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { sequelize } = require("./models/index");
const { QueryTypes } = require("sequelize");


const port = 3000
app.get('/', async(req, res) => {
    // res.send('Hello World!!!')
    const users = await sequelize.query("SELECT * FROM users;", {
        type: QueryTypes.SELECT,
      });
    res.json(users)
})

const initializeDbWithRetry = async () => {
    sequelize.sync()
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log('Error', err)
            setTimeout(initializeDbWithRetry, 5000)
        });
}

initializeDbWithRetry()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


