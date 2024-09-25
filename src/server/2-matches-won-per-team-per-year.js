// Number of matches won per team per year in IPL.

const matches = require("../csvToJson/matches.json");

function matchesWonPerTeam(matches) {
  let matchesWonPerYear = {};
//   let teamObj = {};

  for (let match in matches) {
    
    let season = matches[match].season;
    if(season === undefined){
        return matchesWonPerYear;
    }
    // console.log(season);
    // break;
    let winner = matches[match].winner;
    if (!matchesWonPerYear.hasOwnProperty(season)) {
        matchesWonPerYear[season] = {};
    }
    if(!matchesWonPerYear[season].hasOwnProperty(winner)){
       
        matchesWonPerYear[season][winner] = 1;
    }
     else{
        matchesWonPerYear[season][winner] = matchesWonPerYear[season][winner] + 1;
     }
     
    
  }
  return matchesWonPerYear;
}

console.log(matchesWonPerTeam(matches));
