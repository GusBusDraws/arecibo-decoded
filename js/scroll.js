// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

let stackWidth;
// Introduce variable to change
let offsetCounter = 0;
let offsetY;
let minOffset;
let maxOffset;
// With origin at top left corner, -1 is up
let scrollDirection = 1;
let startOffset;
// Add boolean to prevent direction from changing before message is scrolled
// completely onto the screen for the first time
let scrollingIntoPlace;

function resetScroll() {
  console.log('Running resetResizeStacks...')
  speed = -2;
  changeDirection = 1;
  nBits = data.length;
  bitColor = lineColor;
  // bitWidth = 30;
  bitWidth = canvasWidth / 30;
  stackWidth = 23;
  // marginY = 60;
  marginX = getMarginX(stackWidth);
  // marginY = bitWidth*2;
  marginY = marginX;
  offsetCounter = 0;
  offsetY = 0;
  startOffset = canvasHeight;
  minOffset = startOffset - (bitWidth*floor(nBits/stackWidth) + 2*marginY);
  maxOffset = 0;
  tSize = bitWidth;
  scrollingIntoPlace = true;
}

function runScroll() {
  // Adjust offset
  offsetY = speed*offsetCounter + startOffset;
  // Stop saving if scroll reveals end of message
  if (offsetY <= minOffset) {
    console.log(
      'Reached stopping condition (offsetY='+offsetY+
      '). Setting finalsavedFrame to false.'
    );
    finalSavedFrame = true;
  }
  // Control direction changes
  if (offsetY <= minOffset) {
    scrollDirection *= -1;
    // offsetY = speed*offsetCounter;
  } else if (!scrollingIntoPlace && offsetY > maxOffset) {
    scrollDirection *= -1;
    // offsetY = speed*offsetCounter;
  }
  // Track the first time offsetY drops below zero
  // (once it fully stretches across the screen) to prevent direction from
  // changing prematurely
  if (offsetY < 0) {
    scrollingIntoPlace = false;
  }
  // Draw message according to offset
  drawMessage(offsetY);
  // changeDirection is defined in params.js and can be changed by keyPressed()
  // with a press of the 'c' key
  offsetCounter += scrollDirection * changeDirection;
  if (debug) {
    noStroke();
    fill('red');
    textAlign(LEFT, CENTER);
    textSize(tSize);
    text('offsetCounter = '+offsetCounter, marginX, marginY);
    text('minOffset = '+minOffset, marginX, marginY+tSize);
    text('offsetY = '+offsetY, marginX, marginY+2*tSize);
    text(
      'scrollingIntoPlace = '+scrollingIntoPlace,
      marginX,
      marginY+3*tSize
    );
  }
}

function getMarginX(stackWidth) {
  return ( canvasWidth - (stackWidth*bitWidth) ) / 2
}

function drawMessage(offsetY) {
  let x, y;
  for (let i = 0; i < nBits; i++) {
    setBitColor(i);
    x = marginX + bitWidth * (i % stackWidth)
    // y = marginY + bitWidth * floor(i / stackWidth)
    // offsetY = speed*offsetCounter;
    y = offsetY + marginY + bitWidth * floor(i/stackWidth)
    rect(x, y, bitWidth, bitWidth);
  }
}
