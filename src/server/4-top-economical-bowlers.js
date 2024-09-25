//Top 10 economical bowlers in the year 2015
const fs = require('fs');
const matches = require('../../csvToJson/matches.json');
const deliveries = require('../../csvToJson/deliveries.json');


function getMatchId(matches) {
    let matchIds = [];
    for (let match in matches) {
        let season = matches[match]["season"];
        if (season === 2015) {
            matchIds.push(matches[match]["id"]);
        }
    }
    return matchIds;
}

let matchIds = getMatchId(matches);

function getTopEconomicalBowlers(deliveries, matchIds) {
    
    let bowlerStats = {};

    for (let match in deliveries) {
        let delivery = deliveries[match];
        let matchId = delivery["match_id"];

        if (matchIds.includes(matchId)) {
            let bowler = delivery["bowler"];
            let runsConceded = delivery["total_runs"] - delivery["legbye_runs"] - delivery["bye_runs"] - delivery["penalty_runs"];

            if (!bowlerStats.hasOwnProperty(bowler)) {
                bowlerStats[bowler] = { runsConceded: 0, balls: 0 };
            }
            bowlerStats[bowler]["runsConceded"] += runsConceded;

            if (delivery["wide_runs"] === 0 && delivery["noball_runs"] === 0) {
                bowlerStats[bowler]["balls"] += 1;
            }
        }
    }

    let topEconomicalBowlers = [];

    for (let bowler in bowlerStats) {
        let runsConceded = bowlerStats[bowler]["runsConceded"];
        let balls = bowlerStats[bowler]["balls"];
        let economy = parseFloat(((runsConceded / balls) * 6).toFixed(2));
        topEconomicalBowlers.push({ bowler: bowler, economy: economy });
    }

    topEconomicalBowlers.sort((a, b) => a.economy - b.economy);

    return topEconomicalBowlers.slice(0, 10);
}

getTopEconomicalBowlers(deliveries, matchIds)

let topEconomicalBowlers = getTopEconomicalBowlers(deliveries, matchIds);

try {
    fs.writeFileSync('src/public/output/economicalBowlers.json', JSON.stringify(topEconomicalBowlers, null, 2));
    console.log("File parsed successfully");
  }
  catch (error) {
    console.log("File parsing failed ", error);
  }


module.exports = { getTopEconomicalBowlers}
