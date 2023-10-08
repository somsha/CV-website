const express = require('express');
const exphbs = require('express-handlebars');
const sqlite3 = require('sqlite3');
const fs= require('fs');
const app = express();
// configurations
app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));


//sqlite3 database
const db = new sqlite3.Database('./database/db.sqlite');

// Initialize the DB
db.serialize(() => {
    // User table
    db.run(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT
      )
    `);
  
    // Profile table
    db.run(`
      CREATE TABLE IF NOT EXISTS profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        avatar TEXT,
        firstName TEXT,
        lastName TEXT,
        FOREIGN KEY (userId) REFERENCES user(id)
      )
    `);
  
    // Work table
    db.run(`
      CREATE TABLE IF NOT EXISTS work (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        name TEXT,
        startDate DATE,
        endDate DATE,
        isCurrent BOOLEAN,
        position TEXT,
        FOREIGN KEY (userId) REFERENCES user(id)
      )
    `);
  
    // Education table
    db.run(`
      CREATE TABLE IF NOT EXISTS education (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        name TEXT,
        startDate DATE,
        endDate DATE,
        isStudying BOOLEAN,
        degree TEXT,
        FOREIGN KEY (userId) REFERENCES user(id)
      )
    `);
  
    // Certificate table
    db.run(`
      CREATE TABLE IF NOT EXISTS certificate (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        name TEXT,
        dateOfAchievement DATE,
        FOREIGN KEY (userId) REFERENCES user(id)
      )
    `);
  });

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