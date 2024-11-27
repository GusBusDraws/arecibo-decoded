// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

// Data string must be longer than the number of width / wavelength
//  data = '01234567890123456789';
let data = '100000001';
let frameX = 0;
// let wavelength = 2 * PI / 0.05;
let wavelength = 200;
let speed = 10;
let fps = 30;
let lineWidth = 4;
let lineColor = '#00f000';
let rectOnColor = '#000'
let bitRangeByIdx = {};
let saveFramesBool = false;
// saveFramesBool = true;
let nFrames = 60 * 30; // animation fps * n seconds

function preload() {
  loadStrings('../message.txt', handleStrings);
}

function setup() {
  createCanvas(800, 600);
  resetSketch();
  frameRate(fps);
  console.log('Wavelength = '+ wavelength)
  console.log('Press SPACE to stop looping or r to reset.')
  console.log(data)
}

function draw() {
  background(0);
  // Draw rectangles corresponding to the bits within data moving from right to left
  drawRects(speed*frameX, rectOnColor);
  drawSineWave();
  if (saveFramesBool) saveFrame(nFrames);
  frameX++;
}

function drawRects(scrollX, rectOnColor) {
  bitRangeByIdx = {}
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
    let rgb = int(bit) > 0 ? rectOnColor : '#000';
    fill(rgb); // Choose color
    stroke(rgb);
    // Draw the rectangle with a height and width of one wavelength
    rect(rectX, (height - wavelength)/2, wavelength, wavelength);
    bitRangeByIdx[bitIdx] = rectX
  }
}

function drawSineWave() {
  stroke(lineColor); // Line color
  strokeWeight(lineWidth); // Line thickness
  noFill();
  console.log(Object.keys(bitRangeByIdx))
  console.log(bitRangeByIdx[0])
  for (let bitIdx of Object.keys(bitRangeByIdx)) {
    let startX = bitRangeByIdx[bitIdx];
    beginShape();
    for (let x = startX; x <= startX + wavelength; x++) {
      let bit = data[bitIdx];
      // let rgb = int(bit) > 0 ? '#000' : lineColor;
      let rgb = lineColor;
      stroke(rgb);
      // Modify wavelength based on bit in data (half as long for 1s)
      let wavelengthMod = int(bit) > 0 ? wavelength/2 : wavelength;
      // Set wave frequency
      let angle = (x - startX) / (wavelengthMod) * (2*PI);
      // Set wave amplitude
      let y = height / 2 + sin(angle) * wavelength/2;
      vertex(x, y); // Plot the vertex
    }
    endShape();
  }
}

function resetSketch() {
  background(0);
  frameX = 0;
}

function handleStrings(strings) {
  data = strings[0]
}
