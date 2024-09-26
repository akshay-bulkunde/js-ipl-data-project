const {csvToJson} = require('../utilities/csvTojson.js');  

const deliveriesJson = csvToJson('/home/hp/Desktop/IPL-Project-akshay/src/data/csvfiles/deliveries.csv');
if (deliveriesJson) {
    const fs = require('fs');
    fs.writeFileSync('deliveries.json', JSON.stringify(deliveriesJson, null, 2));  
}