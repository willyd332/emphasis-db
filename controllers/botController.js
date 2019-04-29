const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const axios = require('axios');
const Article = require('newspaperjs').Article;
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Entry = require('../models/entrySchema');
const stringParser = require('../js/stringParser')
const extractData = require('../js/extractData')
const compileData = require('../js/compileData')
const sentenceArrayMaker = require('../js/sentences')
const engagementScoreCalc = require('../js/engagementScoreCalc')
const url = 'https://emphasis.ai/api/analysis_1/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const apiCall = async (array) => {
  for (let i = 0; i < array.length; i++) {
    await axios
      .post(url, {
        input: array[i].text
      })
      .then((analysis) => {
        array[i].analysis = analysis.data;
      })
  }
  return array
}
const getYear = (string) => {
  let newString = ''
  for (let i = 0; i < 4; i++){
    newString += string[i]
  }
  const number = parseInt(newString)
  return number
}
const stringSanitizer = (str) => {
    //Sanitizes a string by getting rid of all stuff like:
    //HTML tags
    //URLs
    //curly brackets, straight brackets, and their contents
    //The following characters: ~, #, @, $, %, ^, _, +, =
    //Character combinations like $(, (), {}, [], :\, :/, ~/, etc

    let tempstr1;
    let tempstr2;
    let j;
    let changed = false;

    for (let i = 0; i < str.length; i++)
    {
        if (i < str.length - 1)
        {
            switch (str[i] + str[i + 1])
            {
                case '$(': //These are all two-character combinations
                case '()':
                case '{}':
                case '[]':
                case ':\\':
                case ':/':
                case '~/':
                    tempstr1 = str.slice(0, i);
                    tempstr2 = str.slice(i + 2, str.length);
                    str = tempstr1.concat(tempstr2);
                    changed = true;
                    break;
            }
        }

        if (i < str.length - 7);
        {
            switch (str[i] + str[i + 1] + str[i + 2] + str[i + 3] + str[i + 4] + str[i + 5] + str[i + 6])
            {
                case 'http://':
                case 'https:/':
                    //Find the end of the URL:
                    j = i;
                    while (str[j] != ' ' && j < str.length) {j++;}
                    tempstr1 = str.slice(0, i);
                    tempstr2 = str.slice(j, str.length);
                    str = tempstr1.concat(tempstr2);
                    changed = true;
                    break;
            }
        }
        switch (str[i])
        {
            case '~': //These will be for removing a single problematic character
            case '#':
            case '@':
            case '$':
            case '%':
            case '^':
            case '_':
            case '+':
            case '=':
            case '}': //closing brackets just off by themselves for some reason
            case ']':
            case '>':
                tempstr1 = str.slice(0, i);
                tempstr2 = str.slice(i + 1, str.length);
                str = tempstr1.concat(tempstr2);
                changed = true;
                break;
            case '{': //opening brackets or HTML tags
            case '[':
            case '<':
                //Find the end of the brackets:
                j = i;
                while (!(str[j] == ']' || str[j] == '}' || str[j] == '>') && j < str.length) {j++;}
                tempstr1 = str.slice(0, i);
                tempstr2 = str.slice(j, str.length);
                str = tempstr1.concat(tempstr2);
                changed = true;
                break;
        }

    }

    if (changed) {return stringSanitizer(str);}
    else {return str;}
}

router.get('/googlenews', async (req,res)=>{
  if (req.params.password === "iamadmin"){

    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=b6ae8688af7b4d5aae22e0dc8c4fa6f3')

      const topHeadlines = await response.data.articles;

      const arrayCreated = [];

      for (let i = 0; i < topHeadlines.length; i++){

        if (topHeadlines[i].source.name !== "Newsweek") {

        let result = await Article(topHeadlines[i].url)
        let publicationYear = getYear(topHeadlines[i].publishedAt)
        let sanitizedString = stringSanitizer(result.text)


// THIS IS THE SCHEMA, DONT CHANGE THE STRUCTURE

        const newEntry = await Entry.create({
          userId: "BOT USER",
          // author: "BOT USER",
          author: topHeadlines[i].author,
          title: topHeadlines[i].title,
          link: topHeadlines[i].url,
          string: sanitizedString,
          publicationYear: publicationYear,
          contentType: 'news',
          publisher: topHeadlines[i].source.name,
          text: [],
          data: {},
          sentences: [],
          engagementScore: null
        });

// THE STUFF BELOW THIS LINE IS DATABASE STUFF, YOU DO NOT NEED TO TOUCH IT

        let sectionsArray = stringParser(newEntry.string);
        sectionsArray = await apiCall(sectionsArray);
        sectionsArray.forEach((section) => {
          section.data = extractData(section);
        })
        const entryData = compileData(sectionsArray)

        const engagementScore = engagementScoreCalc(entryData)

        const updatedEntry = await Entry.findByIdAndUpdate(newEntry._id, {
          text: sectionsArray,
          data: entryData,
          engagementScore: engagementScore
        }, {
          new: true
        })

        arrayCreated.push(updatedEntry);
        }
      }

      res.render('bots/index.ejs', {
        entries: arrayCreated
      })

    } catch (err) {
      res.send(err)
    }
  } else {
    res.send("access denied")
  }
})



module.exports = router;



/*
const express = require('express');
const axios = require('axios');
const Article = require('newspaperjs').Article;

class Entry {
  constructor(publication, title, author, link, content, year) {
    this.publication = publication;
    this.title = title;
    this.author = author;
    this.link = link;
    this.content = content;
    this.year = year
  }
}

let topHeadlines;
let targetUrl;
const newsCall = () => {
  axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=b6ae8688af7b4d5aae22e0dc8c4fa6f3')
    .then(function(response) {
      topHeadlines = response.data.articles;
      const scrapeArticle = (index = 0) => {
        if (index < topHeadlines.length) {
          if (topHeadlines[index].source.name !== "Newsweek") {
            targetUrl = topHeadlines[index].url;
            Article(targetUrl)
              .then(result => {
                const newEntry = new Entry(
                  publication = topHeadlines[index].source.name,
                  title = topHeadlines[index].title,
                  author = topHeadlines[index].author,
                  link = topHeadlines[index].url,
                  content = result.text,
                  year = topHeadlines[index].publishedAt
                )
                console.log(newEntry);
                index++;
                scrapeArticle(index);
              }).catch(reason => {
                console.log(reason);
              })
          } else {
            index++;
            scrapeArticle(index);
          }
        } else {
          console.log("End of articles");
          return
        }
      }
      scrapeArticle();
    })
    .catch(function(error) {
      console.log(error);
    })
}

newsCall();
*/


/*
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
    sentences: [],
    engagementScore: null
  });

  let sectionsArray = stringParser(req.body.string);
  sectionsArray = await apiCall(sectionsArray);
  sectionsArray.forEach((section) => {
    section.data = extractData(section);
  })
  const entryData = compileData(sectionsArray)

  const engagementScore = engagementScoreCalc(entryData)

  const updatedEntry = await Entry.findByIdAndUpdate(newEntry._id, {
    text: sectionsArray,
    data: entryData,
    engagementScore: engagementScore
  }, {
    new: true
  })
  const id = updatedEntry._id;
  res.redirect(`entries/${id}`)

} catch (err) {
  console.log(err);
  res.send(err);
}
*/
