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
        clientID: 'a6eb276c15aefb43d257',
        clientSecret: 'fbbdc6224fcb819ec8921482117acb73bf501037',
        callbackURL: "http://dachunchun.top:5241/auth/github/callback"
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