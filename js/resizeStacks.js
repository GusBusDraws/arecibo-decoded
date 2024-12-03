// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

speed = 100;
frameX = 0;
stackHeight = 50;
let stackAdvance = 0;

function runResizeStacks() {
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

function resetResizeStacks() {
  nBits = data.length;
  frameX = 0;
  nStacked = nBits;
  stackHeight = 50;
  stackAdvance = 0;
}
