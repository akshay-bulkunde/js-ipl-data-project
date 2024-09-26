const fs = require('fs');
const deliveries = require('../data/jsonData/deliveries.json');

function findMostDismissedPlayerByBowler(deliveries) {
    let bowlerStats = {};


    for (let index in deliveries) {
        let delivery = deliveries[index];
        let dismissed_kind = delivery["dismissal_kind"];

        if (dismissed_kind !== null && dismissed_kind !== "run out" && dismissed_kind !== "hit wicket" && dismissed_kind !== "retired hurt") {
            let player_dismissed = delivery["player_dismissed"];
            let bowler = delivery["bowler"];

            if (!bowlerStats.hasOwnProperty(bowler)) {
                bowlerStats[bowler] = { [player_dismissed]: { dismissals: 1 } };
            } else {
                if (!bowlerStats[bowler].hasOwnProperty(player_dismissed)) {
                    bowlerStats[bowler][player_dismissed] = { dismissals: 1 };
                } else {
                    bowlerStats[bowler][player_dismissed]["dismissals"] += 1;
                }
            }
        }
    }

    let highestDismissals = [];


    for (let bowler in bowlerStats) {
        let batsmen = bowlerStats[bowler];

        for (let batsman in batsmen) {
            let dismissals = batsmen[batsman]["dismissals"];
            highestDismissals.push({ bowler: bowler, batsman: batsman, dismissals: dismissals });
        }
    }

    highestDismissals.sort((a, b) => b.dismissals - a.dismissals);

    return highestDismissals[0];
}

const highestDismissals = findMostDismissedPlayerByBowler(deliveries);

try {
    fs.writeFileSync('../public/output/topDismissalPair.json', JSON.stringify(highestDismissals, null, 2));
    console.log("File parsed successfully");
}
catch (error) {
    console.log("File parsing failed ", error);
}


module.exports = { findMostDismissedPlayerByBowler }
