const express = require('express');
const router = express.Router();
const { getVille } = require('./../modeles/ville_modele_DAO');
const {success} = require("../helper");

router.get('/', async (req, res) => {
    const villes = await getVille();
    const message = "Les villes ont bien été trouvé."
    res.send(success(message,villes))
});

module.exports = router
