const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// const mysql = require('mysql2');
// const { development } = require("./config/config");
// const {host, username, password, database } = development
const Sequelize = require('sequelize');


const db_port = 3306
const port = 3000
app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

const initializeDbWithRetry = async () => {
    // console.log("tryin")
    const sequelize = new Sequelize('school', 'roott', 'password', {
        host: 'mysql',
        dialect: 'mysql'
    });

    sequelize.sync()
    .then(result => {
        console.log("worked baby")
        console.log(result)
    })
    .catch(err => {
        console.log('Error',err)
        setTimeout(initializeDbWithRetry, 5000)
    });

    // const mysql = require('mysql2');

    // const connection = mysql.createConnection({
    //     host: 'mysql',
    //     user: 'root',
    //     password: 'password',
    //     database: 'school'
    // });

}


initializeDbWithRetry()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


