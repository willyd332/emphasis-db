/* PSUESDO CODE

// Take in the analysis object, and transmit the data object

// The analysis object looks like this:

{
  'analysis': [
    {
    'sentence': {
          "sent_type": "space",
          "index_begin": 0,
          "index_end": 87
        },
    'sections':
      [
          {
            "section_type": "dark_green_thing",
            "index_begin": 0,
            "index_end": 87
          }
      ],
    'signs': [
            {
                "section_type": "dark_green_thing",
                "sign_type": "Entity",
                "index_begin": 6,
                "index_end": 11
            },
            {
                "section_type": "dark_green_thing",
                "sign_type": "Entity",
                "index_begin": 19,
                "index_end": 27
            },
            {
                "section_type": "dark_green_thing",
                "sign_type": "Entity",
                "index_begin": 35,
                "index_end": 40
            }
            ]
    },

    // then repeats with a new object per sentence.

    {
    'sentence': {
          "sent_type": "space",
          "index_begin": 0,
          "index_end": 87
        },
    'sections':
      [
          {
            "section_type": "dark_green_thing",
            "index_begin": 0,
            "index_end": 87
          }
      ],
    'signs': [
            {
                "section_type": "dark_green_thing",
                "sign_type": "Entity",
                "index_begin": 6,
                "index_end": 11
            },
            {
                "section_type": "dark_green_thing",
                "sign_type": "Entity",
                "index_begin": 19,
                "index_end": 27
            },
            {
                "section_type": "dark_green_thing",
                "sign_type": "Entity",
                "index_begin": 35,
                "index_end": 40
            }
            ]
    }
  ],

  'errors': []
    // this errors array follows the analysis array
}


// The data object will look like this:

    {
      yellow: {
        amount: number,
        percentage: number
      }
      green: {
        amount: number,
        percentage: number
      }
      blue: {
        amount: number,
        percentage: number
      }
      lightGreen {
        amount: number,
        percentage: number
      }
      fadedBlue {
        amount: number,
        percentage: number
      }
    }

*/


