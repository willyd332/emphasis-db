const axios = require('axios');
const url = 'https://emphasis.ai/api/analysis_1/';
const chunkArray = ;//This is the array of chunks that we're pulling from
const chunk = ;//This is the chunk we want analyzed
axios.defaults.headers.post['Content-Type'] = 'application/json';

//We need a for loop that will loop through the chunks chunkArray
//We need to post each chunk as it appears
//We need to capture a response from the api
//We need to send that response to the function that is constituting the data
//We need to stop the function when the chunkArray is empty

// const analyzeData = (chunkArray, index = 0) => {
//   while(chunkArray.length != 0) {
//     axios.post(url, {
//       input: chunkArray[index]
//     })
//     .then(function (response) {
//       //log the response
//       let capturedData = response
//       chunkArray.splice(chunkArray[index], 1);
//       index++
//       analyzeData(chunkArray, index);
//     })
//     .catch(function, (error) {
//       console.log(error);
//     })
//   }
// }

// USER WILL INPUT AN ENTRY

Entry.create({'all of the basic data goes here...req.body.rawString, req.body.author, req.body.type, req.body.title, etc...'})
// ALL OF THE BELOW WILL BE A CALLBACK
const sectionsArray = stringParser(req.body.rawString)

const apiCall = (index = 0) => {
  if (index === sectionsArray.length){
    return
  }
    axios.post(url, {
      input: sectionsArray[index].text
    })
    .then(function (response) {
      //log the response
      sectionsArray[index].analysis = response;
      apiCall(index++);
    })
    .catch(function, (error) {
      console.log(error);
    })
}

sectionsArray.forEach(function(section)=>{
  section.data = extractData(section.analysis);
})

const entryData = compileData(sectionsArray)

const engagementScore = engagementScoreCalculator(entryData)

Entry.findByIdAndUpdate(entryId, {text: sectionsArray, data: entryData, engagementScore: engagementScore}, {new: true}, (err, updated)=>{
  if (err) {
    console.log(err);
  } else {
    res.render('some page')
  }
})
// FINALLY WE RENDER THEIR PAGE

/**
const analyzeData = (chunkArray, index = 0) => {
  axios.post(url, {
    input: chunkArray[index]
  })
  .then(function (response) {
    let capturedData = response
  })
  .catch(function, (error) {
    console.log(error);
  })
  chunkArray.splice(chunkArray[index], 1);
  index++
  analyzeData(chunkArray, index);
}


const analyzeData = (chunkArray) => {
  for(let i = 0; i < chunkArray.length; i++) {
    axios.post(url, {
      input: chunkArray[i]
    })
    .then(function (response) {
      let capturedData = response
    })
    .catch(function, (error) {
      console.log(error);
    })
  }
}
**/
