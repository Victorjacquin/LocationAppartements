
const connect = require("./connection_BDD");
function getAppartements() {
    return new Promise((resolve, reject) => {
        connect((connection) => {

            connection.query('SELECT * FROM appartement', function (error, results, fields) {
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


function getAppartementsLibres(){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT *
                           FROM appartement
                           WHERE NOT EXISTS (
                                   SELECT occuper.NumeroAppartement
                                   FROM occuper 
                                   WHERE occuper.NumeroAppartement = appartement.NumeroAppartement
                                     AND (occuper.Date_Fin IS NULL OR occuper.Date_Fin >= CURDATE())
                               ) `;
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

function getUnAppartement(idAppartement){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM appartement WHERE numeroAppartement=${idAppartement}`;
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

    function addAppartement(Rue, Num_Rue, Ville, CP, Prix_Location, Prix_Charge, Ascenseur, Preavis, Etage, NumeroTypeAppartement, Numero_Arrondissement, Taille) {
        connect((connection) => {
            const query = `INSERT INTO appartement (Rue, Num_Rue, Ville, CP, Prix_Location, Prix_Charge, Ascenseur, Preavis, Etage, NumeroTypeAppartement, Numero_Arrondissement, Taille) 
                            VALUES (?)`;
            var values = [
                Rue,
                Num_Rue,
                Ville,
                CP,
                Prix_Location,
                Prix_Charge,
                Ascenseur,
                Preavis,
                Etage,
                NumeroTypeAppartement,
                Numero_Arrondissement,
                Taille
            ]
            connection.query(query, [values],(error, results, fields) => {
                if (error) throw error;
                console.log("Appartement ajouté avec succès");
            });
            connection.end();
        });
    }

function deleteAppartement(idAppartement) {
    connect((connection) => {
        const query = `DELETE FROM appartement WHERE numeroAppartement=${idAppartement}`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log("Appartement supprimé avec succès");
        });
        connection.end();
    });
}
function updateAppartement(NumeroAppartement, Rue, Num_Rue, Ville, CP, Prix_Location, Prix_Charge, Ascenseur, Preavis, Etage, taille, NumeroTypeAppartement, Numero_Arrondissement) {
    connect((connection) => {
        connection.beginTransaction((error) => {
            if (error) throw error;
            const query = `UPDATE appartement SET 
                               Rue = ?,
                               Num_Rue = ?,
                               Ville = ?,
                               CP = ?,
                               Prix_Location = ?,
                               Prix_Charge = ?, 
                               Ascenseur = ?,
                               Preavis = ?,
                               Etage = ?,
                               taille = ?, 
                               NumeroTypeAppartement = ?, 
                               Numero_Arrondissement = ?
                           WHERE NumeroAppartement = ?`;
            var values = [
                Rue,
                Num_Rue,
                Ville,
                CP,
                Prix_Location,
                Prix_Charge,
                Ascenseur,
                Preavis,
                Etage,
                taille,
                NumeroTypeAppartement,
                Numero_Arrondissement,
                NumeroAppartement
            ];
            connection.query(query, values,(error, results, fields) => {
                if (error) throw error;
                console.log("Appartement modifié avec succès");
                connection.commit((error) => {
                    if (error) {
                        return connection.rollback(() => {
                            throw error;
                        });
                    }
                    connection.end();
                });
            });
        });
    });
}



function getAppartementsByType(idTypeAppartement){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM appartement WHERE numeroTypeAppartement=${idTypeAppartement}`;
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

function getAppartementsByPrix(Prix){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM appartement WHERE Prix_Location=${Prix}`;
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

function getAppartementByPrixMin(PrixMin){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM appartement WHERE Prix_Location>=${PrixMin}`;
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

function getAppartementByPrixMax(PrixMax){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM appartement WHERE Prix_Location<=${PrixMax}`;
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

function getAppartementByVille(Ville){

    return new Promise((resolve, reject) => {
        connect((connection) => {
            const query = `SELECT * FROM appartement WHERE Ville='${Ville}'`;
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

function getAppartementByRecherche(prix_min, prix_max, Ville){

    return new Promise((resolve, reject) => {
        connect((connection) => {
            const query = `SELECT * FROM Appartements
                           WHERE (Ville = '${Ville}' OR '${Ville}' IS NULL)
                             AND (Prix_Location >= '${prix_min}' OR '${prix_min}' IS NULL)
                             AND (Prix_Location <= '${prix_max}' OR '${prix_max}' IS NULL)`;
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






module.exports = {getAppartements, getUnAppartement, deleteAppartement, updateAppartement, addAppartement,
    getAppartementsByType, getAppartementByPrixMin, getAppartementByPrixMax, getAppartementsByPrix, getAppartementByVille, getAppartementByRecherche, updateAppartement, getAppartementsLibres};
