// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

speed = 100;
frameX = 0;
let nBits;
let nStacked = 0;
let stackHeight = 50;
let bitWidth = 10;
let marginX = 20;
let marginY = ( canvasHeight - (stackHeight*bitWidth) ) / 2
let bitLocs = [];
let bitColor = lineColor;
let stackIdx = 0;
let updateFrame  = 0;
let newBitIdx = 0;
let newBitLoc = 0;
let debug = false;
let tSize = 2*bitWidth;

function runStackBits() {
  // Draw already stacked bits
  drawStacked(nStacked, stackHeight);
  if (nStacked < stackHeight) {
    // Move the next bit into place
    [frameX, nStacked] = drawIncoming(frameX, nStacked);
  } else if (nStacked < nBits) {
    // [frameX, nStacked] = drawIncoming(frameX, nStacked);
    nStacked+=2;
  } else {
    // nStacked = 0;
  }
}

function drawStacked(nStacked, stackHeight) {
  let x, y;
  for (let i = 0; i < nStacked; i++) {
    setBitColor(i);
    x = marginX + bitWidth * floor(i / stackHeight)
    // The extra bitWidth shifts the bits the necessary amount for drawing
    // from bottom to top since the (x, y) corresponds to the top left corner
    y = canvasHeight - (marginY + bitWidth + bitWidth * (i % stackHeight))
    rect(x, y, bitWidth, bitWidth);
    if (debug) {
      fill('red');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(tSize);
      // text(i, x+bitWidth/2, y+bitWidth/2);
    }
  }
  if (debug) {
    noStroke();
    fill('red');
    textAlign(LEFT);
    textSize(tSize);
    text('nStacked = '+nStacked, marginX, canvasHeight-marginX);
    text('bitWidth = '+bitWidth, marginX, canvasHeight-marginX-tSize);
  }
}

function drawIncoming(frameX, nStacked) {
  let scrollX = speed*frameX;
  // Ref: absolute coordinates start with x/y, relative coords end with X/Y
  let i = nStacked
  let x0 = canvasWidth
  let y0 = canvasHeight/2 - bitWidth/2
  let xf = marginX + bitWidth * floor(i / stackHeight)
  let yf = canvasHeight - (marginY + bitWidth + bitWidth * (i % stackHeight))
  // Ref: SOH CAH TOA, sin(angle) = opposite/hypotenuse
  let endAdj = yf - y0;
  let endOpp = x0 - xf;
  let endHyp = sqrt(endAdj**2 + endOpp**2);
  let angle = asin(endOpp/endHyp);
  // For updating bit loc, triangle is scrollY (A), scrollX (O), scrollHyp (H)
  // Ref: sin(angle) = scrollX / scrollHyp
  let scrollHyp = scrollX / sin(angle)
  // Ref: cos(angle) = scrollY / scrollHyp
  let scrollY = scrollHyp * cos(angle)
  let xBit = x0 - scrollX;
  let yBit;
  if (yf >= y0) {
    yBit = y0 + scrollY;
  } else {
    yBit = y0 - scrollY;
  }
  if (xBit > xf) {
    setBitColor(nStacked);
    rect(xBit, yBit, bitWidth, bitWidth);
    frameX++;
  } else {
    nStacked++;
    frameX = 0;
  }
  if (debug) {
    stroke('red');
    line(x0, y0, xf, yf);
    noStroke();
    fill('red');
    textAlign(RIGHT);
    text('hyp: '+endHyp, canvasWidth-marginX, canvasHeight-marginX);
  }
  return [frameX, nStacked]
}

function setBitColor(bitIdx) {
  let bit = data[bitIdx]
  if (int(bit) > 0) {
    fill(bitColor);
    stroke(0);
  } else {
    fill(0);
    stroke(bitColor);
  }
}

function resetStackBits() {
  nBits = data.length;
  frameX = 0;
  nStacked = 0;
}
