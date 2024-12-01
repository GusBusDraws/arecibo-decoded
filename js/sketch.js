// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

let saveFramesBool = false;
// saveFramesBool = true;
let nFrames = 60 * 30; // animation fps * n seconds

function preload() {
  loadStrings('../message.txt', handleStrings);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  resetSketch();
  frameRate(fps);
  console.log('Wavelength = '+ wavelength)
  console.log('Press SPACE to stop looping or r to reset.')
  console.log(data)
}

function draw() {
  background(0);
  // runFreqMod();
  runStackBits();
  if (saveFramesBool) saveNumberedFrame(nFrames);
}

function resetSketch() {
  background(0);
  frameX = 0;
}

function handleStrings(strings) {
  data = strings[0]
}
