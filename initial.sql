--  User table
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT,
    active BOOLEAN
);

-- insert default admin user
INSERT INTO user (username, password, role, active)
    SELECT 'admin', '$2b$10$IEsZtdkX4I.ZdpAa5hsPBuQk.ywLepZKKcKj.QkuKBWs2qYHROz6K', 'ROLE_ADMIN', true
        WHERE NOT EXISTS (SELECT 1 FROM user WHERE username = 'admin');
-- insert Sara and Nicol
INSERT INTO user (username, password, role, active)
    SELECT 'sara', '$2b$10$Y4XRrLagVUD9TFpMjg8xeOp3sOcsJZId.hUlbDome/XZ.M7Vvauxe', 'ROLE_USER', true
        WHERE NOT EXISTS (SELECT 1 FROM user WHERE username = 'Sara');

INSERT INTO user (username, password, role, active)
    SELECT 'nicole', '$2b$10$u3NZqnhJD7wyUKi6lQtLcO1hhqhvaPnvRUJ/QyU9RCD0p2Fq.nnsC', 'ROLE_USER', true
        WHERE NOT EXISTS (SELECT 1 FROM user WHERE username = 'Nicole');

--  Profile table
CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    firstName TEXT,
    lastName TEXT,
    FOREIGN KEY (userId) REFERENCES user(id)
);
INSERT INTO profile (userId, firstName, lastName)
    SELECT us.id, 'Somayeh','Hossein Niay' FROM user us WHERE us.username = 'admin' AND 0 = (SELECT count(*) FROM user ut JOIN profile ON ut.id = profile.userId and ut.id = us.id);

-- Work table
CREATE TABLE IF NOT EXISTS work (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    company TEXT,
    position TEXT,
    description TEXT,
    startDate DATE,
    endDate DATE,
    FOREIGN KEY (userId) REFERENCES user(id)
);
-- Education table
CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    institution TEXT,
    startDate DATE,
    endDate DATE,
    degree TEXT,
    major TEXT,
    FOREIGN KEY (userId) REFERENCES user(id)
);


--insert admin cv
INSERT INTO education (userId, institution, startDate, endDate, degree, major)
SELECT 1, 'Jönköping university', '2022-01-07', '', 'Student', 'Software Engineering and Mobile Platformsics'
WHERE NOT EXISTS (SELECT 1 FROM education WHERE userId = 1 and degree = 'Student');

INSERT INTO education (userId, institution, startDate, endDate, degree, major)
SELECT 1, 'University of Rasht', '2005-01-11', '2008-10-15', 'Bachelor', 'Accounting'
WHERE NOT EXISTS (SELECT 1 FROM education WHERE userId = 1 and degree = 'Bachelor');

INSERT INTO education (userId, institution, startDate, endDate, degree, major)
SELECT 1, 'Rasht High School', '2001-01-07', '2005-10-22', 'Diploma ', 'mathematics and physics'
WHERE NOT EXISTS (SELECT 1 FROM education WHERE userId = 1 and degree = 'Diploma ');


INSERT INTO work (userId, company, position, description, startDate, endDate)
SELECT 1, 'Aleholm school' , 'Educational Assistant','', '2018-01-07', '2022-10-22'
WHERE NOT EXISTS (SELECT 1 FROM work WHERE userId = 1 and company = 'Aleholm school');

INSERT INTO work (userId, company, position, description, startDate, endDate)
SELECT 1, 'Sweden' , 'Unaccompanied children to Sweden','', '2014-01-07', '2016-10-22'
WHERE NOT EXISTS (SELECT 1 FROM work WHERE userId = 1 and company = 'Sweden');

INSERT INTO work (userId, company, position, description, startDate, endDate)
SELECT 1, 'Iran' , 'Private Company accountant','', '2008-05-07', '2013-11-12'
WHERE NOT EXISTS (SELECT 1 FROM work WHERE userId = 1 and company = 'Iran');

--inser user2 cv
INSERT INTO education (userId, institution, startDate, endDate, degree, major)
SELECT 2, 'Jönköping university', '2021-01-07', '', 'Student', 'Software Engineering and Mobile Platformsics'
WHERE NOT EXISTS (SELECT 1 FROM education WHERE userId = 2);


INSERT INTO work (userId, company, position, description, startDate, endDate)
SELECT 2, 'Aleholm school' , 'Educational Assistant','', '2018-01-07', '2022-10-22'
WHERE NOT EXISTS (SELECT 1 FROM work WHERE userId = 2);


--insert user3 cv
INSERT INTO education (userId, institution, startDate, endDate, degree, major)
SELECT 3, 'Jönköping university', '2020-01-07', '', 'Student', 'Software Engineering and Mobile Platformsics'
WHERE NOT EXISTS (SELECT 1 FROM education WHERE userId = 3);


INSERT INTO work (userId, company, position, description, startDate, endDate)
SELECT 3, 'Aleholm school' , 'Educational Assistant','', '2018-01-07', '2022-10-22'
WHERE NOT EXISTS (SELECT 1 FROM work WHERE userId = 3);
