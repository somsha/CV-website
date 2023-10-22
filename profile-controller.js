const userDb = require('./user-db');

const renderProfilePage = (req, res) => {
    // Retrieve the user's information from the database based on their session or user ID

    userDb.getUserInfo(req.session.userId, (err, userProfile) => {
        if (err) {
            console.log(err);
            res.status(400).redirect('/');
        }
        res.render('profile', { user: userProfile, title: 'Profile Page' });
    });
};

const updateProfile = (req, res) => {
    const { firstName, lastName, password } = req.body;

    userDb.updateUserProfile(req.session.userId, firstName, lastName, password);

    res.redirect('/profile');
};

module.exports = {
    renderProfilePage,
    updateProfile,
};