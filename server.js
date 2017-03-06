const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

var app = express();

app.set('view engine', 'hbs');
app.use((req, res, next) => {
  res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to My Website'
  });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill request'
    });
});

app.listen(3000, () => {
    console.log("SErver is up and listening to port 3000");
});
