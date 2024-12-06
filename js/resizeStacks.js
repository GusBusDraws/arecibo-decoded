// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

// Introduce variable for counting frames since last advance/stack resize
let advanceCounter;
// Introduce variable to trigger resize when counter reaches threshold
let advanceThreshold;

function resetResizeStacks() {
  console.log('Running resetResizeStacks...')
  speed = 100;
  frameX = 0;
  stackHeight = 50;
  advanceCounter = 0;
  nBits = data.length;
  bitColor = lineColor;
  bitWidth = 10;
  marginX = 20;
  frameX = 0;
  nStacked = nBits;
  stackHeight = 50;
  advanceCounter = 0;
  advanceThreshold = 20;
}

function runResizeStacks() {
  if (debug) {
    textAlign(RIGHT);
    fill('red');
    noStroke();
    text(
      'stackHeight = '+stackHeight,
      canvasWidth-marginX,
      canvasHeight-2*bitWidth
    )
  }
  // Calc marginY based on stackHeight
  marginY = getMarginY(stackHeight);
  // Draw already stacked bits
  drawStacked(nStacked, stackHeight);
  // Increment advanceCounter until stackHeight become 23 (width of message)
  if (stackHeight > 23) {
    advanceCounter++;
  }
  // Stop saving if reaches end of first stack or end of data
  if (stackHeight == 23) {
    console.log(
      'Reached stopping condition (stackHeight='+stackHeight+
      '). Setting finalsavedFrame to false.'
    );
    finalSavedFrame = true;
  }
  // Decrement stackHeight once advanceCounter refresh
  if (advanceCounter == advanceThreshold) {
    stackHeight--;
    advanceCounter = 0;
  }
}
