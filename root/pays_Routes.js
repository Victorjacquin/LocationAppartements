const express = require('express');
const router = express.Router();
const { getPays } = require('./../modeles/pays_modele_DAO');
const {success} = require("../helper");

router.get('/', async (req, res) => {
    const pays = await getPays();
    const message = "Les pays ont bien été trouvé."
    res.send(success(message,pays))
});

module.exports = router
