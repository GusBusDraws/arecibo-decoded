// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

// let data;
let data = '1000001';
// let wavelength = 2 * PI / 0.05;
let wavelength = 100;
let speed = 5;
let xOffset = 0;
let colorOsc = 1;

// function preload() {
//   loadStrings('../message.txt', handleStrings);
// }

function setup() {
  createCanvas(800, 600);
  // createCanvas(400, 400);
  resetSketch();
  // frameRate(1);
  // wavelength = TWO_PI / 0.05; // Wavelength of the sine wave (calculated from frequency)
  console.log('Wavelength = '+ wavelength)
  stroke(255);
  strokeWeight(5);
  noFill();
  console.log('Press SPACE to stop looping or r to reset.')
  console.log(data)
}

function draw() {
  let i = frameCount % data.length;
  background(0);
  // 1. Iterate across a window moving from right to left
  drawRects(speed*frameCount);
  drawSineWave(speed*frameCount);
}

function drawRects(scrollX) {
  for (let i = 0; i < ceil(width / wavelength) + 1; i++) {
    let viewX;
    let viewIdx;
    if (scrollX < width) {
      viewX = width - scrollX
      viewIdx = i
    } else {
      viewX = -1 * wavelength * (
        (scrollX - width)/wavelength
        - floor((scrollX - width)/wavelength)
      )
      viewIdx = floor( (scrollX - width) / wavelength) + i
    }
    if (i == 0) {
      console.log(viewIdx, viewX)
    }
    // let rectX = viewX + (i*wavelength) + viewOffset;
    let rectX = viewX + (i*wavelength)
    let bitIdx = (viewIdx) % data.length;
    let bit = data[bitIdx];
    let rgb = int(bit) > 0 ? color(0, 200, 0) : color(200, 0, 0);
    fill(rgb); // Choose color
    stroke(rgb);
    // Draw the rectangle with a height and width of one wavelength
    rect(rectX, (height - wavelength)/2, wavelength, wavelength);
  }
}

function drawSineWave(position) {
  let windowWidth = position < width ? position : width
  stroke(255); // Line color
  strokeWeight(2); // Line thickness
  noFill();
  beginShape();
  // Draw as many wavelengths as necessary to fill the width of the window
  for (let x = 0; x < windowWidth; x++) {
    // let angle = (x - position) * 0.05; // Adjust wave frequency
    let angle = (x - position) / wavelength * (2*PI); // Adjust wave frequency
    // let y = height / 2 + sin(angle) * 100; // Wave amplitude
    let y = height / 2 + sin(angle) * wavelength/2; // Wave amplitude
    vertex(width - x, y); // Plot the vertex
  }
  endShape();
}

function resetSketch() {
  // setFrame(0);
}

function handleStrings(strings) {
  data = strings[0]
}
