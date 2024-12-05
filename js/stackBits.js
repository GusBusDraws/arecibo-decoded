// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

let nBits;
let nStacked;
let stackHeight;
let bitWidth;
let marginX;
let marginY;
let bitLocs = [];
let bitColor;
let stackIdx;
let updateFrame;
let newBitIdx;
let newBitLoc;
let tSize;
let stackInc;
let drawIncomingAfterFirstStack;
let continueAfterFirstStack;
let resetAfterLastBit;
let stopSaveCond;

function resetStackBits() {
  frameX = 0;
  nBits = data.length;
  frameX = 0;
  stackHeight = 50;
  bitWidth = 10;
  marginX = 20;
  marginY = getMarginY(stackHeight);
  bitColor = lineColor;
  stackIdx = 0;
  updateFrame  = 0;
  newBitIdx = 0;
  newBitLoc = 0;
  tSize = 2*bitWidth;
  stackFirstOnly();
  // fastStacksAfterFirst()
}

function stackFirstOnly() {
  nStacked = 0;
  speed = 100;
  stackInc = 1;
  drawIncomingAfterFirstStack = false;
  continueAfterFirstStack = false;
  resetAfterLastBit = false;
}

function fastStacksAfterFirst() {
  nStacked = 50;
  speed = 100;
  stackInc = 3;
  drawIncomingAfterFirstStack = false;
  continueAfterFirstStack = true;
  resetAfterLastBit = false;
}

function runStackBits() {
  if (nStacked < stackHeight) {
    // Move the next bit into place
    [frameX, nStacked] = drawIncoming(frameX, nStacked);
  } else if (nStacked < nBits) {
    if (drawIncomingAfterFirstStack) {
      [frameX, nStacked] = drawIncoming(frameX, nStacked);
    }
    if (continueAfterFirstStack) {
      nStacked+=stackInc;
    }
  } else {
    if (resetAfterLastBit) {
      nStacked = 0;
    }
  }
  // Draw already stacked bits
  drawStacked(nStacked, stackHeight);
  // Stop saving if reaches end of first stack or end of data
  if (
      !continueAfterFirstStack && nStacked > 0 && nStacked == stackHeight
    ) {
    console.log(
      'Reached stopping condition (nStacked='+nStacked+
      '). Setting finalsavedFrame to false.'
    );
    finalSavedFrame = true;
  } else if (
    nStacked > 0 && nStacked == nBits
  ) {
    console.log(
      'Reached stopping condition (nStacked='+nStacked+
      '). Setting finalSavedFrame to false.'
    );
    finalSavedFrame = true;
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

function getMarginY(stackHeight) {
  return ( canvasHeight - (stackHeight*bitWidth) ) / 2
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
