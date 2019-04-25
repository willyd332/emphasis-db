"use strict";

class Section {
  constructor(str) {
    this.text = str;
    this.analysis = {};
    this.data = {};
  }
}

const stringParser = (str) => {

  const sectionArr = [];
  const string = str.replace(/\"/g, "\'");

  const rStringParser = (string, index = 0) => {
    if ((string.length - index) < 2000) {
      let finalString = "";
      for (let i = index; i < string.length; i++) {
        finalString += string[i];
      }
      if (finalString.length > 0) {
        sectionArr.push(new Section(finalString));
      }
      return sectionArr
    }

    let sectionString = "";
    let x = (index + 1999);
    while (string[x] !== '.' && string[x] !== '?' && string[x] !== '!' && x !== index) {
      x--
    }

    if (x === index) {
      x = (index + 1999);
    }

    for (let i = index; i <= x; i++) {
      sectionString += string[i];
    }
    sectionArr.push(new Section(sectionString));

    return rStringParser(string, index = (x + 1))
  }

  return rStringParser(string);
}

module.exports = stringParser;
