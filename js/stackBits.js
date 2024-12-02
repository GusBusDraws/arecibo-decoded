// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

speed = 10;
frameX = 0;
let nStacked = 32;
let stackHeight = 23;
let margins = 50;
let bitWidth = (canvasHeight - 2*margins) / stackHeight;
let bitLocs = [];
let nBits = data.length;
let bitColor = lineColor;
let stackIdx = 0;
let updateFrame  = 0;
let newBitIdx = 0;
let newBitLoc = 0;
let debug = true;

function runStackBits() {
  // Draw already stacked bits
  drawStacked(nStacked);
  // Move the next bit into place
  [frameX, nStacked] = drawIncoming(frameX, nStacked);
  if (nStacked == nBits) {
    nStacked = 0;
  }
}

function drawStacked(nStacked) {
  let x, y;
  for (let i = 0; i < nStacked; i++) {
    setBitColor(i);
    x = margins + bitWidth * floor(i / stackHeight)
    // The extra bitWidth shifts the bits the necessary amount for drawing
    // from bottom to top since the (x, y) corresponds to the top left corner
    y = canvasHeight - (margins + bitWidth + bitWidth * (i % stackHeight))
    rect(x, y, bitWidth, bitWidth);
    if (debug) {
      fill('red');
      noStroke();
      text(i, x+bitWidth/2, y+bitWidth/2);
    }
  }
}

function drawIncoming(frameX, nStacked) {
  let scrollX = speed*frameX;
  // Ref: absolute coordinates start with x/y, relative coords end with X/Y
  let i = nStacked
  let x0 = canvasWidth
  let y0 = canvasHeight/2 - bitWidth/2
  let xf = margins + bitWidth * floor(i / stackHeight)
  let yf = canvasHeight - (margins + bitWidth + bitWidth * (i % stackHeight))
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
    frameX = 0;
    nStacked++;
  }
  if (debug) {
    stroke('red');
    noFill();
    line(x0, y0, xf, yf);
    text('hyp: '+endHyp, 5/6*canvasWidth, canvasHeight-margins);
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
  frameX = 0;
  nStacked = 0;
}
