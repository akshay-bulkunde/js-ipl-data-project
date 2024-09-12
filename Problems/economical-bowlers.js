//Top 10 economical bowlers in the year 2015

const matches = require('../csvToJson/matches.json');
const deliveries = require('../csvToJson/deliveries.json');


function get2015matchId(matches){
    let matchId = [];
    for(let match in matches){
        let season = matches[match]["season"];
        // console.log(season);
        // break;
        // console.log(match["id"]);
        if(season === 2015){
            matchId.push(matches[match]["id"]);
        }
    }
    return matchId;
}
let matchID = get2015matchId(matches);
function getTopEconomicalBowlers(deliveries , matchID){
    let economicalBowlers = {};
    for(let delivery in deliveries){
        let matchId = deliveries[delivery]["match_id"];
        if(matchID.includes(matchId)){
            let bowlerName = deliveries[delivery["bowler"]];
            let runConceded = deliveries[delivery]
        }
    }

}