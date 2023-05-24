
const connect = require("./connection_BDD");
function getPays() {
    return new Promise((resolve, reject) => {
        connect((connection) => {

            connection.query('SELECT * FROM pays', function (error, results, fields) {
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


module.exports = { getPays};
