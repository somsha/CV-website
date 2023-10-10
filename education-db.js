const { getDatabase } = require('./singleton-db');

const db = getDatabase();

function getEducationList(userId, callback) {
    const sql = `
        SELECT 
            id, institution, degree, major, startDate, endDate 
        FROM 
            education 
        WHERE userId = ?
        `;
    db.all(sql, [userId], (err, educationList) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, educationList);
        }
    });

}

function addNewEducation(userId, institution, degree, major, startDate, endDate) {
    const sql = `
        INSERT INTO education 
            (userId, institution, degree, major, startDate, endDate)
        VALUES 
            (?, ?, ?, ?,? , ?)
        `;

      // Insert the new user into the database
      db.run(
          sql,
          [userId,institution,  degree, major, startDate, endDate],
          (err) => {
              if (err) {
                console.error('Error adding education', err);
              } else {
                  console.log('Education added successfully.');
              }
          }
      );

}

function removeEducation(userId, id) {
    const sql = `
        DELETE FROM 
            education 
        WHERE 
            userId = ? AND id = ?
        `;

      // Insert the new user into the database
      db.run(
          sql,
          [userId, id],
          (err) => {
              if (err) {
                console.error('Error deleting education', err);
              } else {
                  console.log('Education deleted successfully.', id);
              }
          }
      );
}

module.exports = {
    getEducationList,
    addNewEducation,
    removeEducation
}