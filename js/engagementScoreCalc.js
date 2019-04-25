/* PSUESDO CODE

  // I want to take the entry data and compare it to the ideal case,
      // The ideal case is 33%-33%-33%-0%-0%

33 33 33 0 0 = 0
and
50 20 10 10 10
equals
17 13 23 10 10 = 73


0 0 0 50 50
equals
33 33 33 50 50 = 200 MAXIMUM POSSIBLE DIFFERENCE


// so you need to write a function that calculates the
// total difference between optimal and given and return score
      // 205 will give a score of 0
      // 0 will give a score of 100

100 / 200 = .5

so the score will equal 100 - the total difference times .5

*/

"use strict";

const engagementScoreCalc = (data) => {
const deviation = (Math.abs(data.yellow.percentage - 33)
                  + Math.abs(data.blue.percentage - 33)
                  + Math.abs(data.green.percentage - 33)
                  + data.lightGreen.percentage
                  + data.fadedBlue.percentage
                  )
const engagementScore = (100 - deviation / 2)

return engagementScore
}

module.exports = engagementScoreCalc;
