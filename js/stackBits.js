// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

speed = 10;
frameX = 0;
let stackHeight = 10;
let margins = 50;
let bitWidth = (canvasHeight - 2*margins) / stackHeight;
let bitLocs = [];
let nBits = data.length;
let bitColor = lineColor;
let stackIdx = 0;
let updateFrame  = 0;
let newBitIdx = 0;
let newBitLoc = 0;
let nStacked = 32;
let debug = true;

function runStackBits() {
  // Draw already stacked bits
  drawStacked(nStacked);
  // Move the next bit into place
  // updateLoc(newBitIdx, newBitLoc);
  // updateStacking(stackIdx);
  // stackIdx++;
  drawLine(nStacked);
  updateLoc(speed*frameX);
}

function drawStacked(nStacked) {
  let x, y;
  for (let i = 0; i < nStacked; i++) {
    fill(bitColor);
    stroke('black');
    x = margins + bitWidth * floor(i / stackHeight)
    // The extra bitWidth shifts the bits the necessary amount for drawing
    // from bottom to top since the (x, y) corresponds to the top left corner
    y = canvasHeight - (margins + bitWidth + bitWidth * (i % stackHeight))
    rect(x, y, bitWidth, bitWidth);
    if (debug) {
      fill('red');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(15);
      text(i, x+bitWidth/2, y+bitWidth/2);
    }
  }
}

function drawLine(nStacked) {
  let i = nStacked
  let x0 = canvasWidth
  let y0 = canvasHeight/2 - bitWidth/2
  let x1 = margins + bitWidth * floor(i / stackHeight)
  let y1 = canvasHeight - (margins + bitWidth + bitWidth * (i % stackHeight))
  if (debug) {
    stroke('red');
    line(x0, y0, x1, y1);
  }
}

function updateLoc(scrollX) {
  let x = canvasWidth - scrollX
  let y = canvasHeight/2 - bitWidth/2
  stroke('black');
  fill(bitColor);
  rect(x, y, bitWidth, bitWidth);
  if (debug) {
    stroke('red');
    noFill();
    text(x, canvasWidth-50, canvasHeight-50);
  }
}

function updateStacking(idx) {
  
}
