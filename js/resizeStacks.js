// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

let stackAdvance;

function resetResizeStacks() {
  console.log('Running resetResizeStacks...')
  speed = 100;
  frameX = 0;
  stackHeight = 50;
  stackAdvance = 0;
  nBits = data.length;
  bitColor = lineColor;
  frameX = 0;
  nStacked = nBits;
  stackHeight = 50;
  stackAdvance = 0;
}

function runResizeStacks() {
  console.log('Running runResizeStacks...')
  // Calc marginY based on stackHeight
  marginY = getMarginY(stackHeight);
  // Draw already stacked bits
  drawStacked(nStacked, stackHeight);
  if (stackAdvance == 20) {
    stackHeight--;
    stackAdvance = 0;
  }
  if (stackHeight != 23) {
    stackAdvance++;
  }
}
