var express = require('express')
var router = express.Router()
var passport = require('passport')
var GitHubStrategy = require('passport-github').Strategy





passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(obj, done) {
    done(null, obj)
})

passport.use(new GitHubStrategy({
        clientID: '26eaf4e3d5fd789989a8',
        clientSecret: 'a159857c0b90c883b114348a5026cd70eca3e3b8',
        callbackURL: "http://127.0.0.1:3000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));



router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        console.log(req.user._json)
        req.session.user = {
            id: req.user._json.id,
            username: req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        }
        res.redirect('/');
    });

router.get('/logout', function(req, res, next) {
    req.session.destroy()
    res.redirect('/')
})


module.exports = router