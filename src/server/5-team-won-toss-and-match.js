// Find the number of times each team won the toss and also won the match
const fs = require('fs');
const matches = require('../data/jsonData/matches.json');

function wonTheTossWonTheMatch(matches){
    let teams = {};
    for(let match in matches){
        
        let tossWinner = matches[match]["toss_winner"];
        if(tossWinner === undefined){
            return teams;
        }
        let matchWinner = matches[match]["winner"];

        if(tossWinner  === matchWinner){
            if(!teams.hasOwnProperty(matchWinner)){
                teams[matchWinner] = 1
            }else{
                teams[matchWinner] = teams[matchWinner] + 1;
            }
        }
    }
    return teams;
}

let teams = wonTheTossWonTheMatch(matches);

try {
    fs.writeFileSync('../public/output/wonTheTossWonTheMatch.json', JSON.stringify(teams, null, 2));
    console.log("File parsed successfully");
  }
  catch (error) {
    console.log("File parsing failed ", error);
  }


module.exports = { wonTheTossWonTheMatch }