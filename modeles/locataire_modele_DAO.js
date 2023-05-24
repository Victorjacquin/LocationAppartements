const connect = require("./connection_BDD");
function getLocataires() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM locataire', function (error, results, fields) {
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

function getUnLocataire(idLocataire){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM locataire WHERE NumeroLocataire=${idLocataire}`;
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


function getLocatairesByAppartement(idAppartement){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT locataire.*, occuper.Date_Debut, occuper.Date_Fin
                           FROM locataire
                                    INNER JOIN occuper ON locataire.NumeroLocataire = occuper.NumeroLocataire
                           WHERE occuper.NumeroAppartement = ${idAppartement}
                           ORDER BY occuper.Date_Fin IS NULL DESC, occuper.Date_Fin DESC
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


function getLocataireByNumeroCompte(Numero_Compte_Bancaire){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM locataire WHERE Numero_Compte_Bancaire = ${Numero_Compte_Bancaire}
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


function addLocataire(Nom, Prenom, Tel, Date_Naissance, NumeroBanque,Numero_Compte_Bancaire) {
    connect((connection) => {
        const query = `INSERT INTO locataire (Nom, Prenom, Tel, Date_Naissance, NumeroBanque,Numero_Compte_Bancaire) 
                            VALUES (?)`;
        var values = [
            Nom,
            Prenom,
            Tel,
            Date_Naissance,
            NumeroBanque,
            Numero_Compte_Bancaire
        ]
        connection.query(query, [values],(error, results, fields) => {
            if (error) throw error;
            console.log("Locataire ajouté avec succès");
        });
        connection.end();
    });
}


function deleteLocataire(idLocataire) {
    connect((connection) => {
        const query = `DELETE FROM locataire WHERE (NumeroLocataire)=${idLocataire}`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log("Locataire supprimé avec succès");
        });
        connection.end();
    });
}


module.exports = {getLocataires, getUnLocataire, addLocataire, deleteLocataire, getLocatairesByAppartement, getLocataireByNumeroCompte}