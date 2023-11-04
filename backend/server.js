var routes = require('./routes');
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


mongoose.connect("mongodb+srv://26pratik:qwerty1234@cluster0.dbjcn.mongodb.net/toDoA",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('Connected to Database')).catch((e)=>{
    console.log('Error: ',e);
})

var app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader("Content-Type", "application/json");
	next();
});

routes(app);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on PORT ${port}`));