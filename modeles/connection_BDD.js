const mysql = require("mysql");

function connection(callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'location_appartement'
    });

    connection.connect((error) => {
        if (error) {
            console.error('Erreur de connexion à la base de données: ' + error.stack);
            return;
        }
        console.log('Bien connecté à la base de donnée')

    });

    callback(connection);
}

module.exports = connection;
