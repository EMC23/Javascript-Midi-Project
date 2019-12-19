# Javascript-Midi-Project

This project connects three files together in the index.html file.
These are

1. P5 the graphical frontend using canvas
2. webmidi conects your midi controller to Google Chrome browser
3. A custom javascsript file that uses the webmidi data values to do something inside the p5 canvas
  - setup.js Your p5 file that calls in the webmidi data and uses these values to print messages inside the p5 canvas. This file is to help verify everything is working and provide some feedback.
  - sketch.js Your p5 file that uses the webmidi data values to do something inside the p5 canvas. This is where creativity comes in. *Be sure to change the script in index.html

The goal is to

1. see the midi controller appear as an input[0] device *this might change depending on your midi controller(s)
2. see the midi data as one moves a controller
3. se this code as a base to add features to the circle that appears when everything is working

![Screenshot of what it looks like in Chrome, when midi values are available](https://user-images.githubusercontent.com/1835923/70391785-3968f980-19d9-11ea-961b-7144ef49d86c.PNG)

Visit this branch for [p5-and-particles](https://github.com/EMC23/Javascript-Midi-Project-001/tree/p5-and-particles). This is currently set up for midi using MidiLoop and Ableton. There might need to be adjustments to the code depending on the midi control you choose.
