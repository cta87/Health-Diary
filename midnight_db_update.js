// Imports
const SQLITE3 = require('sqlite3').verbose();

// function to run at midnight to update sql database with daily dairy values

// sqlite code 
// ==================== Functions for Using a Sqlite DB file =============================

function queryDb(filename, sqlQuery) {
    console.log("Querying DB file: " + filename);
    console.log("Query String: " + sqlQuery);

    return new Promise((resolve, reject) => {

        const DATA_BASE = new SQLITE3.Database('./DBStore/' + filename);
        DATA_BASE.each(sqlQuery, (err, row) => {
            if (err) {
                reject(err); // optional: you might choose to swallow errors.
            } else {
                queries.push(row); // accumulate the data
            }
        }, (err, n) => {
            if (err) {
                console.log("Query error:" + err);
                reject(err); // optional: again, you might choose to swallow this error.
            } else {
                console.log('Query complete:');
                resolve(queries); // resolve the promise
            }
        });
    });
}

