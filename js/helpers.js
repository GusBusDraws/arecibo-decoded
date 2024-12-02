// @ts-check
/// <reference path="../node_modules/@types/p5/global.d.ts" />

function keyPressed() {
    // Set spacebar to toggle play/pause of drawing loop
    switch (key) {
      case ' ':
        if (isLooping()) {
          noLoop();
          console.log('STOPPED. Press SPACE to resume.');
        } else {
          loop();
          console.log('RESUMED. Press SPACE to stop.');
        }
        break;
      case 'r':
        resetSketch();
        break;
      case 'd':
        debug = debug ? false : true;
        break;
    }
  }

  function saveNumberedFrame(nFrames) {
    if (frameCount - 1 < nFrames) {
      let zfill = nFrames.toString().length
      saveCanvas(`frame_${('0'.repeat(zfill) + frameCount).slice(-zfill)}`);
    }
  }
