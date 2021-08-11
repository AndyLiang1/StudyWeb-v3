const express = require("express")
const router = express.Router();

const { QueryTypes } = require("sequelize")
const { sequelize } = require("../models/index")

const { validateToken } = require("../middlewares/authenticateUser")

router.get("/", validateToken, async (req, res) => {
    await sequelize
        .query("SELECT * FROM sets")
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
    const { setName, userId } = req.body
    await sequelize
        .query("INSERT INTO sets (name, userId) VALUES (?, ?)", {
            replacements: [setName, userId],
        })
        .then((data) => {
            res.json({
                status: 'success',
                set: {
                    setName,
                    userId,
                }
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.put("/", validateToken, async (req, res) => {
    const { newSetName, userId } = req.body
    await sequelize
        .query("UPDATE sets SET name = ? WHERE id = ?", {
            replacements: [newSetName, userId],
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
        .query("DELETE FROM sets WHERE id = ?", {
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

