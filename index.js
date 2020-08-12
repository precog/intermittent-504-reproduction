const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));

const page1 = '{ "value": 1, "next": 2 }';
const page2 = '{ "value": 2, "next": 3 }';
const page3 = '{ "value": 3 }';

var page2Attempts = 0;
var page3Attempts = 0;

app.get('/all', (req, res) => {
  process.stdout.write("(1 success)");
  res.set('Content-Type', 'application/json').send(page1);
});

app.get('/all/2', (req, res) => {
  if (page2Attempts >= 2) {
    process.stdout.write("(2 success)");
    res.set('Content-Type', 'application/json').send(page2);
    page2Attempts = 0;
  } else {
    process.stdout.write("(2 fail)");
    page2Attempts ++;
    res.set('Content-Type', 'application/json').status(504).send({ message: Math.random().toString() });
  }
});

app.get('/all/3', (req, res) => {
  if (page3Attempts >= 4) {
    process.stdout.write("(3 success)");
    res.set('Content-Type', 'application/json').send(page3);
    page3Attempts = 0;
  } else {
    process.stdout.write("(3 fail)");
    page3Attempts ++;
    res.set('Content-Type', 'application/json').status(504).send({ message: Math.random().toString() });
  }
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.render("" + Math.random());
});

app.listen(port, () => console.log(`Listening on port ${port}!`))
