const connect = require("./connection_BDD");
function getBanques() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM banque', function (error, results, fields) {
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

function getUneBanque(idBanque){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM banque WHERE NumeroBanque=${idBanque}`;
            connection.query(query, (error, results, fields) => {
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

module.exports = {getBanques, getUneBanque}