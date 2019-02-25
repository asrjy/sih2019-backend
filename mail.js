var nodemailer = require('nodemailer');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var jsonxml = require('jsontoxml');
var fs = require('fs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// define a route that will send email
   app.post('/send-email', function(req, res) {

   //Here you can access req parameter
      var body  = req.body;

      console.log(req.body.message);
       //WRITE HERE ALL CODE THAT IS RESPONSIBLE FOR SENDING EMAI
       const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'maribel.kuphal46@ethereal.email',
        pass: 'UwAJhY8MxBSSHxv4dg'
    }
});

       var mailOptions = {
       from: 'maribel.kuphal46@ethereal.email',
       to: 'sanath@gmail.com',
       subject: "HELLO",
       html: req.body.message,

       }

       transporter.sendMail(mailOptions, function(err, res){
       if(err){
           console.log('Mail not sent');
       } else {
           console.log('Mail sent');
       }

       });

});
//listen for call events

app.get('/makecall', function(req, res) {
  var name = req.param('name');
  var date = req.param('date');
  var amount = req.param('amount');
  makeCall(name,date,amount);
});

function makeCall(name,date,amount){


  var xml = jsonxml({
      Response:[
          {name:'Say',attrs:'voice="alice"',text:name},
          {name:'Say',attrs:'voice="alice"',text:"your pending loan amount is Rupees"},

          {name:'Say',attrs:'voice="alice"',text:amount},{name:'Say',attrs:'voice="alice"',text:"and due date is"},
          {name:'Say',attrs:'voice="alice"',text:date},

      ],
  })

  fs.writeFile('temp.xml', xml, function(err, data){
      if (err) console.log(err);
      console.log("Successfully Written to File.");
  });

  console.log(xml);}

// listen for all incoming requests
app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});
