var express = require('express');
var mysql = require('./dbcon.js');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.urlencoded());
app.use(express.static('public'));
app.use(bodyParser.json());


// Handles getting the already existing rows in exercise table
app.get('/',function(req,res,next){
  let context = {};
  let params = [];
  mysql.pool.query('SELECT * FROM exercise', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    rows.forEach(function(row) {
      let id = row.id;
      let name = row.name;
      let reps = row.reps;
      let weight = row.weight;
      let date = row.date;
      let formattedDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
      let unit = row.unit;
      params.push({'id': id,'name': name, 'reps': reps, 'weight': weight, 'date': formattedDate, 'unit': unit});
      context.dataList = params;
    });
    res.render('home', context);
  });
});


app.post('/',function(req,res,next){
  let context = {};
  let params = [];
  const response = req.body;
  mysql.pool.query("INSERT INTO exercise (`name`, `reps`, `weight`, `date`, `unit`) VALUES (?, ?, ?, ?, ?)",
      [response.exerciseName, response.reps, response.weight, response.dateCompleted, response.unit], function (err, result) {
        if (err) {
          if (err.errno === 1048) {
            context.error = 'Please fill in all the fields';
            res.render('home', context);
          } else {
            next(err);
          }
          return;
        }
        mysql.pool.query('SELECT * FROM exercise', function (err, rows, fields) {
          if (err) {
            next(err);
            return;
          }
          rows.forEach(function (row) {
            let id = row.id;
            let name = row.name;
            let reps = row.reps;
            let weight = row.weight;
            let date = row.date;
            let formattedDate = (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
            let unit = row.unit;
            params.push({
              'id': id,
              'name': name,
              'reps': reps,
              'weight': weight,
              'date': formattedDate,
              'unit': unit
            });
            context.dataList = params;
          });
          res.render('home', context);
        });
    });
});

app.delete('/', function(req, res, next) {
  let id = parseInt(req.body.id);
  mysql.pool.query("DELETE FROM exercise WHERE id=?", [id], function (err, result) {
    if (err) {
      next(err);
      return;
    }
  });
});

app.put('/', function(req, res, next) {
  context = {};
  params = [];
  let id = parseInt(req.body.id);
  let name = req.body.name;
  let reps = parseInt(req.body.reps);
  let weight = parseInt(req.body.weight);
  let unit = req.body.unit;
  let date = req.body.date;
  let formatted_date = new Date(date);
  mysql.pool.query('SELECT * FROM exercise WHERE id=?', [id],function(err, row) {
      if (err) {
        next(err);
        return;
      }
      if(row.length == 1) {
        mysql.pool.query("UPDATE `exercise` SET `name`=?, `weight`=?, `date`=?, `unit`=?, `reps`=? WHERE `id`=?",
            [name || row.name, weight || row.weight, formatted_date || row.date, unit || row.unit, reps || row.reps, id || row.id],
            function (err, result) {
              if (err) {
                next(err);
                return;
              }
            });
      }
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
