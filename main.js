require('./retrieveresults.js')();
const express = require('express');
var router = express.Router();
const app = express();
const bodyParser = require('body-parser');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Get Rest service for employees
app.get('/getEmployeeData', function(req,res){
    queryDB("SELECT * FROM employees", function(err,callback){
        if (err) throw error;
        return res.send({  data: callback });
    })
}); 


//Get Rest service for employees
app.get('/getLocationData', function(req,res){
    queryDB("SELECT * FROM Location", function(err,callback){
        if (err) throw error;
        return res.send({  data: callback });
    })
}); 


app.get('/', function(req,res){
    queryDB("SELECT * FROM employees", function(err,result){
        if (!err){
            var response = '';
            console.log(result);
            for (var row = 0; row < result.rows.length; row++){
                response += result.rows[row] +"</br>"
            }

            res.send(response) 
        }else{
            console.log(err);
        }
    })
}); 


app.listen(8080, function () {
    console.log('Node app is running on port 8080');
});