const analysisExample = {
  "analysis": [


    {
    "sentence": {
              "sent_type": "space",
              "index_begin": 0,
              "index_end": 87
      },

    "sections": [

            {
              "section_type": "dark_green_thing",
              "index_begin": 0,
              "index_end": 87
            }
    ],

    "signs": [

        {
          "section_type": "dark_green_thing",
          "sign_type": "Entity",
          "index_begin": 6,
          "index_end": 11
        },
        {
          "section_type": "dark_green_thing",
          "sign_type": "Entity",
          "index_begin": 19,
          "index_end": 27
        },
        {
          "section_type": "dark_green_thing",
          "sign_type": "Entity",
          "index_begin": 35,
          "index_end": 40
        },
        {
          "section_type": "dark_green_thing",
          "sign_type": "Entity",
          "index_begin": 41,
          "index_end": 49
        },
        {
          "section_type": "dark_green_thing",
          "sign_type": "Entity",
          "index_begin": 56,
          "index_end": 58
        },
        {
          "section_type": "dark_green_thing",
          "sign_type": "Entity",
          "index_begin": 69,
          "index_end": 77
        },
        {
          "section_type": "dark_green_thing",
          "sign_type": "Entity",
          "index_begin": 81,
          "index_end": 86
        }
  ]
  },




  {
    "sentence": {
      "sent_type": "shape",
      "index_begin": 88,
      "index_end": 201
    },
    "sections": [{
      "section_type": "yellow_thing",
      "index_begin": 88,
      "index_end": 201
    }],
    "signs": [{
      "section_type": "yellow_thing",
      "sign_type": "Entity",
      "index_begin": 91,
      "index_end": 96
    }, {
      "section_type": "yellow_thing",
      "sign_type": "Entity",
      "index_begin": 112,
      "index_end": 126
    }, {
      "section_type": "yellow_thing",
      "sign_type": "Entity",
      "index_begin": 140,
      "index_end": 145
    }, {
      "section_type": "yellow_thing",
      "sign_type": "Entity",
      "index_begin": 160,
      "index_end": 167
    }, {
      "section_type": "yellow_thing",
      "sign_type": "Entity",
      "index_begin": 171,
      "index_end": 182
    }, {
      "section_type": "yellow_thing",
      "sign_type": "Entity",
      "index_begin": 187,
      "index_end": 200
    }]
  },


  {
    "sentence": {
      "sent_type": "space",
      "index_begin": 202,
      "index_end": 274
    },
    "sections": [{
      "section_type": "dark_green_thing",
      "index_begin": 202,
      "index_end": 274
    }],
    "signs": [{
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 202,
      "index_end": 204
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 205,
      "index_end": 217
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 225,
      "index_end": 229
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 239,
      "index_end": 244
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 245,
      "index_end": 248
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 253,
      "index_end": 257
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 261,
      "index_end": 273
    }]
  },



  {
    "sentence": {
      "sent_type": "shape_in_spaces",
      "index_begin": 275,
      "index_end": 514
    },


    "sections": [
          {
            "section_type": "faded_blue_thing",
            "index_begin": 275,
            "index_end": 359
          },
          {
            "section_type": "light_blue_thing",
            "index_begin": 360,
            "index_end": 468
          },
          {
            "section_type": "dark_blue_thing",
            "index_begin": 469,
            "index_end": 514
          }
        ],



    "signs": [{
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 275,
      "index_end": 284
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 288,
      "index_end": 297
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 309,
      "index_end": 313
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 317,
      "index_end": 330
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 331,
      "index_end": 334
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 339,
      "index_end": 343
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 354,
      "index_end": 359
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 363,
      "index_end": 367
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 381,
      "index_end": 385
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 394,
      "index_end": 399
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 412,
      "index_end": 420
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 427,
      "index_end": 438
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 444,
      "index_end": 451
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 463,
      "index_end": 468
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 469,
      "index_end": 479
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 487,
      "index_end": 491
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 495,
      "index_end": 502
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 508,
      "index_end": 513
    }]
  },



  {
    "sentence": {
      "sent_type": "shape_in_space",
      "index_begin": 515,
      "index_end": 640
    },
    "sections": [{
      "section_type": "light_blue_thing",
      "index_begin": 515,
      "index_end": 604
    }, {
      "section_type": "dark_blue_thing",
      "index_begin": 605,
      "index_end": 640
    }],
    "signs": [{
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 519,
      "index_end": 523
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 533,
      "index_end": 538
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 539,
      "index_end": 542
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 547,
      "index_end": 553
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 557,
      "index_end": 570
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 579,
      "index_end": 589
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 600,
      "index_end": 604
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 618,
      "index_end": 639
    }]
  },



  {
    "sentence": {
      "sent_type": "shape_in_spaces",
      "index_begin": 641,
      "index_end": 839
    },
    "sections": [{
      "section_type": "faded_blue_thing",
      "index_begin": 641,
      "index_end": 747
    }, {
      "section_type": "light_blue_thing",
      "index_begin": 748,
      "index_end": 822
    }, {
      "section_type": "dark_blue_thing",
      "index_begin": 823,
      "index_end": 839
    }],
    "signs": [{
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 641,
      "index_end": 643
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 644,
      "index_end": 652
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 662,
      "index_end": 667
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 681,
      "index_end": 689
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 695,
      "index_end": 704
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 728,
      "index_end": 734
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 742,
      "index_end": 746
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 748,
      "index_end": 752
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 754,
      "index_end": 760
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 762,
      "index_end": 773
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 781,
      "index_end": 785
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 795,
      "index_end": 800
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 805,
      "index_end": 808
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 818,
      "index_end": 822
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 826,
      "index_end": 838
    }]
  },



  {
    "sentence": {
      "sent_type": "space",
      "index_begin": 840,
      "index_end": 923
    },
    "sections": [{
      "section_type": "dark_green_thing",
      "index_begin": 840,
      "index_end": 923
    }],
    "signs": [{
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 840,
      "index_end": 845
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 851,
      "index_end": 861
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 871,
      "index_end": 876
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 877,
      "index_end": 880
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 885,
      "index_end": 889
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 906,
      "index_end": 910
    }, {
      "section_type": "dark_green_thing",
      "sign_type": "Entity",
      "index_begin": 918,
      "index_end": 922
    }]
  },



  {
    "sentence": {
      "sent_type": "shape_in_space",
      "index_begin": 924,
      "index_end": 1057
    },
    "sections": [{
      "section_type": "light_blue_thing",
      "index_begin": 924,
      "index_end": 1012
    }, {
      "section_type": "dark_blue_thing",
      "index_begin": 1013,
      "index_end": 1057
    }],
    "signs": [{
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 924,
      "index_end": 933
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 944,
      "index_end": 952
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 957,
      "index_end": 962
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 963,
      "index_end": 966
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 971,
      "index_end": 977
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 981,
      "index_end": 993
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1007,
      "index_end": 1012
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1013,
      "index_end": 1022
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1027,
      "index_end": 1033
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1037,
      "index_end": 1041
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1051,
      "index_end": 1056
    }]
  },



  {
    "sentence": {
      "sent_type": "shape_in_spaces",
      "index_begin": 1058,
      "index_end": 1287
    },
    "sections": [{
      "section_type": "faded_blue_thing",
      "index_begin": 1058,
      "index_end": 1163
    }, {
      "section_type": "light_blue_thing",
      "index_begin": 1164,
      "index_end": 1270
    }, {
      "section_type": "dark_blue_thing",
      "index_begin": 1271,
      "index_end": 1287
    }],
    "signs": [{
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1063,
      "index_end": 1067
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1082,
      "index_end": 1090
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1107,
      "index_end": 1116
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1117,
      "index_end": 1122
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1126,
      "index_end": 1134
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1138,
      "index_end": 1149
    }, {
      "section_type": "faded_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1154,
      "index_end": 1163
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1173,
      "index_end": 1183
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1185,
      "index_end": 1193
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1203,
      "index_end": 1211
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1212,
      "index_end": 1216
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1230,
      "index_end": 1239
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1250,
      "index_end": 1253
    }, {
      "section_type": "light_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1264,
      "index_end": 1270
    }, {
      "section_type": "dark_blue_thing",
      "sign_type": "Entity",
      "index_begin": 1280,
      "index_end": 1286
    }]
  }
],


  "errors": []


}



