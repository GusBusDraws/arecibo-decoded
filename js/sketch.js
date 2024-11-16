// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

let data;

function preload() {
  loadStrings('../message.txt', handleStrings);
}

function setup() {
  createCanvas(400, 400);
  resetSketch();
  frameRate(1);
  console.log('Press SPACE to stop looping or r to reset.')
  console.log(data)
}

function draw() {
  let i = frameCount % data.length;
  setFrame(i);
}

function resetSketch() {
  setFrame(0);
}

function setFrame(i) {
  if (data[i] == 0) {
    background(0);
    fill(255)
  } else {
    background(255);
    fill(0)
  }
  text(i, width/2, height/2)
}

function handleStrings(strings) {
  data = strings[0]
}
