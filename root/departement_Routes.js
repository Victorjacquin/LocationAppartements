const express = require('express');
const router = express.Router();
const { getDepartement } = require('./../modeles/departement_modele_DAO');
const {success} = require("../helper");

router.get('/', async (req, res) => {
    const departement = await getDepartement();
    const message = "Les départements ont bien été trouvé."
    res.send(success(message,departement))
});

module.exports = router
