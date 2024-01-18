var express = require('express');
var router = express.Router();
var userModel = require('./users');
var passport = require('passport');
var localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function(req, res) {
  res.render("index");
});
router.get('/login', function(req, res) {
  res.render("login");
});
router.get('/signup', function(req, res) {
  res.render('signup');
});
router.post('/newuser', function(req, res){
  var userdata = new userModel({
    username: req.body.username,
    email: req.body.email
  });
  
userModel.register(userdata, req.body.password).then(function(){
  userModel.authenticate("local")(req, res, function(){
    res.redirect('/profile');
  });
});
  
});
router.post('/loginuser', passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login"
}) ,function(req, res){
  
});
router.get('/logout', function(req, res){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
});
router.get('/contact', function(req, res) {
  res.render("contact");
});
router.get('/learn_more', function(req, res) {
  res.send("This Page Wil Awail Soon");
});
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
module.exports = router;