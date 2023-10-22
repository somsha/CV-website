const { findUserId, getUserList } = require('./user-db');
const { getEducationList } = require('./education-db');
const { getWorkList } = require('./work-db');

const renderHomePage = async (req, res) => {
    let educationList = [];
    let workList = [];
    let userList = [];

    if (res.locals.isAuthenticated) {
        let cvUserId = req.session.userId;
        let cvUser = req.query.cv_user;
        if (cvUser) {
            const idObject = await findUserId(cvUser);
            cvUserId = idObject.id;
        }
        educationList = await getEducationList(cvUserId);
        workList = await getWorkList(cvUserId);
        userList = await getUserList(res.locals.isAdmin);
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