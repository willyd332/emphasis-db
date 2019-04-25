/* PSUESDO CODE

  // I want to take the entry data and compare it to the ideal case,
      // The ideal case is 33%-33%-33%-0%-0%

33 33 33 0 0 = 0

and
50 20 10 10 10
equals
17 13 23 10 10 = 73

and
10 10 10 35 35
equals
23 23 23 35 35 = 139

and
0 0 0 50 50
equals
35 35 35 50 50 = 205 MAXIMUM POSSIBLE DIFFERENCE


// so you need to write a function that calculates the
// total difference between optimal and given and return score
      // 205 will give a score of 0
      // 0 will give a score of 100

100 / 205 = .4878

so the score will equal 100 - the total difference time .4878 (.5 for Ux)

*/

"use strict";

const engagementScore = () => {
const deviation = (Math.abs(entryData.yellow.percentage - 33)
                  + Math.abs(entryData.blue.percentage - 33)
                  + Math.abs(entryData.green.percentage - 33)
                  + entryData.lightGreen.percentage
                  + entryData.fadedBlue.percentage
                  )
const engagementScore = (100 - deviation / 2)

return engagementScore
}

module.exports = engagementScore();
