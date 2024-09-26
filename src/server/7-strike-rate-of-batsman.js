const fs = require('fs');
const deliveries = require('../data/jsonData/deliveries.json');
const matches = require('../data/jsonData/matches.json');

function getBatsmanStrikeRatePerSeason(matches, deliveries) {
    let matchSeasonMap = {};

    for (let index in matches) {
        let match = matches[index];
        let id = match["id"];
        matchSeasonMap[id] = match["season"];
    }

    let batsmanStats = {};


    for (let index in deliveries) {
        let delivery = deliveries[index];
        let season = matchSeasonMap[delivery["match_id"]];
        let batsmanName = delivery["batsman"];

        if (!batsmanStats.hasOwnProperty(season)) {
            batsmanStats[season] = {};
        }

        if (!batsmanStats[season].hasOwnProperty(batsmanName)) {
            batsmanStats[season][batsmanName] = { runs: 0, ballsFaced: 0 };
        }

        let runs = delivery["batsman_runs"];
        batsmanStats[season][batsmanName]["runs"] += runs;

        if (delivery["wide_runs"] === 0 && delivery["noball_runs"] === 0) {
            batsmanStats[season][batsmanName]["ballsFaced"] += 1;
        }
    }

    let batsmanStrikeRate = {};
    for (let season in batsmanStats) {
        batsmanStrikeRate[season] = [];
        for (let batsmanName in batsmanStats[season]) {
            const { runs, ballsFaced } = batsmanStats[season][batsmanName];
            let strikeRate = parseFloat(((runs / ballsFaced) * 100).toFixed(2));
            batsmanStrikeRate[season].push({
                batsman: batsmanName,
                Sr: strikeRate
            })
        }
    }
    return batsmanStrikeRate;
}
let batsmanStrikeRate = getBatsmanStrikeRatePerSeason(matches, deliveries)

try {
    fs.writeFileSync('../public/output/batsmanStrikeRatePerSeason.json', JSON.stringify(batsmanStrikeRate, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}


module.exports = { getBatsmanStrikeRatePerSeason }

