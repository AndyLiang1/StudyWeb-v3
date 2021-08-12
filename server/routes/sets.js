const express = require("express")
const router = express.Router();

const { QueryTypes } = require("sequelize")
const { sequelize } = require("../models/index")

const { validateToken } = require("../middlewares/authenticateUser")

router.get("/:folderId", validateToken, async (req, res) => {
    const {folderId} = req.params;

    await sequelize
        .query("SELECT * FROM sets where folderId = ?", {
            replacements: [folderId],
        })
        .then((data) => {
            res.json({
                status: 'success',
                length: data[0].length,
                data
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.post("/", validateToken, async (req, res) => {
    const { setName, folderId } = req.body
    await sequelize
        .query("INSERT INTO sets (name, folderId) VALUES (?, ?)", {
            replacements: [setName, folderId],
        })
        .then((data) => {
            res.json({
                status: 'success',
                data,
                set: {
                    name: setName,
                    folderId,
                }
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.put("/", validateToken, async (req, res) => {
    const { newSetName, id } = req.body
    await sequelize
        .query("UPDATE sets SET name = ? WHERE id = ?", {
            replacements: [newSetName, id],
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

router.delete("/:id", validateToken, async (req, res) => {
    const { id } = req.params
    await sequelize
        .query("DELETE FROM sets WHERE id = ?", {
            replacements: [id],
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

