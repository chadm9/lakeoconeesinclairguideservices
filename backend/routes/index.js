var express = require('express');
var router = express.Router();
const bunyan = require('bunyan');
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/sendmail', function(req, res) {
  var email = req.body.email;
  var name = req.body.name;
  var clientMessage = req.body.message;
  var phone = req.body.phone;

  relayMessage(name, email, phone, clientMessage);
  //res.redirect('http://lakeoconeesinclairguideservices.com/')
  
});



function relayMessage(name, email, phone, clientMessage){

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

    //console.log('SMTP Configured');
    let message = {
        // Comma separated list of recipients
        to: `rogermckee9@yahoo.com`,
        // Subject of the message
        subject: 'Website Contact Form Message Received', //
        // plaintext body in case an old email client
        text: `Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message ${clientMessage}`,
        // HTML body
        html: `<p>Name: ${name} <br>
                Email: ${email} <br>
                Phone: ${phone} <br>
                Message: ${clientMessage}</p>`,
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
