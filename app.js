const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const bcrypt = require('bcrypt');
require('dotenv').config();
const homeController = require('./home-controller.js');
const profileController = require('./profile-controller');
const authController = require('./auth-controller');

const aboutController = require('./about-controller');
const educationController = require('./education-controller');
const workController = require('./work-controller');
const app = express();
const options = {
  key: fs.readFileSync('key.pem'),   
  cert: fs.readFileSync('cert.pem'), 
  passphrase: process.env.HTTPS_PASSWORD,
};

const httpsServer = https.createServer(options, app);

// configurations
app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "main" }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


// Configure sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
  );


  app.use((req, res, next) => {
    res.locals.isAuthenticated = !!(req?.session?.userId);
    res.locals.isAdmin = (req?.session?.userRole === 'ROLE_ADMIN');
    next();
});


// Custom middleware to check if the user is logged-in
function authenticateUser(req, res, next) {
 if(res.locals.isAuthenticated) {
    next();
} else {
    return res.status(401).redirect('/login?error=1');    
}

}


app.get('/', homeController.renderHomePage);


  
app.get('/login', authController.renderLoginPage);
app.post('/login', authController.handleLogin);
app.get('/logout', authController.handleLogout);
app.get('/register', authController.renderRegisterPage);
app.post('/register', authController.handleRegistration);
app.get('/profile', authenticateUser, profileController.renderProfilePage);
app.post('/profile/update', profileController.updateProfile);


// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' }); // Render the home.handlebars view
});

app.get('/about', authenticateUser, aboutController.renderAboutPage);

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Page' }); // Render the home.handlebars view
});

app.post('/cv/education/remove', educationController.removeEducationEntry);
app.post('/cv/education/add', educationController.addEducationEntry);


app.post('/cv/work/remove', workController.removeWorkEntry);
app.post('/cv/work/add', workController.addWorkEntry);


// Start the server
const PORT = process.env.PORT || 3000;
httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});