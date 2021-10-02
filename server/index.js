const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { sequelize } = require("./models/index");
const { QueryTypes } = require("sequelize");
const testRouter = require("./routes/test")
const userRouter = require("./routes/user")
const folderRouter = require("./routes/folders")
const setRouter = require("./routes/sets")
const cardRouter = require("./routes/cards")
const { validateToken } = require("./middlewares/authenticateUser")


const port = 3000

// =============================================================================
// Db Initialization
// =============================================================================
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

app.enable("trust proxy")

app.get('/api/v1', async (req, res) => {
    res.send('Hello World!!!')
})
// =============================================================================
// Routes
// =============================================================================
app.use("/api/v1/test", testRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/folders", folderRouter)
app.use("/api/v1/sets", setRouter)
app.use("/api/v1/cards", cardRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://157.245.244.111:${port}`)
})


