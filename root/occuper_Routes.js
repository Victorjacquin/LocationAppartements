const express = require('express');
const router = express.Router();
const {success} = require("../helper");
const {getOccuper, getUnOccuper, getOccuperByLocataire, addOccuper} = require("../modeles/occuper_modele_DAO");
const connect = require("../modeles/connection_BDD");
const {getDemandeByIdClient} = require("../modeles/demande_modele_DAO");

router.get('/', async (req, res) => {
    const occuper = await getOccuper();
    const message = "Les occupations ont bien été trouvé."
    res.send(success(message,occuper))
});

// router.get('/:idAppartement/:idPersonne', async (req, res) => {
//     const idAppartement = (req.params.idAppartement)
//     const idPersonne = (req.params.idPersonne)
//
//     const unOccuper = await getUnOccuper(idAppartement, idPersonne);
//     const message = "L'occupation a bien été trouvé."
//     res.send(success(message,unOccuper))
// });


router.get('/Locataire/:idLocataire', async (req, res) => {
    const idLocataire = parseInt(req.params.idLocataire)
    const occuper = await getOccuperByLocataire(idLocataire);
    const message = "L'occupation de ce locataire ont bien été trouvé."
    res.send(success(message,occuper))
});


router.post('/add', async (req, res) => {
    const { NumeroAppartement, NumeroLocataire, Date_Debut,Date_Fin } = req.body  ;
    await addOccuper(NumeroAppartement, NumeroLocataire, Date_Debut,Date_Fin);
    res.send(`La location a été ajouté avec succès !`);
});


module.exports = router;
