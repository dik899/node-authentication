var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
 mongoose.Promise =global.Promise;


mongoose.connect(configDB.url,{
   useNewUrlParser:true
}).then(() => {
   console.log("Successfully ocnnected to database");
}).catch(err =>{
   console.log('Could not connect to database. Exiting now...',err);
   process.exit();
}
);

require('./config/passport')(passport); // pass passport for configuration


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set('view engine', 'ejs');


app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);

