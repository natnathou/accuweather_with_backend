const router               = require("express").Router();
const passport             = require("passport");
const jwt                  = require('jsonwebtoken');
const nodemailer           = require("nodemailer");
const User                 = require("../models/user-model");
const CLIENT_HOME_PAGE_URL = process.env.URL_CLIENT;


router.post("/forgot-password", async (req, res) => {
    let email = req.body.email;
    let userFind;
    let token = jwt.sign({email: email}, process.env.TOP_SECRET, {expiresIn: 1000});  // expiry in seconds
    let urlRedirection = `${process.env.URL_SERVER}/auth/update-password/?secret_token=${token}`;
    let mailOptions    = {
        envelope: {
            from: `<${process.env.USER_EMAIL}>`,
            to  : `<${email}>`
        },
        from    : process.env.USER_EMAIL,
        to      : email,
        subject : 'Password Reinitialization',
        text    : `Please Click on the link below to update your password \n ${urlRedirection}`

    };

    let transporter = nodemailer.createTransport({
        host  : process.env.HOST_EMAIL_SERVER,
        port  : 587,
        secure: false,
        auth  : {
            user: process.env.USER_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        },
        tls   : {
            rejectUnauthorized: false
        }
    });

    try {
        userFind = await User.findOne({email: email});
        if (userFind) {
            await userFind.updateOne({token: token});
            await userFind.save();
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.json({
                        status: "their are an error"
                    })

                } else {
                    console.log(info);
                    res.json(
                        {message: "Password update request has been sent by email!"}
                    )
                }
            });
        } else {
            res.json(
                {message: "User doesn't exist!"}
            )
        }

    } catch (e) {
        console.log(e)
    }
});


router.get("/update-password/", passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        res.cookie('JWT', req.query.secret_token);
        res.redirect(`${CLIENT_HOME_PAGE_URL}/update-password`);
    });

router.get("/update-password/authenticate", passport.authenticate("jwt", {session: false}),
    (req, res) => {
        res.json({
            success: true,
            message: "Token is valid"
        })
    });

router.post("/update-password/", passport.authenticate("jwt", {session: false}),
    async (req, res, next) => {

        let user = await User.findOne({token: req.body.token})
        if (user) {
            user.setPassword(req.body.password);
            user.save();
            console.log('Password reset successful');
            res.json(
                {redirect: `${CLIENT_HOME_PAGE_URL}/login`}
            )

        } else {
            console.log("Password not change");
            res.json(
                {message: `User doesn't exist!`}
            )
        }

    });

module.exports = router;