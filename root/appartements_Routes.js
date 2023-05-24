const express = require('express');
const router = express.Router();
const { getAppartements, getUnAppartement, deleteAppartement, updateAppartement, addAppartement, getAppartementsByPrix,
getAppartementByPrixMax, getAppartementByPrixMin, getAppartementsByType, getAppartementByVille, getAppartementByRecherche} = require('./../modeles/appartement_modele_DAO');
const {success} = require("../helper");
const {getAppartementsLibres} = require("../modeles/appartement_modele_DAO");

router.get('/', async (req, res) => {
    const appartements = await getAppartements();
    const message = "Les appartements ont bien été trouvé."
    res.send(success(message,appartements))
});

router.get('/libres', async (req, res) => {
    const appartements = await getAppartementsLibres();
    const message = "Les appartements libres ont bien été trouvé."
    res.send(success(message,appartements))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const appartement = await getUnAppartement(id);
    const message = "L'appartement a bien été trouvé."
    res.send(success(message,appartement))
});

router.post('/add', async (req, res) => {
    const { Rue, Num_Rue, Ville, CP, Prix_Location, Prix_Charge, Ascenseur, Preavis, Etage, NumeroTypeAppartement, Numero_Arrondissement, Taille } = req.body  ;
    console.log(req.body)
    await addAppartement(Rue, Num_Rue, Ville, CP, Prix_Location, Prix_Charge, Ascenseur, Preavis, Etage, NumeroTypeAppartement, Numero_Arrondissement, Taille);
    res.send(`L'appartement a été ajouté avec succès !`);
});

router.post('/update', async (req, res) => {
    const { NumeroAppartement, Rue, Num_Rue, Ville, CP, Prix_Location, Prix_Charge, Ascenseur, Preavis, Etage, taille, NumeroTypeAppartement, Numero_Arrondissement } = req.body  ;
    console.log(req.body)
    await updateAppartement(NumeroAppartement, Rue, Num_Rue, Ville, CP, Prix_Location, Prix_Charge, Ascenseur, Preavis, Etage, taille, NumeroTypeAppartement, Numero_Arrondissement);
    res.send(`L'appartement a été modifié avec succès !`);
});

router.post('/delete', async (req, res) => {
    const { id } = req.body;
    await deleteAppartement(id);
    res.send(`L'appartement avec l'id ${id} a été supprimé avec succès !`);
});



router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    await updateAppartement(id);
    res.send(`L'appartement avec l'id ${id} a été modifié avec succès !`);
});

router.get('/prix/:prix', async (req, res) => {
    const { prix } = req.params;
    const appartements = await getAppartementsByPrix(prix);
    const message = `Voici les appartement à ${prix} euros par mois !`
    res.send(success(message, appartements));
});

router.get('/prixmin/:prix', async (req, res) => {
    const { prix } = req.params;
    const appartements = await getAppartementByPrixMin(prix);
    const message = `Voici les appartement à ${prix} euros minimum par mois !`
    res.send(success(message, appartements));
});

router.get('/prixmax/:prix', async (req, res) => {
    const { prix } = req.params;
    const appartements = await getAppartementByPrixMax(prix);
    const message = `Voici les appartement à ${prix} euros maximum par mois !`
    res.send(success(message, appartements));
});

router.get('/type/:type', async (req, res) => {
    const { type } = req.params;
    const appartements = await getAppartementsByType(type);
    const message = `Voici les appartement de ce type d'appartement !`
    res.send(success(message,appartements));
});

router.get('/ville/:ville', async (req, res) => {
    const { ville } = req.params;
    const appartements = await getAppartementByVille(ville);
    const message = `Voici les appartement de ${ville} !`
    res.send(success(message,appartements));
});

router.post('/recherche', async (req, res) => {
    const { prix_min, prix_max, ville } = req.body  ;
    console.log(req.body)
    await getAppartementByRecherche(prix_min, prix_max, ville);
    res.send(`Voici les appartements !`);
});

module.exports = router;