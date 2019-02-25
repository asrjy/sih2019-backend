const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const accountSid = 'ACe7faaeafde1aafc4c694f3b68c1035bc';
const authToken = 'fc81ae82e6c7469051947bc5c72a6225';
const client = require('twilio')(accountSid, authToken);


exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Thanks for calling the Payment Recovery Service of MSME ' +
    'Please press 1 for authorizing your payment. ' +
    'Press 2 getting your outstanding amount.',
    {loop: 3}
  );

  return voiceResponse.toString();
};

exports.menu = function menu(digit) {
  const optionActions = {
    '1': authoraizePayments,
    '2': amountDetails,
  };

  return (optionActions[digit])
    ? optionActions[digit]()
    : redirectWelcome();
};

exports.amount = function amount(digit) {
  const optionActions = {
    '9': sayAmount(3000),
    '7': sayAmount(400),
    '2': sayAmount(2000),
  };

  if (optionActions[digit]) {
    const twiml = new VoiceResponse();
    twiml.dial(optionActions[digit]);
    return twiml.toString();
  }

  return redirectWelcome();
};

/**
 * Returns Twiml
 * @return {String}
 */
function authoraizePayments() {


  const twiml = new VoiceResponse();

  twiml.say(
    'Transaction succesfully completed',
    {voice: 'alice', language: 'en-GB'}
  );
  client.messages
      .create({
         body: 'Your transaction has been completed',
         from: '+12513330297',
         to: '+919392848111'
       })
      .then(message => console.log(message.sid));
  twiml.say(
    'Thank you for calling the Payment recovery Services from MSME');

  twiml.hangup();

  return twiml.toString();
}

/**
 * Returns a TwiML to interact with the client
 * @return {String}
 */
 exports.amountDetails = function amountDetails() {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    action: '/ivr/amount',
    numDigits: '1',
    method: 'POST',
  });

  gather.say(
    'Dial your phone number to get the account balance to be paid ',
    {voice: 'alice', language: 'en-GB', loop: 3}
  );

  return twiml.toString();
}

/**
 * Returns an xml with the redirect
 * @return {String}
 */
 function sayAmount(amount){
   const twiml = new VoiceResponse();
   twiml.say(
     'the amount to be paid is Rupees' + amount,
     {voice: 'alice', language: 'en-GB', loop: 3}
   );
 }
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Returning to the main menu', {
    voice: 'alice',
    language: 'en-GB',
  });

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
