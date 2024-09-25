// Extra runs conceded per team in the year 2016
const fs = require('fs');
const matches = require("../../csvToJson/matches.json");
const deliveries = require("../../csvToJson/deliveries.json");

function getmatchesId(matches) {
  let matchID = [];
  for (let match in matches) {
    let season = matches[match]["season"];
    let id = matches[match]["id"];

    if (season === 2016) {
      matchID.push(id);
    }
  }
  return matchID;
}

let matchId = getmatchesId(matches);

function extraRunsPerTeam(deliveries, matchId) {

  let extraRunConceded = {};
  for (let delivery in deliveries) {
    if (matchId.includes(deliveries[delivery]["match_id"])) {
      let bowlingTeam = deliveries[delivery]["bowling_team"];
      let extraRuns = deliveries[delivery]["extra_runs"];

      if (!extraRunConceded.hasOwnProperty(bowlingTeam)) {
        extraRunConceded[bowlingTeam] = extraRuns;
      }
      else {
        extraRunConceded[bowlingTeam] += extraRuns;
      }
    }
  }
  return extraRunConceded;
}

let extraRunConceded = extraRunsPerTeam(deliveries, matchId);

try {
  fs.writeFileSync('../public/output/extraRunsPerTeam.json', JSON.stringify(extraRunConceded, null, 2));
  console.log("File parsed successfully");
}
catch (error) {
  console.log("File parsing failed ", error);
}

module.exports = { extraRunsPerTeam };
