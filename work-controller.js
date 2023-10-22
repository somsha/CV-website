const { removeWork, addNewWork } = require('./work-db');

const removeWorkEntry = (req, res) => {
    const { id } = req.body;

    removeWork(req.session.userId, id);

    res.redirect('/about');
};

const addWorkEntry = (req, res) => {
    const { company, position, description, startDate, endDate } = req.body;

    addNewWork(req.session.userId, company, position, description, startDate, endDate);

    res.redirect('/about');
};

module.exports = {
    removeWorkEntry,
    addWorkEntry,
};