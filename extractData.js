// THIS WILL CREATE A BASIC DATA OBJECT FOR EACH SECTION
"use strict";

class SectionData {
  constructor(num1,num2,num3,num4,num5){
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
  }
}

const extractData = (analysis)=>{
  const sectionData = new SectionData(0,0,0,0,0);

  analysis.analysis.forEach((sentence)=>{
      if (sentence.sections[0].section_type === "yellow_thing"){
        sectionData.yellow.amount += 1;
      } else if (sentence.sections[0].section_type === "light_blue_thing"){
        sectionData.blue.amount += 1;
      } else if (sentence.sections[0].section_type === "dark_green_thing"){
        sectionData.green.amount += 1;
      } else if (sentence.sections[0].section_type === "faded_blue_thing"){
        sectionData.fadedBlue.amount += 1;
      } else if (sentence.sections[0].section_type === "light_green_thing"){
        sectionData.lightGreen.amount += 1;
      }
      })
      console.log(sectionData);

  return sectionData
}

module.exports = extractData();
