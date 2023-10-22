const { removeEducation, addNewEducation } = require('./education-db');

const removeEducationEntry = (req, res) => {
    const { id } = req.body;

    removeEducation(req.session.userId, id);

    res.redirect('/about');
};

// Function to add a new education entry
const addEducationEntry = (req, res) => {
    const { institution, degree, major, startDate, endDate } = req.body;

    addNewEducation(req.session.userId, institution, degree, major, startDate, endDate);

    res.redirect('/about');
};

module.exports = {
    removeEducationEntry,
    addEducationEntry,
};