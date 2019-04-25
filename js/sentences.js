"use strict";

class Sentence {
  constructor(string,color){
    this.text  = string;
    this.color = color
  }
}


const sentenceArrayMaker = (array) => {
  const sentenceArray = []
  array.forEach((paragraph)=>{
    paragraph.analysis.analysis.forEach((sentenceString)=>{
      sentenceString.sections.forEach((sectionString)=>{
        let sentence = new Sentence('','');

        console.log(sectionString.section_type);

        if (sectionString.section_type === 'yellow_thing'){
          sentence.color = 'yellow';
        } else if (sectionString.section_type === 'light_blue_thing'){
          sentence.color = 'lightBlue';
        } else if (sectionString.section_type === 'dark_blue_thing'){
          sentence.color = 'darkBlue';
        } else if (sectionString.section_type === 'dark_green_thing'){
          sentence.color = 'green';
        } else if (sectionString.section_type === 'faded_blue_thing'){
          sentence.color = 'fadedBlue';
        } else if (sectionString.section_type === 'light_green_thing'){
          sentence.color = 'lightGreen';
        }

        for (let i = sectionString.index_begin; i <= sectionString.index_end; i++){
          sentence.text += paragraph.text[i]
        }
        sentenceArray.push(sentence);

      })
    })
  })


  return sentenceArray
}


module.exports = sentenceArrayMaker;
