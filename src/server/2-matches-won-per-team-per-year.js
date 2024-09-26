// Number of matches won per team per year in IPL.
const fs = require('fs');
const matches = require("../data/jsonData/matches.json");

function matchesWonPerTeam(matches) {
  let matchesWonPerYear = {};


  for (let match in matches) {

    let season = matches[match].season;
    if (season === undefined) {
      return matchesWonPerYear;
    }
    
    let winner = matches[match].winner;
    if (!matchesWonPerYear.hasOwnProperty(season)) {
      matchesWonPerYear[season] = {};
    }
    if (!matchesWonPerYear[season].hasOwnProperty(winner)) {

      matchesWonPerYear[season][winner] = 1;
    }
    else {
      matchesWonPerYear[season][winner] = matchesWonPerYear[season][winner] + 1;
    }


  }
  return matchesWonPerYear;
}

let matchesWonPerYearPerTeam = matchesWonPerTeam(matches);
try {
  fs.writeFileSync('../public/output/matchesWonPerYearPerTeam.json', JSON.stringify(matchesWonPerYearPerTeam, null, 2));
  console.log("File parsed successfully");
}
catch (error) {
  console.log("File parsing failed ", error);
}

module.exports = { matchesWonPerTeam }
