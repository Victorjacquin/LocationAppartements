const connect = require("./connection_BDD");
function getClients() {
    return new Promise((resolve, reject) => {
        connect((connection) => {
            connection.query('SELECT * FROM client', function (error, results, fields) {
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

function getUnClient(idClient){

    return new Promise((resolve, reject) => {
        connect((connection) => {

            const query = `SELECT * FROM client WHERE NumeroClient=${idClient}`;
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


function addClient(Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP) {
    connect((connection) => {
        const query = `INSERT INTO client (Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP) 
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
            console.log("Client ajouté avec succès");
        });
        connection.end();
    });
}

function deleteClient(idClient) {
    connect((connection) => {
        const query = `DELETE FROM client WHERE (NumeroClient)=${idClient}`;
        connection.query(query, (error, results, fields) => {
            if (error) throw error;
            console.log("Client supprimé avec succès");
        });
        connection.end();
    });
}

module.exports = {getClients, getUnClient, addClient, deleteClient}