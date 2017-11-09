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

var connection;
connection=mysql.createConnection({
	host:"127.0.0.1",
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




///////////////////////////////////////////////////////////////////////////////BUSFILTERS////////////////////////////////////////////////////////







app.get('/buspricelowhigh/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	


connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? order by bus_info.price asc ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfpricelh',{data:result});
		})
})

app.get('/buspricehighlow/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	


connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? order by bus_info.price desc ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfpricehl',{data:result});
		})
})



app.get('/busleast/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;


connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? order by bus_info.journey_time asc  ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfleast',{data:result});
		})
})


app.get('/busmrng/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a='12.00';


connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? and bus_info.start_time < ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfmrng',{data:result});
		})
})


app.get('/busaftn/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a= '12.00';


connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? and bus_info.start_time > ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfaftn',{data:result});
		})
})

app.get('/buseveng/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = '18.00';

connection.query('select * from bus_info join bus_date on bus_info.bid= bus_date.bid where bus_info.start_point = ?  and bus_info.end_point = ? and bus_date.bus_date = ? and bus_info.start_time > ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfeveng',{data:result});
		})
})

app.get('/busac/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = 'ac';

connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? and bus_info.type= ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfac',{data:result});
		})
})

app.get('/busnac/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a= 'non-ac';


connection.query('select * from bus_info join bus_date on bus_info.bid=bus_date.bid where bus_info.start_point = ? and bus_info.end_point = ? and bus_date.bus_date = ? and bus_info.type= ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('bfnac',{data:result});
		})
})



///////////////////////////////////////////////////////////////////////////////TRAINFILTERS///////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/trainpricelowhigh/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;


connection.query('select * from train_info join train_date on train_info.tid = train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date=? order by train_info.price asc ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfpricelh',{data:result});
		})
})


app.get('/trainpricehighlow/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;


connection.query('select * from train_info join train_date on train_info.tid=train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date = ? order by train_info.price desc ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfpricehl',{data:result});
		})
})


app.get('/trainleast/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;


connection.query('select * from train_info join train_date on train_info.tid=train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date = ? order by train_info.journey_time asc  ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfleast',{data:result});
		})
})

app.get('/trainmrng/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a ='12.00';


connection.query('select * from train_info join train_date on train_info.tid=train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date = ? and train_info.start_time < ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfmrng',{data:result});
		})
})

app.get('/trainaftn/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = '12.00';


connection.query('select * from train_info join train_date on train_info.tid=train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date = ? and train_info.start_time > ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfaftn',{data:result});
		})
})

app.get('/trainevng/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a ='18.00';

connection.query('select * from train_info join train_date on train_info.tid=train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date = ? and train_info.start_time > ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfeveng',{data:result});
		})
})

app.get('/trainslpr/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a ='sleeper';


connection.query('select * from train_info join train_date on train_info.tid = train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date=? and train_info.train_type = ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfslpr',{data:result});
		})
})

app.get('/trainac/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = 'nonsleeper'; 


connection.query('select * from train_info join train_date on train_info.tid = train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date = ?  and train_info.train_type = ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('tfnac',{data:result});
		})
})





///////////////////////////////////////////////////////////////////////////////////////////////////// FLIGHT FILTERS///////////	////////////////////////////////////////////////////////////////////////////



app.get('/flightpricelowhigh/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;


connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point= ? and flight_info.end_point= ? and flight_date.flight_date= ?  order by flight_info.price asc; ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffpricelh',{data:result});
		})
})



app.get('/flightpricehighlow/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;


connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point = ? and flight_info.end_point = ? and flight_date.flight_date = ? order by flight_info.price desc ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffpricehl',{data:result});
		})
})

app.get('/flightleast/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;



connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point = ? and flight_info.end_point = ? and flight_date.flight_date = ? order by flight_info.journey_time  ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffleast',{data:result});
		})
})

app.get('/flightmrng/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a ='12.00';


connection.query('select * from flight_info join flight_date on flight_info.fid = flight_date.fid where flight_info.start_point= ? and flight_info.end_point=? and flight_date.flight_date= ? and flight_info.start_time > ?',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffmrng',{data:result});
		})
})

app.get('/flightaftn/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = '12.00';

connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point = ? and flight_info.end_point = ? and flight_date.flight_date = ? and flight_info.start_time > ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffaftn',{data:result});
		})
})

app.get('/flightevng/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = '18.00'


connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point = ? and flight_info.end_point = ? and flight_date.flight_date = ? and flight_info.start_time > ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffeveng',{data:result});
		})
})

app.get('/flightdmst/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = 'domestic';


connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point = ? and flight_info.end_point = ? and flight_date.flight_date = ? and flight_info.flight_type = ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffdmst',{data:result});
		})
})

app.get('/flightintr/:fromplace/:toplace/:date', function (req, res) {
	var fromplace = req.params.fromplace;
	var toplace = req.params.toplace;
	var date = req.params.date;
	var a = 'international';



connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point = ? and flight_info.end_point = ? and flight_date.flight_date = ? and flight_info.flight_type = ? ',[fromplace,toplace,date,a],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('ffintr',{data:result});
		})
})





/////////////////////////////////////////////////////////////////////////////////////HOMEPAGE ROUTING//////////////////////////////////////////////////////////////////////////////////////////////////




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
			connection.query('select * from train_info join train_date on train_info.tid=train_date.tid where train_info.start_point = ? and train_info.end_point = ? and train_date.train_date = ?',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('trainfilter',{data:result});
		})
	}
	else if(vehicle =="flight")
	{
			connection.query('select * from flight_info join flight_date on flight_info.fid=flight_date.fid where flight_info.start_point = ? and flight_info.end_point = ? and flight_date.flight_date = ? ',[fromplace,toplace,date],function(err,result,fields){
			if(err) throw err;
			console.log(result);
			res.render('flightfilter',{data:result});
		})	}
	
	


})

/////////////////////////////////////////////////////////////////////////////CONNECTION TO DATABASE/////////////////////////////////////////////




