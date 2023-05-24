
const connect = require("./connection_BDD");
function getDepartement() {
    return new Promise((resolve, reject) => {
        connect((connection) => {

            connection.query('SELECT * FROM departement', function (error, results, fields) {
                if (error) {
                    reject (error);
                } else {
                    resolve(results)
                }
            });
            connection.end();
        })
    })
}


module.exports = { getDepartement};
