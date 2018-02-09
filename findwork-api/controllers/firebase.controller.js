var FirebaseModel = require('./../models/firebase.model');

module.exports = {
    getAccessToken: function (req, res) {
        FirebaseModel.getAccessToken().then(function (data) {
            res.json(data);
        });
    }
}