const express = require('express');
const router = express.Router();
const { favoriteCtrl } = require('../controllers');


router.get('/', favoriteCtrl.readAll);
router.get('/:pokeName', favoriteCtrl.readOne);
router.post('/', favoriteCtrl.create);
router.put('/:id', favoriteCtrl.updateOne);
router.delete('/', favoriteCtrl.deleteOne);


module.exports = router