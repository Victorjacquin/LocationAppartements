const connect = require("./connection_BDD");
function getVisites() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM visiter', function (error, results, fields) {
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

// function getUneVisite(idAppartement, idPersonne){
//
//     return new Promise((resolve, reject) => {
//         connect((connection) => {
//
//             const query = `SELECT * FROM visiter WHERE NumeroAppartement=${idAppartement} and NumeroPersonne=${idPersonne}`;
//             connection.query(query, (error, results, fields) => {
//                 if (error) {
//                     reject (error);
//                 } else {
//                     resolve(results)
//                 }
//                 connection.end();
//             });
//         })
//     })
//
// }

function getVisiteByIdClient(idClient){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM visiter WHERE NumeroClient=${idClient} ORDER BY Date_Visite DESC`;
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

function addVisite(Date_Visite, NumeroClient, NumeroAppartement) {
    connect((connection) => {
        const query = `INSERT INTO visiter (Date_Visite, NumeroClient, NumeroAppartement) 
                            VALUES (?)`;
        var values = [
            Date_Visite,
            NumeroClient,
            NumeroAppartement]
        connection.query(query, [values],(error, results, fields) => {
            if (error) throw error;
            console.log("Visite ajouté avec succès");
        });
        connection.end();
    });
}

function deleteVisite(NumeroAppartement, NumeroClient) {
    connect((connection) => {
        const query = `DELETE FROM visiter WHERE (NumeroAppartement)=${NumeroAppartement} and NumeroClient=${NumeroClient}`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log("Visite supprimé avec succès");
        });
        connection.end();
    });
}


module.exports = {getVisites, getVisiteByIdClient, deleteVisite, addVisite}