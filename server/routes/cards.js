const express = require("express")
const router = express.Router();

const { QueryTypes } = require("sequelize")
const { sequelize } = require("../models/index")

const { validateToken } = require("../middlewares/authenticateUser")

router.get("/", validateToken, async (req, res) => {
    await sequelize
        .query("SELECT * FROM cards")
        .then((data) => {
            res.json({
                status: 'success',
                data
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.post("/", validateToken, async (req, res) => {
    const { question, answer, userId } = req.body
    await sequelize
        .query("INSERT INTO cards (question, answer, userId) VALUES (?, ?, ?)", {
            replacements: [question, answer, userId],
        })
        .then((data) => {
            res.json({
                status: 'success',
                data,
                card: {
                    question,
                    answer,
                    userId,
                }

            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.put("/", validateToken, async (req, res) => {
    const { newCardName, userId } = req.body
    await sequelize
        .query("UPDATE cards SET name = ? WHERE id = ?", {
            replacements: [newCardName, userId],
        })
        .then((data) => {
            res.json({
                status: 'success',
                data
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.delete("/", validateToken, async (req, res) => {
    const { userId } = req.params
    await sequelize
        .query("DELETE FROM cards WHERE id = ?", {
            replacements: [userId],
        })
        .then((data) => {
            res.json({
                status: 'success',
                data
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

module.exports = router


