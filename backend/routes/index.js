var express = require('express');
var router = express.Router();
const bunyan = require('bunyan');
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/sendmail', function(req, res, next) {
  var email = req.body.email
  var name = req.body.name
  var message = req.body.meassage
  
  res.redrect('http://lakeoconeesinclairguideservices.com', { title: 'Express' });
});)



function sendAlert(alert, recipient){

    'use strict';



// Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `${config.emailAddress}`,
            pass:  `${config.emailPassword}`
        },
        logger: bunyan.createLogger({
            name: 'nodemailer'
        }),
        debug: true // include SMTP traffic in the logs
    }, {
        // default message fields

        // sender info
        from: `${config.emailAddress}`
    });

    console.log('SMTP Configured');
    let message = {
        // Comma separated list of recipients
        to: `${recipient}`,
        // Subject of the message
        subject: 'Nintendo Switch Stock Alert', //
        // plaintext body in case an old email client
        text: `${alert}`,
        // HTML body
        html: `<p>${alert}</p>`,
        // Apple Watch specific HTML body
        watchHtml: '',

        // An array of attachments
        attachments: [


        ]
    };

    console.log('Sending Mail');
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });
}

module.exports = router;
