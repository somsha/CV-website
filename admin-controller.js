const { getAllUserInfoList, updateUserInfo } = require('./user-db');

const renderUserManagement = async (req, res) => {

    const userList = await getAllUserInfoList();

    console.log(userList);

    const data = {
        title: 'User Management',
        user: userList
    };

    res.render('user-management', data);
};

const updateUser = (req, res) => {
    const {userId, role, active} = req.body;
    console.log({userId, role, active});

    updateUserInfo(userId, role, active);

    res.redirect('/admin/users');
};

module.exports = {
    renderUserManagement,
    updateUser
};