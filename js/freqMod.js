// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

frameX = 0;
speed = 10;

function runFreqMod() {
  // Draw rectangles corresponding to the bits moving from right to left
  drawRects(speed*frameX, rectOnColor);
  // Draw sine wave corresponding to the bits over rectangles
  drawSineWave(lineOnColor);
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

function drawSineWave(lineOnColor) {
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
      let rgb = int(bit) > 0 ? lineOnColor : lineColor;
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

