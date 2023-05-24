const express = require('express');
const router = express.Router();
const {getClients, getUnClient, deleteClient } = require('./../modeles/client_modele_DAO');
const {success} = require("../helper");
const {addAppartement, deleteAppartement} = require("../modeles/appartement_modele_DAO");
const {addClient} = require("../modeles/client_modele_DAO");

router.get('/', async (req, res) => {
    const clients = await getClients();
    const message = "Les clients ont bien été trouvé."
    res.send(success(message,clients))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const client = await getUnClient(id);
    const message = "Le client a bien été trouvé."
    res.send(success(message,client))
});

router.post('/add', async (req, res) => {
    const { Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP } = req.body  ;
    await addClient(Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP);
    res.send(`L'appartement a été ajouté avec succès !`);
});

router.get('/delete/:NumeroClient', async (req, res) => {
    const NumeroClient = parseInt(req.params.NumeroClient)
    await deleteClient(NumeroClient);
    res.send(`Le client avec l'id ${NumeroClient} a été supprimé avec succès !`);
});

module.exports = router;
