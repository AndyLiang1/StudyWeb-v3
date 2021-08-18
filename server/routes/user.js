const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models/index");

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "studyweb-auth@outlook.com",
        pass: "passpass123!"
    }
})



/**
 * This function adds a user into the database.
 * @param {string} name name of the user
 * @param {string} email email of the user
 * @param {string} hashedPass hashed password
 */
async function addUser(name, email, hashedPass) {
    const confirmed = false
    const result = await sequelize
        .query("INSERT INTO users (name, email, password, confirmed) VALUES (?, ?, ?, ?)", {
            replacements: [name, email, hashedPass, confirmed],
        })
        .catch((error) => {
            console.log(error);
        });

    return result;
}




/**
 * This function returns an array of the users that match the email provided.
 * If this returned array's length is 0, then the database does not contain
 * a user with that email yet.
 * @param {string} email the email that the database checks to see if it has it already
 */
async function checkEmailExist(email) {
    const users = await sequelize.query("SELECT * FROM users WHERE email = ?", {
        replacements: [email],
        type: QueryTypes.SELECT,
    });
    return users;
}


async function editUser(id) {
    const result = await sequelize
        .query("UPDATE users SET confirmed = 1 WHERE id = ?", {
            replacements: [id],
        })
        .catch((error) => {
            console.log(error);
        });
    return result;
}

router.get('/confirmation/:token', async (req, res) => {
        let {token} = req.params;
        token = token.substring(0, token.length - 1);

        await jwt.verify(token, process.env.SECRET_EMAIL, function(err, decoded) {
           if(err){
               console.log(`Problem with link in email: ${err}`)
           } else {
               editUser(decoded.id)
               res.redirect('http://localhost:3000/api/v1/users/signin')
           }
          });
})

async function sendEmail(user, email) {
    jwt.sign(
        {
            name: user.name,
            id: user.id,
        },
        process.env.SECRET_EMAIL,
        {
            expiresIn: '6000',
        },
        async (err, token) => {
            if (err) {
                console.log("Error with sending email")
                console.log(err)
            } else {
                console.log('token created is')
                console.log(token)
                const url = `http://localhost:3000/api/v1/users/confirmation/${token}`;
                await transporter.sendMail({
                    from: transporter.options.auth.user,
                    to: email,
                    subject: 'Confirm StudyWeb Email',
                    html: `Please click this to confirm email: <a href=${url}">${url}</a>`
                }, (err, info) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                })
            }

        },

    )
}
router.post("/google_auth", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password)
    let users = await checkEmailExist(email);
    if (users.length === 0) {
        let hashedPass = await bcrypt.hash(password, 10);
        await addUser(name, email, hashedPass)
    }
    users = await checkEmailExist(email);
    const accessToken = jwt.sign(
        { name: users[0].name, id: users[0].id },
        process.env.SECRET_JWT
    );
    res.json({
        status: 'success',
        name: users[0].name,
        id: users[0].id,
        token: accessToken,
    });
});


/**
 * This route registers a user.
 * @body name: name of the user
 * @body email: email of the user
 * @body password: password of the user (will be encrypted)
 */
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;
    const users = await checkEmailExist(email);
    if (users.length === 0) {
        let hashedPass = await bcrypt.hash(password, 10);
        const userWithHashedPass = {
            name: name,
            email: email,
            password: hashedPass,
        };
        const result = await addUser(name, email, hashedPass);

        const accessToken = jwt.sign(
            { name: name, id: result[0] },
            process.env.SECRET_JWT
        );
        const user = {
            name: userWithHashedPass.name,
            id: result[0]
        }
        await sendEmail(user, email,);

        res.json({
            status: "success",
            user,
            token: accessToken,
            result: result,
        });
    } else if (users[0].confirmed) {
        res.json({
            status: 'fail',
            error: "Email already used!"
        });
    }
});

/**
 * This route logs a user in
 */
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const users = await checkEmailExist(email);
    if (users.length === 0) {
        res.json({
            status: 'fail',
            error: "User does not exist!"
        });

        if (!users[0].confirmed) {
            res.json({
                status: 'fail',
                error: "User has not confirmed their email yet!"
            })
        }
    } else {
        bcrypt
            .compare(password, users[0].password)
            .then((match) => {
                if (!match) {
                    res.json({
                        status: 'fail',
                        error: "Wrong user and pass combo"
                    });
                } else {
                    const accessToken = jwt.sign(
                        { name: users[0].name, id: users[0].id },
                        process.env.SECRET_JWT
                    );
                    res.json({
                        status: 'success',
                        name: users[0].name,
                        id: users[0].id,
                        token: accessToken,
                    });
                }
            })
            .catch((error) => console.log(error));
    }
});



module.exports = router;
