const express = require('express');
const exphbs = require('express-handlebars');
const sqlite3 = require('sqlite3');
const app = express();
// configurations
app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' }); // Render the home.handlebars view
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Page' }); // Render the home.handlebars view
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Page' }); // Render the home.handlebars view
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});