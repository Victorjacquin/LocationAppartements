const express = require('express');
const router = express.Router();
const {success} = require("../helper");
const {getLocataires, getUnLocataire, addLocataire, deleteLocataire, getLocatairesByAppartement,
    getLocataireByNumeroCompte
} = require("../modeles/locataire_modele_DAO");
const {addClient, deleteClient} = require("../modeles/client_modele_DAO");

router.get('/', async (req, res) => {
    const locataires = await getLocataires();
    const message = "Les locataires ont bien été trouvé."
    res.send(success(message,locataires))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const locataire = await getUnLocataire(id);
    const message = "Le locataire a bien été trouvé."
    res.send(success(message,locataire))
});

router.get('/NumeroCompte', async (req, res) => {
    const idCompteBancaire = req.body;
    const locataire = await getLocataireByNumeroCompte(idCompteBancaire);
    const message = "Le locataire a bien été trouvé."
    res.send(success(message,locataire))
});

router.get('/Appartement/:idAppartement', async (req, res) => {
    const idAppartement = parseInt(req.params.idAppartement)
    const locataires = await getLocatairesByAppartement(idAppartement);
    const message = "Les locataires ont bien été trouvé."
    res.send(success(message,locataires))
});

router.post('/add', async (req, res) => {
    const {Nom, Prenom, Tel, Date_Naissance, NumeroBanque,Numero_Compte_Bancaire} = req.body  ;
    await addLocataire(Nom, Prenom, Tel, Date_Naissance, NumeroBanque,Numero_Compte_Bancaire);
    res.send(`Le locataire a été ajouté avec succès !`);
});

router.get('/delete/:Numerolocataire', async (req, res) => {
    const Numerolocataire = parseInt(req.params.Numerolocataire)
    await deleteLocataire(Numerolocataire);
    res.send(`Le locataire avec l'id ${Numerolocataire} a été supprimé avec succès !`);
});

module.exports = router;
