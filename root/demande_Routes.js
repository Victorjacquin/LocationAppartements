const express = require('express');
const router = express.Router();
const {getDemandes, getUneDemande, getDemandeByIdClient } = require('./../modeles/demande_modele_DAO');
const {success} = require("../helper");
const {deleteClient, addClient} = require("../modeles/client_modele_DAO");
const {deleteDemande, addDemande} = require("../modeles/demande_modele_DAO");

router.get('/', async (req, res) => {
    const demandes = await getDemandes();
    const message = "Les demandes ont bien été trouvé."
    res.send(success(message,demandes))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const demande = await getUneDemande(id);
    const message = "La demande a bien été trouvé."
    res.send(success(message,demande))
});


router.get('/idclient/:idClient', async (req, res) => {
    const idClient = parseInt(req.params.idClient)
    const demande = await getDemandeByIdClient(idClient);
    console.log(demande);
    const message = "La ou les demandes de ce client ont bien été trouvé."
    res.send(success(message,demande))
});

router.post('/add', async (req, res) => {
    const { Date_Demande, Prix_min, Prix_max, NumeroClient, NumeroArrondissement, NumeroPays, NumeroVille, NumeroDepartement } = req.body  ;
    await addDemande(Date_Demande, Prix_min, Prix_max, NumeroClient, NumeroArrondissement, NumeroPays, NumeroVille, NumeroDepartement);
    res.send(`La demande a été ajouté avec succès !`);
});

router.get('/delete/:NumeroDemande', async (req, res) => {
    const NumeroDemande = parseInt(req.params.NumeroDemande)
    await deleteDemande(NumeroDemande);
    res.send(`La demande avec l'id ${NumeroDemande} a été supprimé avec succès !`);
});

module.exports = router;
