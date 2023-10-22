const userDb = require('./user-db');
const educationDb = require('./education-db');
const workDb = require('./work-db');

const renderHomePage = async (req, res) => {
    let educationList = [];
    let workList = [];
    let userList = [];

    if (res.locals.isAuthenticated) {
        let cvUserId = req.session.userId;
        let cvUser = req.query.cv_user;
        if (cvUser) {
            const idObject = await userDb.findUserId(cvUser);
            cvUserId = idObject.id;
        }
        educationList =  await educationDb.getEducationList(cvUserId);
        workList = await workDb.getWorkList(cvUserId);
        userList = await userDb.getUserList(res.locals.isAdmin);
    }

    const data = {
        title: 'Home Page',
        education: educationList,
        work: workList,
        user: userList,
        readMode: true
    };

    res.render('home', data);
};

module.exports = {
    renderHomePage,
};