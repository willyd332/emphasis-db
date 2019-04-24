/* PSUESDO CODE

// Create Class Section {
                  constructor(string){
                  this.textSection: string
                  }
                  Analysis:{}
                  }

// Create Empty Array []

// Take in string

// Replace all "" with ''

// Take the first 2000 characters of the string
// (or until the end of the string)
      // If the last character is a period:
                // Record index number
                // create new Section with string
                // push Section into array
      // If the last character is not a period:
                // Move backwards until the closest period
                // Record index number
                // create new Section with string
                // push Section into array

// Repeat the process with the 2000 characters following
// the recorded index of the period (or until the end of the string)

// Return array of objects

*/

"use strict";

class Section {
  constructor(str) {
    this.text     = str;
    this.analysis = {};
  }
}

const stringParser = (str) => {

const sectionArr = [];
const string = str.replace(/\"/g,"\'");

    const rStringParser = (string, index = 0)=>{
      if ((string.length - index) < 2000){
        let finalString = "";
        for (let i = index; i < string.length; i++){
          finalString += string[i];
        }
        if (finalString.length > 0){
        sectionArr.push(new Section(finalString));
        }
        return sectionArr
      }

      let sectionString = "";
      let x = (index + 1999);
      while (string[x]!== '.' && x !== index){
        x--
      }

      if (x === index) {
         x = (index + 1999);
      }

      for (let i = index; i <= x; i++){
        sectionString += string[i];
      }
      sectionArr.push(new Section(sectionString));

      return rStringParser(string,index = (x + 1))
    }

    return rStringParser(string);
}

module.exports = stringParser();
