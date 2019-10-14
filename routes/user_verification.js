const router = require('express').Router();
const UserCredentials = require('../datamodels/user_credentials');
const mailVerification = require('../datamodels/mail_verification_token');


router.get('/confirm/:id', function (request, response) {

    mailVerification.findOneAndDelete({token: request.params.id}, function (err, user) {
        if (err) {
            console.log(err);
            return response.json({
                status: 'failure',
                message: 'invalid link'
            })
        }
        UserCredentials.findOneAndUpdate({userId: user.userId}, {isVerified: true}, function (err) {
            if (err) {
                console.log(err);
            }
            return response.json({
                status: 'success',
                message: 'email verified'
            })
        });
    });
});

module.exports = router;