var express = require('express');
var router = express.Router();
var reserva = require('../data/controllers/reservaController');

router.get('/',reserva.getAll);

router.post('/',);
router.put('/:username', );
router.delete('/:username',);

module.exports = router;