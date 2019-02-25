var jsonxml = require('jsontoxml');
var fs = require('fs');


var name = "sanath";
var amount =10000;
var date = "10th feb";
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

console.log(xml);
