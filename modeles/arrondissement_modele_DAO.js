const connect = require("./connection_BDD");
function getArrondissements() {
    return new Promise((resolve, reject) => {
        connect((connection) => {

            connection.query('SELECT * FROM arrondissement', function (error, results, fields) {
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

function getUnArrondissement(idArrondissement){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM arrondissement WHERE Numero_Arrondissement=${idArrondissement}`;
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

function addArrondissement(NumeroArrondissement) {
    connect((connection) => {
        const query = 'INSERT INTO arrondissement (Numero_Arrondissement) VALUES (?)';
        var values = [
            Number(NumeroArrondissement)
        ];
        connection.query(query, [values], (error, results, fields) => {
            if (error) throw error;
            console.log("Arrondissement ajouté avec succès");
            connection.end();
        });
    });
}

function deleteArrondissement(NumeroArrondissement) {
    connect((connection) => {
        const query = `DELETE FROM arrondissement WHERE (Numero_Arrondissement)=${NumeroArrondissement}`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log("Appartement supprimé avec succès");
        });
        connection.end();
    });
}


module.exports = {getArrondissements, getUnArrondissement, addArrondissement, deleteArrondissement};
