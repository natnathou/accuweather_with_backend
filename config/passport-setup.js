const passport         = require("passport");
const LocalStrategy    = require('passport-local');
const passportGoogle   = require("passport-google-oauth");
const FacebookStrategy = require("passport-facebook");
const JWTstrategy      = require('passport-jwt').Strategy;
const User             = require("../models/user-model");
const GoogleStrategy   = passportGoogle.OAuth2Strategy;

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


passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            let user = await User.findOne({username: username});
            if (!user || !user.validatePassword(password)) {
                return done(null, false)
            } else {
                return done(null, user);
            }

        } catch (e) {
            console.log(e)
        }

    }));

passport.use(
    new GoogleStrategy(
        {
            // options for the google start
            clientID    : process.env.GOOGLE_CONSUMER_KEY,
            clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
            callbackURL : `${process.env.URL_SERVER}/auth/google/redirect`,
        },
        async (token, refreshToken, profile, cb) => {
            try {
                // find current user in UserModel

                const currentUser = await User.findOne({
                    email: profile.emails[0].value
                });
                // create new user if the database doesn't have this user
                if (!currentUser) {
                    let newUser = await User.create({
                        username  : profile.emails[0].value,
                        provider  : profile.provider,
                        idProvider: profile.id,
                        name      : profile.displayName,
                        email     : profile.emails[0].value,
                        favorites : favoritesArray
                    });
                    await newUser.setPassword(token);
                    await newUser.save();
                    cb(null, newUser)
                } else {
                    cb(null, currentUser)
                }
            } catch (e) {
                console.log(e)
            }
        }
    )
);


passport.use(
    new FacebookStrategy(
        {
            // options for the facebook start
            clientID     : process.env.FACEBOOK_CONSUMER_KEY,
            clientSecret : process.env.FACEBOOK_CONSUMER_SECRET,
            callbackURL  : `${process.env.URL_SERVER}/auth/facebook/redirect`,
            profileFields: ['id', 'displayName', 'emails']
        },
        async (token, refreshToken, profile, cb) => {
            try {
                const currentUser = await User.findOne({
                    email: profile.emails[0].value
                });

                // create new user if the database doesn't have this user
                if (!currentUser) {
                    let newUser = await User.create({
                        username  : profile.emails[0].value,
                        provider  : profile.provider,
                        idProvider: profile.id,
                        name      : profile.displayName,
                        email     : profile.emails[0].value,
                        favorites : favoritesArray

                    });
                    await newUser.setPassword(token);
                    await newUser.save();
                    cb(null, newUser)
                } else {
                    cb(null, currentUser)
                }
            } catch (e) {
                console.log(e);
            }
        }
    )
);


let url                = require('url');
const {find}           = require("../models/user-model");
const options          = {};
options.jwtFromRequest = (request) => {
    let token      = null;
    let param_name = 'authorization';                //parameter name
    let parsed_url = url.parse(request.url, true);
    if (request.headers[param_name]) {
        token = request.headers[param_name]
    } else if (parsed_url.query && Object.prototype.hasOwnProperty.call(parsed_url.query, "secret_token")) {
        token = parsed_url.query["secret_token"]
    }
    return token;
};
options.secretOrKey    = process.env.TOP_SECRET;

//This verifies that the token sent by the user is valid
passport.use(new JWTstrategy(
    options
    , async (token, done) => {
        try {
            //Pass the user details to the next middleware
            return done(null, token)
        } catch (error) {
            done(error)
        }
    }));

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, cb) => {
    cb(null, user.id)
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, cb) => {
    User.findById(id)
        .then(user => {
            cb(null, user)
        })
        .catch(e => {
            cb(new Error("Failed to deserialize an user"))
        });
});
