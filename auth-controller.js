const userDb = require('./user-db');
const bcrypt = require('bcrypt');

const renderLoginPage = (req, res) => {
    res.render('login', { title: 'Login Page', layout: false });
};

const handleLogin = (req, res) => {
    const { username, password } = req.body;

    userDb.findUserByUsername(username, (err, user) => {
        if (err) {
            return res.status(500).redirect('/login?error=1');
        }

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).redirect('/login?error=1');
        }

        // Store the user's ID in the session
        req.session.userId = user.id;
        req.session.userRole = user.role;

        res.redirect('/');
    });
};


const handleLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        // Redirect to a logout confirmation page (e.g., home)
        res.redirect('/');
    });
};


const renderRegisterPage = (req, res) => {
    res.render('register', { title: 'Register new User' });
};


const handleRegistration = (req, res) => {
    const { username, password, role } = req.body;
    userDb.registerNewUser(username, password, role);
    if (res.locals.isAdmin) {
        res.redirect('/register');
    } else {
        res.redirect('/login');
    }
};

module.exports = {
    renderLoginPage,
    handleLogin,
    handleLogout,
    renderRegisterPage,
    handleRegistration,
};