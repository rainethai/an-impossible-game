// This ensures that things do not fail silently but will throw errors instead.
"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('user.db');

// Is the database initialized or do we need to initialize it?
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);
const stmt2 = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='highscores';`)
const stmt3 = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='playerhistory';`)
const stmt4 = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='lastplayers';`)
let row = stmt.get();
let row2 = stmt2.get();
let row3 = stmt3.get();
let row4 = stmt4.get();
if ((row === undefined) || (row2 === undefined) || (row3 === undefined) || (row4 === undefined)) {
    if (row === undefined) {
        // Echo information about what you are doing to the console.
        console.log('Your database appears to be empty. I will initialize it now.');
        // Set a const that will contain your SQL commands to initialize the database.
        const sqlInit = `
            CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, user TEXT, pass TEXT );
            
        `;
        // Execute SQL commands that we just wrote above.
        db.exec(sqlInit);
        // Echo information about what we just did to the console.
        console.log('Your userinfo table has been initialized.');
    }
    if (row2 === undefined) {
        // Echo information about what you are doing to the console.
        console.log('Your database appears to be empty. I will initialize it now.');
        // Set a const that will contain your SQL commands to initialize the database.
        const sqlInit = `
            CREATE TABLE highscores (id INTEGER PRIMARY KEY, user TEXT, score TEXT );
        `;
        // Execute SQL commands that we just wrote above.
        db.exec(sqlInit);
        // Echo information about what we just did to the console.
        console.log('Your highscores table has been initialized.');
    }
    if (row3 === undefined) {
        // Echo information about what you are doing to the console.
        console.log('Your database appears to be empty. I will initialize it now.');
        // Set a const that will contain your SQL commands to initialize the database.
        const sqlInit = `
            CREATE TABLE playerhistory (id INTEGER PRIMARY KEY, user TEXT, question TEXT, answer TEXT, point INT );
        `;
        // Execute SQL commands that we just wrote above.
        db.exec(sqlInit);
        // Echo information about what we just did to the console.
        console.log('Your playerhistory table has been initialized.');
    }
    if (row4 === undefined) {
        // Echo information about what you are doing to the console.
        console.log('Your database appears to be empty. I will initialize it now.');
        // Set a const that will contain your SQL commands to initialize the database.
        const sqlInit = `
            CREATE TABLE lastplayers (id INTEGER PRIMARY KEY, user TEXT)
        `;
        // Execute SQL commands that we just wrote above.
        db.exec(sqlInit);
        // Echo information about what we just did to the console.
        console.log('Your lastplayers table has been initialized.');
    }

} else {
    // Since the database already exists, echo that to the console.
    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db
