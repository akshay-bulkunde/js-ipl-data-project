// Find the number of times each team won the toss and also won the match

const matches = require('../csvToJson/matches.json');

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

console.log(wonTheTossWonTheMatch(matches));