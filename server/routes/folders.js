const express = require("express")
const router = express.Router();

const { QueryTypes } = require("sequelize")
const { sequelize } = require("../models/index")

const { validateToken } = require("../middlewares/authenticateUser")

router.get("/", validateToken, async (req, res) => {
    await sequelize
        .query("SELECT * FROM folders")
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
    const { folderName, userId } = req.body
    await sequelize
        .query("INSERT INTO folders (name, userId) VALUES (?, ?)", {
            replacements: [folderName, userId],
        })
        .then((data) => {
            res.json({
                status: 'success',
                data,
                folder: {
                    name: folderName,
                    userId,
                }
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.put("/", validateToken, async (req, res) => {
    const { newFolderName, id } = req.body
    await sequelize
        .query("UPDATE folders SET name = ? WHERE id = ?", {
            replacements: [newFolderName, id],
        })
        .then((data) => {
            res.json({
                status: 'success',
                data,
                folder: {
                    name: newFolderName,
                    id,
                }
            })
        })
        .catch((error) => {
            console.log(error);
        });
})

router.delete("/:id", validateToken, async (req, res) => {
    const { id } = req.params
    await sequelize
        .query("DELETE FROM folders WHERE id = ?", {
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


