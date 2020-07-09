const _             = require("lodash");
const dotenv        = require('dotenv');
const cookieSession = require("cookie-session");
const express       = require("express");
const passport      = require("passport");
const session       = require("express-session");
const mongoose      = require("mongoose");
const cookieParser  = require("cookie-parser");
const bodyParser    = require("body-parser");
const User          = require("./models/user-model");
const router        = require("express").Router();

dotenv.config();
const app  = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const passportSetup  = require("./config/passport-setup");
const authRoutes     = require("./routes/auth-routes");
const forgotPassword = require("./routes/forgot-password");
const {findById}     = require('./models/user-model');


// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    useFindAndModify  : false
}, () => {
    console.log("connected to mongo db");
});

require("./seedDb");

app.use(
    cookieSession({
        name  : "session",
        keys  : [process.env.COOKIE_KEY],
        maxAge: 24 * 60 * 60 * 100
    })
);

// parse cookies
app.use(cookieParser());


// initalize passport
app.use(passport.initialize());


// deserialize cookie from the browser
app.use(passport.session());


// set up routes
app.use("/auth", authRoutes);
app.use("/auth", forgotPassword);

//get list favorite
app.get("/favorites/list", passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        let user = await User.findById(req.query.id)
        res.json({
            success  : true,
            message  : "Favorites sent to the client",
            favorites: user.favorites
        })
    });

//add a favorite
app.post("/favorites/list", passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        let user      = await User.findById(req.query.id)
        let newItem   = {LocalizedName: req.query.nameItem, Key: req.query.idItem}
        let favorites = user.favorites;
        favorites.push(newItem);

        const filter = {_id: req.query.id};
        const update = {favorites: favorites};

        await User.findOneAndUpdate(filter, update)

        res.json({
            success  : true,
            message  : "Favorites sent to the client",
            favorites: user.favorites
        })
    });

//delete a favorite
app.post("/favorites/list/delete", passport.authenticate("jwt", {session: false}),
    async (req, res) => {
        let user      = await User.findById(req.query.id)
        let Key       = req.query.idItem
        let favorites = user.favorites;
        _.remove(favorites, element => {
            return element.Key === Key;
        });

        const filter = {_id: req.query.id};
        const update = {favorites: favorites};

        await User.findOneAndUpdate(filter, update)

        res.json({
            success  : true,
            message  : "Favorites sent to the client",
            favorites: user.favorites
        })
    });


// app.use(express.static(path.join(__dirname, 'client/build')));


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });


// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));
