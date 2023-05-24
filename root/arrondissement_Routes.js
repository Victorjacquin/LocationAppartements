const express = require('express');
const router = express.Router();
const { getUnArrondissement, getArrondissements, addArrondissement, deleteArrondissement } = require('./../modeles/arrondissement_modele_DAO');
const {success} = require("../helper");

router.get('/', async (req, res) => {
    const arrondissements = await getArrondissements();
    const message = "Les arrondissements ont bien été trouvé."
    res.send(success(message,arrondissements))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const arrondissement = await getUnArrondissement(id);
    const message = "L'arrondissement a bien été trouvé."
    res.send(success(message,arrondissement))
});

router.post('/add', async (req, res) => {
    const NumeroArrondissement = req.body
    await addArrondissement(NumeroArrondissement);
    res.send(`L'arrondissement numéro ${NumeroArrondissement} a été ajouté avec succès !`);
});

router.get('/delete/:NumeroArrondissement', async (req, res) => {
    const NumeroArrondissement = parseInt(req.params.NumeroArrondissement)
    await deleteArrondissement(NumeroArrondissement);
    res.send(`L'arrondissement numéro ${NumeroArrondissement} a été supprimé avec succès !`);
});


router.get('/update/:id', async (req, res) => {
    const { id } = req.params;
    await updateAppartement(id);
    res.send(`L'appartement avec l'id ${id} a été modifié avec succès !`);
});

module.exports = router
