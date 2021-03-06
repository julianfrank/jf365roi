'use strict'

//Key Libraries
require('newrelic')
var express = require('express')
var bodyParser = require('body-parser') //Required to read the body
//var session = require('express-session') //Required to handle sessions
//var cookieparser = require('cookie-parser') //Sesisons inturn need cookie parsing
var MongoClient = require('mongodb').MongoClient;

//Add-on Modules
var helpers = require('./mylibs/helpers')

//Initialization
var port = process.env.PORT || 80
var mongoLabURL = process.env.mongoLabURL //|| require('./secrets.js').secret.mongoDBConnectionString.toString()
var log = helpers.log
 
//Express Application Initialization
var app = express()
app.engine('html', helpers.readHTML);// define the template engine [(filePath, options, callback)]
app.set('views', __dirname + '/pages/'); // specify the views directory
app.set('view engine', 'html'); // register the template engine
//app.use(cookieparser());
//app.use(session({ secret: helpers.hourlyState(), resave: true, saveUninitialized: true, cookie: { path: '/', httpOnly: true, secure: false, maxAge: 600000 } })); //maxAge setto 10 mins
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use('/', express.static('public'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

app.all('*', function (req, res, next) {
    console.log('ips:' + req.ips + '\tprotocol:' + req.protocol + '\txhr:' + req.xhr)
    return next()
})

app.all('/*.html', function (req, res) {// Need this to load test using loader.io
    res.contentType('text/html')
    res.render(req.params[0])
})

app.all('/favicon.ico', function (req, res) {// Show my Pretty Face ;) on the favicon area
    res.contentType('image/x-icon')
    res.redirect('/public/favicon.ico')
})

app.all('/', function (req, res) {// Main page
    res.contentType('text/html')
    res.render('s4bpstn')
})

app.all('/try1', function (req, res) {// Right now will use this to test the try1.html
    res.contentType('text/html')
    res.render('try1')
})

app.all('/s4bpstn', function (req, res) {// Right now will use this to test the s4bpstn.html
    res.contentType('text/html')
    res.render('s4bpstn')
})

//MongoClient.connect(mongoLabURL, function (err, db) {
app.listen(port, function () {
    log(helpers.readPackageJSON(__dirname, "name") + " " +
        helpers.readPackageJSON(__dirname, "version") +
        "\tStarted & Listening on port\t: " + port)
})
//    db.close
//})