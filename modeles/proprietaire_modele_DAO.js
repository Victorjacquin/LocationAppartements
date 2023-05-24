const connect = require("./connection_BDD");
function getProprietaires() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM proprietaire', function (error, results, fields) {
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

function getUnProprietaire(idProprietaire){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM proprietaire WHERE NumeroProprietaire=${idProprietaire}`;
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


function getProprietairesByAppartement(idAppartement){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT proprietaire.*, posseder.Date_Debut, posseder.Date_Fin
                           FROM proprietaire
                                    INNER JOIN posseder ON proprietaire.NumeroProprietaire = posseder.NumeroProprietaire
                           WHERE posseder.NumeroAppartement = ${idAppartement}
                           ORDER BY posseder.Date_Fin IS NULL DESC, posseder.Date_Fin DESC
            ;
            `;
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


function deleteProprietaire(idProprietaire) {
    connect((connection) => {
        const query = `DELETE FROM proprietaire WHERE NumeroProprietaire=${idProprietaire}`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log("Proprietaire supprimé avec succès");
        });
        connection.end();
    });
}


function addProprietaire(Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP) {
    connect((connection) => {
        const query = `INSERT INTO proprietaire (Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP) 
                            VALUES (?)`;
        var values = [
            Nom,
            Prenom,
            Tel,
            Nom_Rue,
            Numero_Rue,
            Ville,
            CP
        ]
        connection.query(query, [values],(error, results, fields) => {
            if (error) throw error;
            console.log("Proprietaire ajouté avec succès");
        });
        connection.end();
    });
}

module.exports = {getProprietaires, getUnProprietaire, deleteProprietaire, addProprietaire, getProprietairesByAppartement}