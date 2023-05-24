const express = require('express');
const router = express.Router();
const {success} = require("../helper");
const {getProprietaires, getUnProprietaire, deleteProprietaire, addProprietaire, getProprietairesByAppartement} = require("../modeles/proprietaire_modele_DAO");
const {addClient} = require("../modeles/client_modele_DAO");

router.get('/', async (req, res) => {
    const proprietaires = await getProprietaires();
    const message = "Les proprietaires ont bien été trouvé."
    res.send(success(message, proprietaires))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const proprietaire = await getUnProprietaire(id);
    const message = "Le proprietaire a bien été trouvé."
    res.send(success(message,proprietaire))
});

router.get('/Appartement/:idAppartement', async (req, res) => {
    const idAppartement = parseInt(req.params.idAppartement)
    const proprietaires = await getProprietairesByAppartement(idAppartement);
    const message = "Les proprietaires ont bien été trouvé."
    res.send(success(message,proprietaires))
});

router.get('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const proprietaire = await deleteProprietaire(id);
    const message = "Le proprietaire a bien été supprimé."
    res.send(success(message,proprietaire))
});

router.post('/add', async (req, res) => {
    const { Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP } = req.body  ;
    await addProprietaire(Nom, Prenom, Tel, Nom_Rue, Numero_Rue,Ville,CP);
    res.send(`Le proprietaire a été ajouté avec succès !`);
});

module.exports = router;
