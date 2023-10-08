const sqlite3 = require('sqlite3');

// SQLite3 database connection (initialize your db as needed)
const db = new sqlite3.Database('./database/db.sqlite');

// Function to find a user by username
function findUserByUsername(username, callback) {
  const sql = 'SELECT * FROM user WHERE username = ?';
  db.get(sql, [username], (err, user) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, user);
    }
  });
}

module.exports = {
  findUserByUsername,
};