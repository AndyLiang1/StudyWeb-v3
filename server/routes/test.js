const express = require("express");
const router = express.Router();
const { sequelize } = require("../models/index");

/*
 * These routes are used for testing. Hence, they have very little documentation.
 */

// =============================================================================
// Clear tables
// =============================================================================

router.delete("/clearUsers", async (req, res) => {
    await sequelize.query("DELETE FROM Users")
    .then((data) => {
        res.json({
            status: 'success',
            data
        })
    }).catch((error) => {
        res.json({
            status: 'fail',
            error
        })
    });

});

router.delete("/clearQuizzes", async (req, res) => {
    await sequelize.query("DELETE FROM Quizzes")
    .then((data) => {
        res.json({
            status: 'success',
            data
        })
    }).catch((error) => {
        res.json({
            status: 'fail', 
            error
        })
    });
});

router.delete("/clearCuecards", async (req, res) => {
    await sequelize.query("DELETE FROM Cuecards")
    .then((data) => {
        res.json({
            status: 'success',
            data
        })
    }).catch((error) => {
        res.json({
            status: 'fail',
            error
        })
    });
});

module.exports = router