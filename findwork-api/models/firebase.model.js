var Promise = require('promise');
var admin = require('firebase-admin');
var serviceAccount = require('./../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://findwork-5d518.firebaseio.com'
});

module.exports = {
    getAccessToken: function () {
        return new Promise(function (resolve, reject) {
            admin.database().ref('/userProfile').on("value", function (snapshot) {
                resolve(snapshot.val());
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
        })
    }
}