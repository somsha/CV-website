const educationDb = require('./education-db');
const workDb = require('./work-db');


const renderAboutPage = async (req, res) => {
    try {
        const userId = req.session.userId;
        const educationList = await educationDb.getEducationList(userId);
        const workList = await workDb.getWorkList(userId);

        const data = {
            title: 'About Page',
            education: educationList,
            work: workList,
        };

        res.render('about', data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    renderAboutPage,
};