// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

let data;
let xOffset = 0;
let colorOsc = 1;

function preload() {
  loadStrings('../message.txt', handleStrings);
}

function setup() {
  createCanvas(400, 400);
  resetSketch();
  // frameRate(1);
  stroke(255);
  strokeWeight(5);
  noFill();
  console.log('Press SPACE to stop looping or r to reset.')
  console.log(data)
}

function draw() {
  let i = frameCount % data.length;
  // setFrame(i);
  background(0);
  drawSquares(xOffset);
  drawSineWave(xOffset);
  xOffset += 2
}

function drawSquares(offset) {
  noStroke();
  let wavelength = TWO_PI / 0.05; // Wavelength of the sine wave (calculated from frequency)
  for (let i = -1; i < width / wavelength + 1; i++) {
    let x = i * wavelength + (offset % (2*wavelength)); // Align squares with wavelength
    let colorVal = colorOsc > 0 ? color(200, 100, 100) : color(100, 150, 200);
    fill(colorVal); // Choose color
    colorOsc = colorOsc * -1
    rect(width - x, 0, wavelength, height); // Draw the square with a width of one wavelength
  }
}

function drawSineWave(offset) {
  stroke(255); // Line color
  strokeWeight(2); // Line thickness
  noFill();
  beginShape();
  let endX = offset < width ? offset : width
  for (let x = 0; x < endX; x += 1) { // Increment x for efficiency
    let angle = (x - offset) * 0.05; // Adjust wave frequency
    let y = height / 2 + sin(angle) * 100; // Wave amplitude
    vertex(width - x, y); // Plot the vertex
  }
  endShape();
  endShape();
}

function resetSketch() {
  // setFrame(0);
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
