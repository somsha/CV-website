const educationDb = require('./education-db');

const removeEducationEntry = (req, res) => {
    const { id } = req.body;

    educationDb.removeEducation(req.session.userId, id)

    res.redirect('/about');
};

// Function to add a new education entry
const addEducationEntry = (req, res) => {
    const { institution, degree, major, startDate, endDate } = req.body;

    educationDb.addNewEducation(req.session.userId,institution, degree, major, startDate, endDate);

    res.redirect('/about');
};

const saveEducationEntry = (req, res) => {

   

    const { id, institution, degree, major, startDate, endDate } = req.body;
    console.log( id, institution, degree, major, startDate, endDate);
    educationDb.saveEducation(id, institution, degree, major, startDate, endDate);

    res.redirect('/about');
};

module.exports = {
    removeEducationEntry,
    addEducationEntry,
    saveEducationEntry
};