const accountSid = 'ACe7faaeafde1aafc4c694f3b68c1035bc';
const authToken = 'fc81ae82e6c7469051947bc5c72a6225';
const client = require('twilio')(accountSid, authToken);

client.calls
      .create({
         url: 'https://sanathswaroop.com/call.xml',
         to: '+918790682297',
         from: '+919392848111'
       })
      .then(call => console.log(call.sid));
