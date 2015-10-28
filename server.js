var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('127.0.0.1:12700/hostingServer');
var cors = require('cors')
var bodyParser = require("body-parser");

var survey = db.collection('survey');


var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/list', function (req, res) {
    res.sendFile(__dirname + '/list.html');
});
app.post('/registerSurvey', upload.array(), function( req, res ){
    console.log("registerSurvey called");
    console.log( req.body );
    var data = {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        content: req.body.content
    };
    console.log( "data" );
    console.log( data );
    survey.save( data );
    res.send( {
        status: "success",
        name: data.name,
        age: data.age,
        sex: data.sex,
        content: data.content
    });
});
app.get('/searchAll', function( req, res ){
    console.log("searchAll");
    survey.find({}).sort({name:1}, function(err,docs){
        res.send( docs );
    });
});
app.get('/removeSurvey/:name/:age', function( req, res ){
    console.log("remove");
    survey.remove( {age: req.params.age, name: req.params.name }, function( err, docs ){
       if ( err ) throw err;
       res.send({ status: "remove completed" });
    });
});

app.get('/findContent', function( req, res ){
    survey.find({}).sort({name:1}, function(err,docs){
        res.send( docs );
    });
});
app.get('/findResponse/:name', function( req,res ){
    console.log("findRespons api called");
    var name = req.params.name;
    if ( typeof name !== "undefined" ) {
        survey.find({name:name}).sort({}, function(err,docs){
            res.send( docs );
        });
    } else {
        survey.find({}).sort({name:1}, function(err,docs){
            res.send( docs );
        });
        console.log(" name is not submit!!");
    }
});

app.listen(8888);

console.log("Server Listening 8888");

