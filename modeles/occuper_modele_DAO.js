const connect = require("./connection_BDD");
function getOccuper() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM occuper', function (error, results, fields) {
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

// function getUnOccuper(idAppartement, idPersonne){
//
//     return new Promise((resolve, reject) => {
//         connect((connection) => {
//
//             const query = `SELECT * FROM occuper WHERE NumeroAppartement=${idAppartement} and NumeroPersonne=${idPersonne}`;
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

function getOccuperByLocataire(idLocataire){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM occuper WHERE NumeroLocataire=${idLocataire} ORDER BY Date_Debut desc `;
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


function addOccuper( NumeroAppartement, NumeroLocataire, Date_Debut,Date_Fin) {
    connect((connection) => {
        const query = `INSERT INTO occuper (NumeroAppartement, NumeroLocataire, Date_Debut,Date_Fin) 
                            VALUES (?)`;
        var values = [
            NumeroAppartement,
            NumeroLocataire,
            Date_Debut,
            Date_Fin
        ]
        connection.query(query, [values],(error, results, fields) => {
            if (error) throw error;
            console.log("Location ajouté avec succès");
        });
        connection.end();
    });
}

module.exports = {getOccuper, getOccuperByLocataire, addOccuper}