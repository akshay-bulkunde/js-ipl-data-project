//Find a player who has won the highest number of Player of the Match awards for each season.
const fs = require('fs');
const matches = require('../../csvToJson/matches.json');


function getTopPlayerOfTheMatchPerSeason(matches) {
    let topPlayersPerSeason = {};

    
    for (let match in matches) {
        
        let season = matches[match]["season"];

        if (!topPlayersPerSeason.hasOwnProperty(season)) {
            topPlayersPerSeason[season] = {};
        }

        let player = matches[match]["player_of_match"];
        if (!topPlayersPerSeason[season].hasOwnProperty(player)) {
            topPlayersPerSeason[season][player] = 0;
        }

        topPlayersPerSeason[season][player] += 1;
    }

    let playerWithMostAwardsPerSeason = {};

   
    for (let season in topPlayersPerSeason) {
        let players = topPlayersPerSeason[season];
        let topPlayer = '';
        let maxTrophy = 0;

        
        for (let player in players) {
            if (players[player] > maxTrophy) {
                maxTrophy = players[player];
                topPlayer = player;
            }
        }

        playerWithMostAwardsPerSeason[season] = { player: topPlayer, trophies: maxTrophy };
    }

    return playerWithMostAwardsPerSeason;
}


let playerWithMostAwardsPerSeason = getTopPlayerOfTheMatchPerSeason(matches)


try {
    fs.writeFileSync('src/public/output/playerWithMostAwardsPerSeason.json', JSON.stringify(playerWithMostAwardsPerSeason, null, 2));
    console.log("File parsed successfully");
  }
  catch (error) {
    console.log("File parsing failed ", error);
  }


module.exports = { getTopPlayerOfTheMatchPerSeason }