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

function resetScroll() {
  console.log('Running resetResizeStacks...')
  speed = -2;
  nBits = data.length;
  bitColor = lineColor;
  bitWidth = 30;
  stackWidth = 23;
  marginY = 60;
  marginX = getMarginX(stackWidth);
  offsetCounter = 0;
  offsetY = 0;
  minOffset = -1 * (bitWidth*floor(nBits/stackWidth) - canvasHeight + 2*marginY);
  maxOffset = 0;
  tSize = bitWidth/2;
}

function runScroll() {
  console.log('Running runResizeStacks...')
  // Draw message according to offset
  drawMessage(offsetCounter);
  offsetY = speed*offsetCounter;
  if (offsetY <= minOffset || offsetY > maxOffset) {
    scrollDirection *= -1;
    offsetY = speed*offsetCounter;
  }
  offsetCounter += scrollDirection;
  if (debug) {
    noStroke();
    fill('red');
    textAlign(LEFT, CENTER);
    textSize(tSize);
    text('offsetCounter = '+offsetCounter, canvasWidth/2, canvasHeight/2);
    text('minOffset = '+minOffset, canvasWidth/2, canvasHeight/2+tSize);
    text('speed = '+speed, canvasWidth/2, canvasHeight/2+2*tSize);
    text('offsetY = '+offsetY, canvasWidth/2, canvasHeight/2+3*tSize);
  }
  // Stop saving if reaches end of first stack or end of data
  if (
      !continueAfterFirstStack && nStacked > 0 && nStacked == stackWidth
    ) {
    console.log(
      'Reached stopping condition (nStacked='+nStacked+
      '). Setting finalsavedFrame to false.'
    );
    finalSavedFrame = true;
  }
}

function getMarginX(stackWidth) {
  return ( canvasWidth - (stackWidth*bitWidth) ) / 2
}

function drawMessage(offsetCounter) {
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
