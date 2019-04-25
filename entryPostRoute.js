"use strict";

const stringParser         = require('js/stringParser')
const extractData          = require('js/extractData')
const compileData          = require('js/compileData')
const engagementScoreCalc  = require('js/engagementScoreCalc')
const axios        = require('axios');
const url          = 'https://emphasis.ai/api/analysis_1/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const apiCall = (array, index = 0) => {
  if (index === array.length){
    return
  }
    axios.post(url, {
      input: array[index].text
    })
    .then(function (analysis) {
      array[index].analysis = analysis;
      apiCall(index++);
    })
    .catch(function, (error) {
      console.log(error);
    })
}


router.post('/entries', async (req,res)=>{

try {
  const newEntry = await Entry.create({
      userId: req.session.currUserId,
      author: req.body.author,
      title: req.body.title,
      link: req.body.link,
      string: req.body.string,
      publicationYear: req.body.publicationYear,
      contentType: req.body.contentType,
      publisher: req.body.publisher,
      text: [],
      data: {},
      engagementScore: null
  });

  const sectionsArray = stringParser(req.body.string);
  await apiCall(sectionsArray);
  sectionsArray.forEach(function(section)=>{
    section.data = extractData();
  })
  const entryData = compileData()

  const engagementScore = engagementScoreCalc()

  const updatedEntry = await Entry.findByIdAndUpdate({newEntry._id},{
    text: sectionArr,
    data: entryData,
    engagementScore: engagementScore
  }, {new: true})

  res.render('entries/show.ejs', {
    entry: updatedEntry
  })

} catch (err) {
  res.send(err);
}

})
