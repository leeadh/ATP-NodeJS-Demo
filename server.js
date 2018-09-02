require('./retrieveresults.js')();
require('./addresults.js')();
var express = require('express');
var path = require('path');
var app = express();
const PORT = 8080;
var bodyParser = require('body-parser');
var flash = require('express-flash-messages')
var session = require('express-session');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

// select statements
function getManager(callback){
    queryDB("SELECT distinct MANAGER_ID, DEPARTMENT_ID from DEPARTMENTS WHERE MANAGER_ID IS NOT NULL OR DEPARTMENT_ID IS NOT NULL", callback);
}

function getMaxEmployee(callback){
    queryDB("SELECT MAX(EMPLOYEE_ID) from employees", callback);
}

function getallEmployee(callback){
    queryDB("SELECT * FROM employees order by EMPLOYEE_ID DESC", callback);
}

//render main index.html
app.get('/', function (request, res) {
    getallEmployee((err,result)=>{
        if (!err){
            var response = '';
            console.log(result.rows.length);
            res.render('index.ejs', { users: result , message: ""});
        }else{
            console.log(err);
        }
    })
    
    
});

// simple get API request for employees
app.get('/getEmployeeData', function(req,res){
    queryDB("SELECT * FROM employees", function(err,callback){
        if (err) throw error;
        return res.send({  data: callback });
    })
}); 

// simple get API request for employees
app.get('/getManagers', function(req,res){
    getManager((err,callback)=>{
        if (err) throw error;
        return res.send({  data: callback });
    })
});


// simple get API request for employees
app.get('/getDepartmentID', function(req,res){
    getManager((err,callback)=>{
        if (err) throw error;
        return res.send({  data: callback });
    })
});

//add user with EJS
app.get('/add', function(req,res){
    getManager((err,result) => {
        if (!err){
            getMaxEmployee((err,result2) => {
                if (!err){
                    var response = '';
                    res.render('add-player.ejs', { players: result2, users: result });
                }else{
                    console.log(err);
                }
            })
           
        }else{
            console.log(err);
        }
    })
});

// simple post Employee API --> sample inserting data --> use postman to execute
app.post('/addemployee',function (request, res) {
    console.log(request.body)
    var empid = parseInt(request.body.empid);
    var fname = request.body.fname;
    var lname = request.body.lname;
    var email = request.body.email;
    var phonenumber = request.body.phonenumber;
    var hire_date_arr = request.body.hire_date.split('-')
    var hire_date = hire_date_arr[2]+'-'+hire_date_arr[1] + '-'+ hire_date_arr[0]
    var job_id = request.body.job_id;
    var salary = parseFloat(request.body.salary);
    var comm_pt = parseFloat(request.body.comm_pt);
    var manager = parseInt(request.body.manager);
    var department_id = request.body.department_id;
    var notification = "Employee " + fname + " " + lname + " has been addedd successfully" 
    addDB("INSERT INTO employees VALUES (" + empid + "," + "'"+ fname + "'"+ "," + "'"+ lname + "'"+ "," + "'"+ email + "'"+ "," + "'"+ phonenumber + "'"+ "," + "TO_DATE("+ "'"+ hire_date + "'"+ "," + "'dd-MM-yyyy')," + "'"+ job_id + "'"+ ","  + salary + ","+ comm_pt + "," + manager + "," + department_id + ")",
    function(err,result){
        if (!err){
            console.log("success")
            getallEmployee((err,result)=>{
                if (!err){
                    var response = '';
                    console.log(result.rows.length);
                    res.render('index.ejs', { users: result, message: notification});
                }else{
                    console.log(err);
                }
            })
        }else{
            console.log(err);
        }
    })
    
});

app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});