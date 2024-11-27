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
ffmpeg -r 60 -i path/to/images/frame_%003d.png -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" path/to/video.mp4
```

## Change log
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
