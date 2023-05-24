const connect = require("./connection_BDD");
function getDemandes() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM demande', function (error, results, fields) {
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

function getUneDemande(idDemande){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM demande WHERE NumeroDemande=${idDemande}`;
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


function getDemandeByIdClient(idClient){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM demande WHERE NumeroClient=${idClient} ORDER BY Date_Demande desc `;
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


function addDemande(Date_Demande, Prix_min, Prix_max, NumeroClient, NumeroArrondissement) {
    connect((connection) => {
        const query = `INSERT INTO demande (Date_Demande, Prix_min, Prix_max, NumeroClient, Numero_Arrondissement, NumeroPays, NumeroVille, NumeroDepartement) 
                            VALUES (?)`;
        var values = [
            Date_Demande,
            Prix_min,
            Prix_max,
            NumeroClient,
            NumeroArrondissement,
            NumeroPays,
            NumeroVille,
            NumeroDepartement]
        connection.query(query, [values],(error, results, fields) => {
            if (error) throw error;
            console.log("Demande ajouté avec succès");
        });
        connection.end();
    });
}

function deleteDemande(idDemande) {
    connect((connection) => {
        const query = `DELETE FROM demande WHERE (NumeroDemande)=${idDemande}`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log("Demande supprimé avec succès");
        });
        connection.end();
    });
}

module.exports = {getDemandes, getUneDemande, getDemandeByIdClient, deleteDemande, addDemande}