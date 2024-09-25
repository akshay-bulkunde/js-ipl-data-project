// Number of matches played per year for all the years in IPL.
const fs = require('fs');
const matchesData = require('../../csvToJson/matches.json');

function matchesPerYear(matchesData) {
    let matchesPerYear = {};
    for (let match in matchesData) {

        let season = matchesData[match].season;
        if (season === undefined) {
            return matchesPerYear;
        }

        if (!matchesPerYear.hasOwnProperty(season)) {

            matchesPerYear[season] = 1;
        } else {
            matchesPerYear[season] = matchesPerYear[season] + 1;
        }

    }
    return matchesPerYear
}

let matchesPerYearData = matchesPerYear(matchesData);

try {
    fs.writeFileSync('../public/output/matchesPerYear.json', JSON.stringify(matchesPerYearData, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}

module.exports = { matchesPerYear };