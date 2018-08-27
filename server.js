require('./retrieveresults.js')();
require('./addresults.js')();
var express = require('express');
var path = require('path');
var app = express();
const PORT = 8080;
const bodyParser = require('body-parser');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var router = express.Router();

// simple get API request
router.get('/', function (request, res) {
    queryDB("SELECT * FROM employees", function(err,result){
        if (!err){
            var response = '';
            console.log(result.rows.length);
            res.render('index.ejs', { players: result });
        }else{
            console.log(err);
        }
    })
    
    
});


router.get('/add', function (request, res) {
    res.render('add-player.ejs')
    
});

// simple post Employee API --> sample inserting data --> use postman to execute
router.post('/addEmployee', function (request, res) {
    addDB("INSERT INTO employees VALUES ( 1000 , 'Adrian' , 'Lee' , 'Lee' , '515.123.4567'  , TO_DATE('17-06-2003', 'dd-MM-yyyy') , 'te_ys', 4000, NULL, NULL , 90 )", function(err,result){
        if (!err){
            console.log("success")
        }else{
            console.log(err);
        }
    })
    
    
});

app.use('/', router);

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});