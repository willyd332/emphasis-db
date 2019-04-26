
// Functions and Variables

let hover    = false;
let allColor = false;
let yellow   = false;
let green    = false;
let blue     = false;
let word     = false;

const hoverButton     = () => {
if (hover) {
  $('span').off()
  $('span').css('background-color', '')
  $('#hoverButton').css('border', ' 1px solid black')
  hover = false;
} else {
  $('span').off()
  $('span').css('background-color', '')
  $('.green').mouseover(function(){
    $('.green').css('background-color', '#4DFC9C')
    $('.lightGreen').css('background-color', '#CCFFE1')
  })
  $('.green').mouseout(function(){
    $('.green').css('background-color', '')
    $('.lightGreen').css('background-color', '')
  })
  $('.yellow').mouseover(function(){
    $('.yellow').css('background-color', '#FFF459')
  })
  $('.yellow').mouseout(function(){
    $('.yellow').css('background-color', '')
  })
  $('.fadedBlue').mouseover(function(){
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
  })
  $('.fadedBlue').mouseout(function(){
    $('.lightBlue').css('background-color', '')
    $('.fadedBlue').css('background-color', '')
    $('.darkBlue').css('background-color', '')
  })
  $('.lightBlue').mouseover(function(){
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
  })
  $('.lightBlue').mouseout(function(){
    $('.lightBlue').css('background-color', '')
    $('.fadedBlue').css('background-color', '')
    $('.darkBlue').css('background-color', '')
  })
  $('.darkBlue').mouseover(function(){
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
  })
  $('.darkBlue').mouseout(function(){
    $('.lightBlue').css('background-color', '')
    $('.fadedBlue').css('background-color', '')
    $('.darkBlue').css('background-color', '')
  })
  $('.lightGreen').mouseover(function(){
    $('.green').css('background-color', '#4DFC9C')
    $('.lightGreen').css('background-color', '#CCFFE1')
  })
  $('.lightGreen').mouseout(function(){
    $('.lightGreen').css('background-color', '')
    $('.green').css('background-color', '')
  })
  hover    = true;
  allColor = false;
  green    = false;
  yellow   = false;
  blue     = false;
  word     = false;
  $('button').css('border', ' 1px solid black')
  $('#hoverButton').css('border', '8px solid black')
}
}
const allColorButton  = () => {
  if (allColor) {
    $('span').off()
    $('span').css('background-color', '')
    $('#allColorButton').css('border', ' 1px solid black')
    allColor = false;
  } else {
    $('span').off()
    $('.green').css('background-color', '#4DFC9C')
    $('.lightGreen').css('background-color', '#CCFFE1')
    $('.yellow').css('background-color', '#FFF459')
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
    allColor = true;
    hover    = false;
    green    = false;
    yellow   = false;
    blue     = false;
    word     = false;
    $('button').css('border', ' 1px solid black')
    $('#allColorButton').css('border', '8px solid black')
  }
}
const yellowButton    = () => {
  if (yellow) {
    $('span').off()
    $('span').css('background-color', '')
    $('#yellowButton').css('border', ' 1px solid black')
    yellow = false;
  } else {
    $('span').off()
    $('span').css('background-color', '')
    $('.yellow').css('background-color', '#FFF459')
    yellow   = true;
    hover    = false;
    green    = false;
    allColor = false;
    blue     = false;
    word     = false;
    $('button').css('border', ' 1px solid black')
    $('#yellowButton').css('border', '8px solid black')
  }
}
const blueButton      = () => {
  if (blue) {
    $('span').off()
    $('span').css('background-color', '')
    $('#blueButton').css('border', ' 1px solid black')
    blue = false;
  } else {
    $('span').off()
    $('span').css('background-color', '')
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
    blue     = true;
    hover    = false;
    green    = false;
    allColor = false;
    yellow   = false;
    word     = false;
    $('button').css('border', ' 1px solid black')
    $('#blueButton').css('border', '8px solid black')
  }
}
const greenButton     = () => {
  if (green) {
    $('span').off()
    $('span').css('background-color', '')
    $('#greenButton').css('border', ' 1px solid black')
    green = false;
  } else {
    $('span').off()
    $('span').css('background-color', '')
    $('.green').css('background-color', '#4DFC9C')
    $('.lightGreen').css('background-color', '#CCFFE1')
    green    = true;
    hover    = false;
    blue     = false;
    allColor = false;
    yellow   = false;
    word     = false;
    $('button').css('border', ' 1px solid black')
    $('#greenButton').css('border', '8px solid black')
  }
}
const wordButton      = () => {
  if (word){
    $('#wordButton').css('border', ' 1px solid black')
    word     = false;
    $('.WlightBlue').css('background-color', '')
    $('.WfadedBlue').css('background-color', '')
    $('.WdarkBlue').css('background-color', '')
    $('.Wgreen').css('background-color', '')
    $('.WlightGreen').css('background-color', '')
    $('.Wyellow').css('background-color', '')
  } else {

    $('.lightBlue').css('background-color', '')
    $('.fadedBlue').css('background-color', '')
    $('.darkBlue').css('background-color', '')
    $('.green').css('background-color', '')
    $('.lightGreen').css('background-color', '')
    $('.yellow').css('background-color', '')

    $('.WlightBlue').css('background-color', '#59F1FF')
    $('.WfadedBlue').css('background-color', '#D2F9FF')
    $('.WdarkBlue').css('background-color', '#598CF8')
    $('.Wgreen').css('background-color', '#4DFC9C')
    $('.WlightGreen').css('background-color', '#CCFFE1')
    $('.Wyellow').css('background-color', '#FFF459')
    word     = true;
    hover    = false;
    allColor = false;
    green    = false;
    yellow   = false;
    blue     = false;
    $('button').css('border', ' 1px solid black')
    $('#wordButton').css('border', ' 8px solid black')
  }
}


// Event Listeners

$('#allColorButton').on('click', function(){
  allColorButton();
})
$('#hoverButton').on('click', function(){
  hoverButton();
})
$('#yellowButton').on('click', function(){
  yellowButton();
})
$('#blueButton').on('click', function(){
  blueButton();
})
$('#greenButton').on('click', function(){
  greenButton();
})
$('#wordButton').on('click', function(){
  wordButton();
})
