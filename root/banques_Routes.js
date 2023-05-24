const express = require('express');
const router = express.Router();
const {getBanques, getUneBanque } = require('./../modeles/banque_modele_DAO');
const {success} = require("../helper");

router.get('/', async (req, res) => {
    const banques = await getBanques();
    const message = "Les banques ont bien été trouvé."
    res.send(success(message,banques))
});

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const banque = await getUneBanque(id);
    const message = "La banque a bien été trouvé."
    res.send(success(message,banque))
});

module.exports = router;
