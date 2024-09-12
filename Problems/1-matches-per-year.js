// Number of matches played per year for all the years in IPL.
const matchesData = require('../csvToJson/matches.json');

function matchesPerYear(matchesData ){
    let matchesPerYearObj = {};
    for(let match in matchesData){
        // console.log(matchesData[match]);
        // break;
        let season = matchesData[match].season;
        if(season === undefined){
            return matchesPerYearObj;
        }
        // console.log(season);
        // break;
        if(!matchesPerYearObj.hasOwnProperty(season)){
           
            matchesPerYearObj[season] = 1;
        }else{
            matchesPerYearObj[season] = matchesPerYearObj[season] + 1;
        }
        
    }
    return matchesPerYearObj
}

// module.exports = {matchesPerYear};
console.log(matchesPerYear(matchesData))