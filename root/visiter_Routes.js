const express = require('express');
const router = express.Router();
const {success} = require("../helper");
const {getVisites, getUneVisite, getVisiteByIdClient, deleteVisite, addVisite} = require("../modeles/visiter_modele_DAO");
const {deleteDemande, addDemande} = require("../modeles/demande_modele_DAO");

router.get('/', async (req, res) => {
    const visites = await getVisites();
    const message = "Les visites ont bien été trouvé."
    res.send(success(message,visites))
});

// router.get('/:idAppartement/:idPersonne', async (req, res) => {
//     const idAppartement = (req.params.idAppartement)
//     const idPersonne = (req.params.idPersonne)
//
//     const uneVisite = await getUneVisite(idAppartement, idPersonne);
//     const message = "La visite a bien été trouvé."
//     res.send(success(message,uneVisite))
// });

router.get('/client/:idclient', async (req, res) => {
    const idclient = (req.params.idclient)

    const Visites = await getVisiteByIdClient(idclient);
    const message = "La visite a bien été trouvé."
    res.send(success(message,Visites))
});

router.post('/add', async (req, res) => {
    const { Date_Visite, NumeroClient, NumeroAppartement } = req.body  ;
    await addVisite(Date_Visite, NumeroClient, NumeroAppartement);
    res.send(`La visite a été ajouté avec succès !`);
});

router.get('/delete/:NumeroAppartement/:NumeroClient', async (req, res) => {
    const NumeroAppartement = parseInt(req.params.NumeroAppartement)
    const NumeroClient = parseInt(req.params.NumeroClient)
    await deleteVisite(NumeroAppartement, NumeroClient);
    res.send(`La visite a été supprimé avec succès !`);
});

module.exports = router;
