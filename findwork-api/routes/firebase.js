var express = require('express');
var router = express.Router();

var FirebaseController = require('./../controllers/firebase.controller');

router.get('/get-token', FirebaseController.getAccessToken);

module.exports = router;    