class Data {
  constructor(num1,num2,num3,num4,num5,num6,num7,num8,num9,num10){
    this.yellow                  = {}
    this.green                   = {}
    this.blue                    = {}
    this.lightGreen              = {}
    this.fadedBlue               = {}
    this.yellow.amount           = num1;
    this.yellow.percentage       = num2;
    this.green.amount            = num3;
    this.green.percentage        = num4;
    this.blue.amount             = num5;
    this.blue.percentage         = num6;
    this.lightGreen.amount       = num7;
    this.lightGreen.percentage   = num8;
    this.fadedBlue.amount        = num9;
    this.fadedBlue.percentage    = num10;
  }
}

const extractData = (analysis)=>{
  const data = new Data(0,0,0,0,0,0,0,0,0,0);
  let totalSentences = 0;
  console.log(data);

  analysis.analysis.forEach((sentence)=>{
      totalSentences += 1;
      if (sentence.sections[0].section_type === "yellow_thing"){
        console.log("adding " + sentence.sections[0].section_type);
        data.yellow.amount += 1;
      } else if (sentence.sections[0].section_type === "light_blue_thing"){
        console.log("adding " + sentence.sections[0].section_type);
        data.blue.amount += 1;
      } else if (sentence.sections[0].section_type === "dark_green_thing"){
        console.log("adding " + sentence.sections[0].section_type);
        data.green.amount += 1;
      } else if (sentence.sections[0].section_type === "faded_blue_thing"){
        console.log("adding " + sentence.sections[0].section_type);
        data.fadedBlue.amount += 1;
      } else if (sentence.sections[0].section_type === "light_green_thing"){
        console.log("adding " + sentence.sections[0].section_type);
        data.lightGreen.amount += 1;
      }
      })
      console.log(data);

  data.yellow.percentage = Math.round((data.yellow.amount / totalSentences) * 100)
  data.blue.percentage = Math.round((data.blue.amount / totalSentences) * 100)
  data.green.percentage = Math.round((data.green.amount / totalSentences) * 100)
  data.fadedBlue.percentage = Math.round((data.fadedBlue.amount / totalSentences) * 100)
  data.lightGreen.percentage = Math.round((data.lightGreen.amount / totalSentences) * 100)

  return data
}

module.exports = extractData();
