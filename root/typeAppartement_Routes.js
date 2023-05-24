const express = require('express');
const router = express.Router();
const {success} = require("../helper");
const {getTypesAppartements, getUnTypeAppartement} = require("../modeles/typeAppartement_modele_DAO");

router.get('/', async (req, res) => {
    const typesAppartements = await getTypesAppartements();
    const message = "Les types d'appartements ont bien été trouvé."
    res.send(success(message, typesAppartements))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const unTypeAppartement = await getUnTypeAppartement(id);
    const message = "Le type d'appartement a bien été trouvé."
    res.send(success(message, unTypeAppartement))
});

module.exports = router;
