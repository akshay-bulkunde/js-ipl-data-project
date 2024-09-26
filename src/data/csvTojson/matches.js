const {csvToJson} = require('../utilities/csvTojson.js');  

const matchesJson = csvToJson('/home/hp/Desktop/IPL-Project-akshay/src/data/csvfiles/matches.csv');
if (matchesJson) {
    const fs = require('fs');
    fs.writeFileSync('matches.json', JSON.stringify(matchesJson, null, 2));  
}