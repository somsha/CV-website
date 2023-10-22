const { getEducationList } = require('./education-db');
const { getWorkList } = require('./work-db');


const renderAboutPage = async (req, res) => {
    try {
        const userId = req.session.userId;
        const educationList = await getEducationList(userId);
        const workList = await getWorkList(userId);

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