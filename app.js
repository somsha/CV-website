const express = require('express');
const exphbs = require('express-handlebars');
const sqlite3 = require('sqlite3');
const fs= require('fs');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { findUserByUsername, getUserInfo, updateUserProfile } = require('./user-db');
const app = express();

// configurations
app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// Configure sessions
app.use(
    session({
      secret: '7CM#5KB*LSqbPRbq&9',
      resave: false,
      saveUninitialized: true,
    })
  );


//sqlite3 database
const db = new sqlite3.Database('./database/db.sqlite');

// Read the SQL file
const sqlScript = fs.readFileSync('initial.sql', 'utf8');

// Initialize the DB
db.serialize(() => {
    db.exec(sqlScript, (err) => {
        if (err) {
          console.error('Error running initial queries:', err.message);
        } else {
          console.log('Initial queries executed successfully.');
        }
    
        // Close the database connection
        db.close((err) => {
          if (err) {
            console.error('Error closing the database:', err.message);
          }
        });
      });
});


// Custom middleware to check if the user is logged-in
function authenticateUser(req, res, next) {
  if(req.session.userId) {
    next();
} else {
    return res.status(401).redirect('/login?error=1');    
}

}


// Routes
app.get('/', (req, res) => {
res.render('home', { title: 'Home Page' }); // Render the home.handlebars view
});

// Define a route for the login page
app.get('/login', (req, res) => {
res.render('login', { title: 'Login Page' , layout: false});
});

// Define a route for the logout page
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
      }
      // Redirect to a logout confirmation page (e.g., home)
      res.redirect('/');
  });
});



// Handle login POST request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Use the database function to find the user by username
    findUserByUsername(username, (err, user) => {
        if (err) {
          return res.status(500).redirect('/login?error=1');
        }
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return res.status(401).redirect('/login?error=1');
        }

        // Store the user's ID in the session
        req.session.userId = user.id;

        res.redirect('/');
      });
    });
  
    app.get('/profile', authenticateUser, (req, res) => {
      
      // Retrieve the user's information from the database based on their session or user ID
     getUserInfo(req.session.userId, (err, userProfile) => {
          if (err) {
              console.log(err);
              res.status(400).redirect('/');
          }
          res.render('profile', { user: userProfile, title: 'Profile Page' });
      });
  });
  
  // POST route to handle profile updates
  app.post('/profile/update', (req, res) => {
  
      const { firstName, lastName, password } = req.body;
  
      updateUserProfile(req.session.userId, firstName, lastName, password);
  
      res.redirect('/profile');
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