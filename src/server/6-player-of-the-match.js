//Find a player who has won the highest number of Player of the Match awards for each season.

const matches = require('../csvToJson/matches.json');


function playerOfTheMatch(matches){
    let POTM = {};
    for(let match in matches){
        let season = matches[match]["season"];
        let potm = matches[match]["player_of_match"];

        // console.log(`${season} ${potm}`)
        if(season === undefined || potm === undefined){
            continue;
        }
        if(!POTM.hasOwnProperty(season)){
            POTM[season] = {};
            
        }
        if(!POTM[season].hasOwnProperty(potm)){
            POTM[season][potm] = 1 ;
            // console.log(POTM[season]);
            // break;

        }else{
            POTM[season][potm] += 1;
           
        }
    }
    // return POTM;
    let highestPotmPerSeason ={};
    for(let season in POTM){
        let players = POTM[season];
        let maxTrophy = 0;
        let maxPlayer = null;
        for(let player in players){
            // console.log(player);
            // break;
            // if(player === undefined){
            //     return highestPotmPerSeason;
            // }
            if(players[player] > maxTrophy){
                maxPlayer = player;
                maxTrophy = players[player];


            }
        }
        // console.log(POTM[season]);
        highestPotmPerSeason[season] = {
            player : maxPlayer,
            potm : maxTrophy
        }
    }
    return highestPotmPerSeason;
}
// playerOfTheMatch(matches)
console.log(playerOfTheMatch(matches));