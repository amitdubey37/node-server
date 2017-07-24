const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', hbs);
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
})

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method}, ${req.url}`;
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('home.hbs', {
      pageTitle: 'Home Page',
      welcomeText: 'Welcome to my site'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects',
  });
})

app.get('/friends', (req, res) => {
  res.render('friends.hbs', {
    pageTitle: 'Projects',
  });
})


app.get('/bad', (req, res) => {
  res.send({
    status: 'Bad Request',
    message: 'Request can not be fulfilled',
    code: '402'
  });
})
app.listen(port, () => {
  console.log(`Server running at ${port}` )
});
