// THIS WILL RETURN THE FINAL DATA OBJECT COMPILES FROM ALL OF THE SECTIONS
"use strict";

class EntryData {
  constructor(num1,num2,num3,num4,num5,num6,num7,num8,num9,num10){
    this.yellow                  = {}
    this.green                   = {}
    this.blue                    = {}
    this.lightGreen              = {}
    this.fadedBlue               = {}
    this.yellow.amount           = num1;
    this.green.amount            = num2;
    this.blue.amount             = num3;
    this.lightGreen.amount       = num4;
    this.fadedBlue.amount        = num5;
    this.yellow.percentage       = num6;
    this.green.percentage        = num7;
    this.blue.percentage         = num8;
    this.lightGreen.percentage   = num9;
    this.fadedBlue.percentage    = num10;
  }
}

const compileData = () => {

const entryData = new EntryData(0,0,0,0,0,0,0,0,0,0)
let totalSentences = 0;

sectionsArray.forEach(function(section)=>{
  entryData.yellow.amount += section.data.yellow.amount;
  entryData.blue.amount += section.data.blue.amount;
  entryData.green.amount += section.data.green.amount;
  entryData.fadedBlue.amount += section.data.fadedBlue.amount;
  entryData.lightGreen.amount += section.data.lightGreen.amount;
})
  totalSentences = (entryData.yellow.amount + entryData.green.amount +
                    entryData.blue.amount + entryData.lightGreen.amount +
                    entryData.fadedBlue.amount)

  entryData.yellow.percentage = Math.round((entryData.yellow.amount / totalSentences) * 100)
  entryData.blue.percentage = Math.round((entryData.blue.amount / totalSentences) * 100)
  entryData.green.percentage = Math.round((entryData.green.amount / totalSentences) * 100)
  entryData.fadedBlue.percentage = Math.round((entryData.fadedBlue.amount / totalSentences) * 100)
  entryData.lightGreen.percentage = Math.round((entryData.lightGreen.amount / totalSentences) * 100)

console.log(entryData);

return entryData
}


module.exports = compileData();
