// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

let saveFramesBool = false;
// saveFramesBool = true;
let fps = 60;
let nFrames = 60 * 30; // animation fps * n seconds

function preload() {
  loadStrings('../message.txt', handleStrings);
}

function setup() {
  // data = '0101';
  createCanvas(canvasWidth, canvasHeight);
  resetSketch();
  frameRate(fps);
  textFont('Consolas');
  textAlign(CENTER, CENTER);
  textSize(15);
  console.log('Wavelength = '+ wavelength)
  console.log('Press SPACE to stop looping or r to reset.')
  console.log(data)
}

function draw() {
  background(0);
  // runFreqMod();
  runStackBits();
  // runResizeStacks();
  if (saveFramesBool) saveNumberedFrame(nFrames);
}

function resetSketch() {
  background(0);
  frameX = 0;
  resetStackBits();
  // resetResizeStacks();
}

function handleStrings(strings) {
  data = strings[0]
}
