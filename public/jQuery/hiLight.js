
// Functions and Variables

let hover    = false;
let allColor = false;
let yellow   = false;
let green    = false;
let blue     = false;

const hoverButton = () => {
if (hover) {
  $('span').off()
  $('#hoverButton').css('border', ' 1px solid black')
  hover = false;
} else {
  $('span').off()
  $('span').css('background-color', 'white')
  $('.green').mouseover(function(){
    $('.green').css('background-color', '#4DFC9C')
    $('.lightGreen').css('background-color', '#CCFFE1')
  })
  $('.green').mouseout(function(){
    $('.green').css('background-color', 'white')
    $('.lightGreen').css('background-color', 'white')
  })
  $('.yellow').mouseover(function(){
    $('.yellow').css('background-color', '#FFF459')
  })
  $('.yellow').mouseout(function(){
    $('.yellow').css('background-color', 'white')
  })
  $('.fadedBlue').mouseover(function(){
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
  })
  $('.fadedBlue').mouseout(function(){
    $('.lightBlue').css('background-color', 'white')
    $('.fadedBlue').css('background-color', 'white')
    $('.darkBlue').css('background-color', 'white')
  })
  $('.lightBlue').mouseover(function(){
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
  })
  $('.lightBlue').mouseout(function(){
    $('.lightBlue').css('background-color', 'white')
    $('.fadedBlue').css('background-color', 'white')
    $('.darkBlue').css('background-color', 'white')
  })
  $('.darkBlue').mouseover(function(){
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
  })
  $('.darkBlue').mouseout(function(){
    $('.lightBlue').css('background-color', 'white')
    $('.fadedBlue').css('background-color', 'white')
    $('.darkBlue').css('background-color', 'white')
  })
  $('.lightGreen').mouseover(function(){
    $('.green').css('background-color', '#4DFC9C')
    $('.lightGreen').css('background-color', '#CCFFE1')
  })
  $('.lightGreen').mouseout(function(){
    $('.lightGreen').css('background-color', 'white')
    $('.green').css('background-color', 'white')
  })
  hover    = true;
  allColor = false;
  green    = false;
  yellow   = false;
  blue     = false;
  $('button').css('border', ' 1px solid black')
  $('#hoverButton').css('border', '8px solid black')
}
}
const allColorButton = () => {
  if (allColor) {
    $('span').off()
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
    $('button').css('border', ' 1px solid black')
    $('#allColorButton').css('border', '8px solid black')
  }
}
const yellowButton = () => {
  if (yellow) {
    $('span').off()
    $('#yellowButton').css('border', ' 1px solid black')
    yellow = false;
  } else {
    $('span').off()
    $('span').css('background-color', 'white')
    $('.yellow').css('background-color', '#FFF459')
    yellow = true;
    hover    = false;
    green    = false;
    allColor = false;
    blue     = false;
    $('button').css('border', ' 1px solid black')
    $('#yellowButton').css('border', '8px solid black')
  }
}
const blueButton = () => {
  if (blue) {
    $('span').off()
    $('#blueButton').css('border', ' 1px solid black')
    blue = false;
  } else {
    $('span').off()
    $('span').css('background-color', 'white')
    $('.lightBlue').css('background-color', '#59F1FF')
    $('.fadedBlue').css('background-color', '#D2F9FF')
    $('.darkBlue').css('background-color', '#598CF8')
    blue     = true;
    hover    = false;
    green    = false;
    allColor = false;
    yellow   = false;
    $('button').css('border', ' 1px solid black')
    $('#blueButton').css('border', '8px solid black')
  }
}
const greenButton = () => {
  if (green) {
    $('span').off()
    $('#greenButton').css('border', ' 1px solid black')
    green = false;
  } else {
    $('span').off()
    $('span').css('background-color', 'white')
    $('.green').css('background-color', '#4DFC9C')
    $('.lightGreen').css('background-color', '#CCFFE1')
    green    = true;
    hover    = false;
    blue     = false;
    allColor = false;
    yellow   = false;
    $('button').css('border', ' 1px solid black')
    $('#greenButton').css('border', '8px solid black')
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
