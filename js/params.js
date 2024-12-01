// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

  ////////////////////////
 // General parameters //
////////////////////////
let canvasWidth = 800;
let canvasHeight = 600;
// Data string must be longer than the number of width / wavelength
//         '01234567890123456789';
let data = '100000001';
let frameX = 0;
let speed = 10;
let fps = 60;

  ////////////////////////
 // freqMod parameters //
////////////////////////
let wavelength = 200;
let lineWidth = 4;
let lineColor = '#00f000';
let rectOnColor = '#00f000'
let lineOnColor = '#000'
let bitRangeByIdx = {};

  ////////////////////////////
 // stackPixels parameters //
////////////////////////////
