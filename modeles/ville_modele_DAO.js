
const connect = require("./connection_BDD");
function getVille() {
    return new Promise((resolve, reject) => {
        connect((connection) => {

            connection.query('SELECT * FROM ville', function (error, results, fields) {
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


module.exports = { getVille};
