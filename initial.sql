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

--  Profile table
CREATE TABLE IF NOT EXISTS profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    avatar TEXT,
    firstName TEXT,
    lastName TEXT,
    FOREIGN KEY (userId) REFERENCES user(id)
);

-- Work table
CREATE TABLE IF NOT EXISTS work (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    startDate DATE,
    endDate DATE,
    isCurrent BOOLEAN,
    position TEXT,
    FOREIGN KEY (userId) REFERENCES user(id)
);
-- Education table
CREATE TABLE IF NOT EXISTS education (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    startDate DATE,
    endDate DATE,
    isStudying BOOLEAN,
    degree TEXT,
    FOREIGN KEY (userId) REFERENCES user(id)
);
-- Certificate table
CREATE TABLE IF NOT EXISTS certificate (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    name TEXT,
    dateOfAchievement DATE,
    FOREIGN KEY (userId) REFERENCES user(id)
);