const express = require('express');
const app = express();
const { queryDB } = require('./db/dbcon.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM exercise';
    const results = await queryDB(query);
    res.status(200).send(results);
  } catch (err) {
    console.log('Error retrieving exercises');
    res.status(500).send(err);
  }
});

app.post('/', async (req, res) => {
  try {
    const response = req.body;
    const query =
      'INSERT INTO exercise (`name`, `reps`, `weight`, `unit`) VALUES (?, ?, ?, ?)';
    const values = [
      response.name,
      parseInt(response.reps),
      parseInt(response.weight),
      response.unit,
    ];
    await queryDB(query, values);
    res.status(200).send('Form Submission Success');
  } catch (err) {
    console.log('Form Submission DB error');
    res.status(500).send(err);
  }
});

app.use(function (req, res) {
  res.status(404);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
