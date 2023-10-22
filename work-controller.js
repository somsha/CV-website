const workDb = require('./work-db');

const removeWorkEntry = (req, res) => {
    const { id } = req.body;

    workDb.removeWork(req.session.userId, id);

    res.redirect('/about');
};

const addWorkEntry = (req, res) => {
    const { company, position, description, startDate, endDate } = req.body;
   

    workDb.addNewWork(req.session.userId, company, position, description, startDate, endDate);

    res.redirect('/about');
};
const saveWorkEntry = (req, res) => {

    const { id, company, position, description, startDate, endDate } = req.body;

    workDb.saveWork(id, company, position, description, startDate, endDate);

    res.redirect('/about');
};

module.exports = {
    removeWorkEntry,
    addWorkEntry,
    saveWorkEntry
};