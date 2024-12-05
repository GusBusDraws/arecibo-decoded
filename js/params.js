// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

  ////////////////////////
 // General parameters //
////////////////////////
let data = '';
let canvasWidth = 800;
let canvasHeight = 600;
let frameX = 0;
let speed = 10;
let debug = false;
let finalSavedFrame = false;

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

  ///////////////////////
 // scroll parameters //
///////////////////////

// This variable can be toggled with a 'c' key press to change
// direction by altering the iteration of offsetCounter defined in scroll.js
let changeDirection = 1;