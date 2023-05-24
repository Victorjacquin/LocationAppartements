const connect = require("./connection_BDD");
function getPosseder() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM posseder', function (error, results, fields) {
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

function getUnPosseder(idAppartement, idPersonne){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM posseder WHERE NumeroAppartement=${idAppartement} and NumeroPersonne=${idPersonne}`;
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject (error);
                } else {
                    resolve(results)
                }
                connection.end();
            });
        })
    })

}


function getPossederByProprietaire(idProprietaire){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM posseder WHERE NumeroProprietaire=${idProprietaire}`;
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject (error);
                } else {
                    resolve(results)
                }
                connection.end();
            });
        })
    })

}



module.exports = {getPosseder, getUnPosseder, getPossederByProprietaire}