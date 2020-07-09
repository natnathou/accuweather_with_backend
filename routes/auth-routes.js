const router               = require("express").Router();
const passport             = require("passport");
const jwt                  = require('jsonwebtoken');
const User                 = require("../models/user-model");
const {find}               = require("../models/user-model");
const CLIENT_HOME_PAGE_URL = process.env.URL_CLIENT;

const favoritesArray = [
    {
        LocalizedName: "Tel Aviv",
        Key          : "215854"
    },
    {
        LocalizedName: "Paris",
        Key          : "623"
    },
    {
        LocalizedName: "New York",
        Key          : "349727"
    }
];


router.get("/login/success", passport.authenticate("jwt", {session: false}),
    (req, res) => {
        res.json({
            success: true,
            message: "User has successfully authenticated",
            user   : req.user,
            cookies: req.cookies
        })
    });

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "User failed to authenticate."
    });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});


router.post("/register", async (req, res, next) => {
    console.log(req.body);
    try {
        let user = await User.findOne({username: req.body.username});
        if (user) {
            res.json({
                message: "User already exist"
            })
        } else {
            let user = await User.create({
                username : req.body.username,
                email    : req.body.username,
                favorites: favoritesArray

            });
            await user.setPassword(req.body.password);
            await user.save();
            next()
        }

    } catch (e) {
        console.log(e);
    }

}, passport.authenticate('local', {
    session        : false,
    failureRedirect: "/auth/login/failed"
}), (req, res) => {
    let token = jwt.sign({data: req.user}, process.env.TOP_SECRET, {expiresIn: 3600});  // expiry in seconds
    res.cookie('jwt', token);
    res.json({
        redirect: CLIENT_HOME_PAGE_URL
    });
});


router.post("/login", async (req, res, next) => {
        let user = await User.findOne({username: req.body.username});
        console.log(user);
        if (!user) {
            res.json({
                message: "User doesn't exist"
            });
            console.log("User doesn't exist");
        } else if (!user.validatePassword(req.body.password)) {
            console.log("Password doesn't match");
            res.json({
                message: "Password doesn't match"
            });
        } else {
            next()
        }
    },
    passport.authenticate('local', {
        session        : false,
        failureRedirect: "/auth/login/failed"
    }),
    (req, res) => {
        let token = jwt.sign({data: req.user}, process.env.TOP_SECRET, {expiresIn: 3600});  // expiry in seconds
        res.cookie('jwt', token);
        res.json({
            redirect: CLIENT_HOME_PAGE_URL
        });
    });


// auth with google
router.get("/google", passport.authenticate("google",
    {
        session: false,
        scope  : ['email', 'profile']
    }));

// auth with facebook
router.get("/facebook", passport.authenticate("facebook", {
    session: false,
    scope  : ["email"]
}));

// redirect to home page after successfully login via google
router.get("/google/redirect",
    passport.authenticate("google",
        {
            session        : false,
            failureRedirect: "/auth/login/failed"
        }),
    (req, res) => {
        let token = jwt.sign({data: req.user}, process.env.TOP_SECRET, {expiresIn: 3600});  // expiry in seconds
        res.cookie('jwt', token);
        res.redirect(CLIENT_HOME_PAGE_URL);
    }
);

// redirect to home page after successfully login via facebook
router.get("/facebook/redirect",
    passport.authenticate("facebook",
        {
            session        : false,
            failureRedirect: "/auth/login/failed"
        }),
    (req, res) => {
        let token = jwt.sign({data: req.user}, process.env.TOP_SECRET, {expiresIn: 3600});  // expiry in seconds
        res.cookie('jwt', token);
        res.redirect(CLIENT_HOME_PAGE_URL);
    }
);


module.exports = router;