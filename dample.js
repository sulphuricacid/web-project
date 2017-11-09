const express = require('express')
var mysql= require('mysql');
var bodyparser = require('body-parser'); 


const app = express()
app.use(express.static(__dirname+'/public'))
app.set('view engine', 'ejs');
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
app.get('/home', function (req, res) {

  res.sendFile(__dirname+'/public/homepage.html')
})
app.get('/formbook', function (req, res) {

  res.render('form.ejs');

  
})
app.get('/trainfilter', function (req, res) { 
  res.sendFile(__dirname+'/public/trainfilter.html')
})
app.get('/flightfilter', function (req, res) {
  res.sendFile(__dirname+'/public/flightfilter.html')
})
app.get('/seatbooking', function (req, res) {
  res.sendFile(__dirname+'/public/n1.html')
})
app.get('/ticket', function (req, res) {
var cname=req.query.first_name;
var cage=req.query.age;
var cphone=req.query.phone;
var cnoc=req.query.children;
var cnos=req.query.seniors;

connection.query('insert into tickets values (?,?,?,?,?)',[cname,cage,cphone,cnoc,cnos],function(err,result,fields){
			if(err) throw err;
			res.render('success.ejs')
		})


})




app.get('/homesubmit', function (req, res) {
	var fromplace = req.query.fromplace;
	var toplace = req.query.toplace;
	var date = req.query.date;
	var vehicle= req.query.vleselect;
	console.log(date);


	if(vehicle=="bus"){
	
			connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('busfilter',{data:result});

		})

	}
	else if(vehicle=="train"){
			connection.query('select * from train_info where train_info.start_point = ? and train_info.end_point = ?',[fromplace,toplace],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('trainfilter',{data:result});
		})
	}
	else if(vehicle =="flight")
	{
			connection.query('select * from flight_info where flight_info.start_point = ? and flight_info.end_point = ?',[fromplace,toplace],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('flightfilter',{data:result});
		})	}
	
	


})



var connection;
connection=mysql.createConnection({
	host:"localhost",
	user:"viswanath",
	password:"9148858352",
	database:"dbms_project"
});
connection.connect(function(err){
	if (err) {
		console.error('error connecting:'+ err.stack);
		return;
	}
});


