# Arecibo Decoded
A SciArt project describing the Arecibo Message visually.
This project will be displayed at The STEAM Engine exhibit at Rhizome DC during
December 2024.

## Installation
This project uses Node.js to install p5.js and allow for code complete in
VS Code. First, check that Node is installed:
```bash
npm --version
```

Next, make sure you're in the project directory and initialize a new node
package:
```bash
npm init -y
```

Then, install p5:
```bash
npm install @types/p5
```

## FFMpeg Commands
Save images as MP4 at 60 frames per second:
```shell
name=sine-only-30s && fps=60 && ffmpeg -r $fps -i results/$name\/frame_%004d.png -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" results/$name\-$fps\fps.mp4
```
Trim from 10 to 20 seconds:
```shell
ffmpeg -ss 10 -i video.mp4 -t 10 -c copy video-trimmed.mp4
```
Concatenate files in .txt:
```shell
ffmpeg -f concat -i results/file_list.txt -c copy final-cut.mp4
```
Concatenate reversed video with forward video:
```shell
ffmpeg -i final-cut.mp4 -filter_complex "[0:v]split[v1][v2];[v2]reverse[vrev];[v1][vrev]concat=n=2:v=1[outv]" -map "[outv]" final-cut-w-reverse.mp4
```

## Change log
### 2024-12-06
- Add option to increase or decrease speed with arrow keys
- Enable fullscreen
- Add message data to a preload function to enable loading without server
- Add video reverse function to README
- Start scroll with message off the screen
- Add stop condition for animating scrolling
- Add stop condition for animating stack resizing
- Add concatenation FFMpeg commands to README
### 2024-12-05
- Add `changeDirection` variable to [params.js](js/params.js) that can be toggled with a 'c' key press
- Add [scroll.js](js/scroll.js) to scroll message up and down continuously
- Rename counter and threshold variable for refreshing stack height when resizing
- Add message for toggling debug mode
- Fix order of drawing to solve bit stacking a frame late
- Add presets to separate first stack animation from following stacks
### 2024-12-02
- Wrap parameters into reset functions
- Add [resizeStacks.js](js/resizeStacks.js)
- Add breaks to `keyPressed` switch
- Determine x and y margins procedurally to set wrap
- Make `keyPressed` a switch and add debug case for 'd'
- Begin working out bit wrap for ideal viz
- Correlate stacking bits with data
- Add bit stacking
### 2024-11-30
- Restructure project into separate js files ([freqMod.js](js/freqMod.js) and [stackBits.js](js/stackBits.js))
### 2024-11-29
- Rename save function to `saveNumberedFrame`
### 2024-11-27
- Add frame controls and saving
- Align sine waves with colors behind
### 2024-11-26
- Fix offset for color behind sine waves
### 2024-11-16
- Add alternating color behind sine wave
- Add sine wave
### 2024-11-15
- Load binary message and flash screen on/off according to digits
- Add files from p5.js template
- Add script to convert image to text file
- Add message image
