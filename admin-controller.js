const userDb = require('./user-db');

const renderUserManagement = async (req, res) => {

    const userList = await userDb.getAllUserInfoList();

    const data = {
        title: 'User Management',
        user: userList
    };

    res.render('user-management', data);
};

const updateUser = (req, res) => {
    const {userId, role, active} = req.body;
    

    userDb.updateUserInfo(userId, role, active);

    res.redirect('/admin/users');
};

const removeUserPermanently = (req, res) => {
    const {userId} = req.body;

    userDb.removeUser(userId);

    res.redirect('/admin/users');
};

module.exports = {
    renderUserManagement,
    updateUser,
    removeUserPermanently
};