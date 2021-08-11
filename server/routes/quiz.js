const express = require("express")
const router = express.Router();

const { QueryTypes } = require("sequelize")
const { sequelize } = require("../models/index")

const { validateToken } = require("../middlewares/authenticateUser")



router.post("/", validateToken, async (req, res) => {
    const {quizName, userId} = req.body
    await sequelize
    .query("INSERT INTO quizzes (name, userId) VALUES (?, ?)", {
        replacements: [quizName, userId],
    })
    .then((data) => {
        res.json({
            status: 'success',
            data
        })
        console.log(result )
    })
    .catch((error) => {
        console.log(error);
    });
})

router.put("/", validateToken, async (req, res) => {
    const {newQuizName, quizId} = req.body
    await sequelize
    .query("UPDATE quizzes SET name = ? WHERE id = ?", {
        replacements: [newQuizName, quizId],
    })
    .then((data) => {
        res.json({
            status: 'success',
            data
        })
        console.log(result )
    })
    .catch((error) => {
        console.log(error);
    });
})

router.delete("/", validateToken, async (req, res) => {
    const {quizId} = req.params
    await sequelize
    .query("DELETE FROM quizzes WHERE id = ?", {
        replacements: [quizId],
    })
    .then((data) => {
        res.json({
            status: 'success',
            data
        })
        console.log(result )
    })
    .catch((error) => {
        console.log(error);
    });
})


