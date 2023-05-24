const express = require('express');
const router = express.Router();
const {success} = require("../helper");
const {getPosseder, getUnPosseder, getPossederByProprietaire} = require("../modeles/posseder_modele_DAO");

router.get('/', async (req, res) => {
    const posseder = await getPosseder();
    const message = "Les possessions ont bien été trouvé."
    res.send(success(message,posseder))
});

// router.get('/:idAppartement/:idPersonne', async (req, res) => {
//     const idAppartement = (req.params.idAppartement)
//     const idPersonne = (req.params.idPersonne)
//
//     const unPosseder = await getUnPosseder(idAppartement, idPersonne);
//     const message = "L'occupation a bien été trouvé."
//     res.send(success(message,unPosseder))
// });

router.get('/proprietaire/:idProprietairee', async (req, res) => {
    const idProprietairee = (req.params.idProprietairee)
    const Posseder = await getPossederByProprietaire(idProprietairee);
    const message = `L'occupation du proprietaire ${idProprietairee} a bien été trouvé`
    res.send(success(message,Posseder))
});

module.exports = router;
