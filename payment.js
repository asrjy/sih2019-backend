var payumoney = require('payumoney-node');
let MERCHANT_KEY="5jJbQJR3";
let MERCHANT_SALT ="xIAnuW1WTh";
let AUTHORIZATION_HEADER = "SNHz/vr+Dh+SmdrTEGDhF7DLSmpej6DiqQRNH9AdRow="
payumoney.setKeys(MERCHANT_KEY, MERCHANT_SALT, AUTHORIZATION_HEADER);
payumoney.isProdMode(false);
var paymentData = {
    productinfo: "nothing",
    txnid: "143",
    amount: "5",
    email: "sanath15swaroop@gmail.com",
    phone: "9392848111",
    lastname: "swaroop",
    firstname: "sanath",
    surl: "http://localhost:3000/payu/success", //"http://localhost:3000/payu/success"
    furl: "http://localhost:3000/pay/failure", //"http://localhost:3000/payu/fail"
};

payumoney.makePayment(paymentData, function(error, response) {
  if (error) {
    // Some error
    console.log(error)
  } else {
    // Payment redirection link
    console.log(response);
  }
});
