// Imports
const SQLITE3 = require('sqlite3').verbose();

// function to run at midnight to update sql database with daily dairy values

//ONLOAD code

let qryString = "SELECT * from tabl1;";
let insertString = "INSERT INTO `tabl1`(name,  mental) VALUES ('bob',7);";

(async function(){
    console.log(await queryDb('test_db', insertString));
})();



// sqlite code 
// ==================== Functions for Using a Sqlite DB file =============================

function queryDb(filename, sqlQuery) {
    console.log("Querying DB file: " + filename);
    console.log("Query String: " + sqlQuery);

    return new Promise((resolve, reject) => {

        const queries = [];
        const DATABASE = new SQLITE3.Database('./' + filename);
        DATABASE.each(sqlQuery, (err, row) => {
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

