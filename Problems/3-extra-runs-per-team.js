// Extra runs conceded per team in the year 2016
const matches = require("../csvToJson/matches.json");
const deliveries = require("../csvToJson/deliveries.json");

function get2016matchesId(matches) {
  let matchID = [];
  for (let match in matches) {
    let season = matches[match]["season"];
    let id = matches[match]["id"];
    // console.log(id);
    // break;
    // console.log(year);
    // break;
    if (season === 2016) {
      matchID.push(id);
    }
  }
  return matchID;
}

let matchId = get2016matchesId(matches);
// console.log(matchId);

function extraRunsPerTeam(deliveries, matchId) {
  // console.log(matchId[0]);
  // break;
  //let id = matchId[i];
  let extraRunConceded = {};
  for (let delivery in deliveries) {
    if (matchId.includes(deliveries[delivery]["match_id"])) {
      let bowlingTeam = deliveries[delivery]["bowling_team"];
      let extraRuns = deliveries[delivery]["extra_runs"];
    //   console.log(bowlingTeam);
    //   console.log(extraRuns);
    //   break;
        if(!extraRunConceded.hasOwnProperty(bowlingTeam )){
            extraRunConceded[bowlingTeam] = extraRuns;
        }
        else{
            extraRunConceded[bowlingTeam ] += extraRuns;
        }
    }
  }
  return extraRunConceded;
}

console.log(extraRunsPerTeam(deliveries, matchId));
