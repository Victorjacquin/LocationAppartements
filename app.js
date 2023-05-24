const http = require('http');
const hostname = '127.0.0.1';
const port = 5000;
const express = require("express");
const morgan = require("morgan")
const favicon = require('serve-favicon')
const app = express();
const appartementRoutes = require('./root/appartements_Routes')
const arrondissementRoutes = require('./root/arrondissement_Routes')
const banqueRoutes = require('./root/banques_Routes')
const clientRoutes = require('./root/client_Routes')
const demandeRoutes = require('./root/demande_Routes')
const locataireRoutes = require('./root/locataire_Routes')
const occuperRoutes = require('./root/occuper_Routes')
const possederRoutes = require('./root/posseder_Routes')
const visiterRoutes = require('./root/visiter_Routes')
const proprietaireRoutes = require('./root/proprietaire_Routes')
const typeAppartement = require('./root/typeAppartement_Routes')
const Pays = require('./root/pays_Routes')
const Departements = require('./root/departement_Routes')
const Ville = require('./root/ville_Routes')
const bodyParser = require('body-parser')

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use(morgan("dev"))


    .use('/api/appartements', appartementRoutes)
    .use('/api/arrondissements', arrondissementRoutes)
    .use('/api/banques', banqueRoutes)
    .use('/api/clients', clientRoutes)
    .use('/api/demandes', demandeRoutes)
    .use('/api/locataires', locataireRoutes)
    .use('/api/occuper', occuperRoutes)
    .use('/api/posseder', possederRoutes)
    .use('/api/visites', visiterRoutes)
    .use('/api/proprietaires', proprietaireRoutes)
    .use('/api/typesAppartement', typeAppartement)
    .use('/api/villes', Ville)
    .use('/api/pays', Pays)
    .use('/api/departements', Departements)


app.get("/", (req,res) => res.send("Api démarrée"));



app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
