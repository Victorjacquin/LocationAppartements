const connect = require("./connection_BDD");
function getTypesAppartements() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM type_appartement', function (error, results, fields) {
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

function getUnTypeAppartement(idTypeAppartement){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM type_appartement WHERE NumeroTypeAppartement=${idTypeAppartement}`;
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

module.exports = {getTypesAppartements, getUnTypeAppartement}