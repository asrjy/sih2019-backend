var request = require('request'); //bash: npm install request
// URL for request POST /message
var url = 'https://eu37.chat-api.com/instance27987/message?token=3pl2neezl4i7xvt4';
var data = {
    phone: '918332981498', // Receivers phone
    body: 'Hello, Pussy!', // Сообщение
};
// Send a request
request({
    url: url,
    method: "POST",
    json: data
});
