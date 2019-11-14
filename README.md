# Javascript-Midi-Project

This project connects three files together in the index.html file. 
These are

* P5 the graphical frontend using canvas
* webmidi conects your midi controller to Google Chrome browser
* sketch.js Your p5 file that calls in the webmidi data and uses these values to do something inside the p5 canvas

The goal is to 

a) see the midi controller appear as an input[0] device *this might change depending on your midi controller(s)
b) see the midi data as one moves a controller
c) use this code as a base to add features to the circle that appears when everything is working

Visit this branch for [p5-and-particles](https://github.com/EMC23/Javascript-Midi-Project-001/tree/p5-and-particles). This is currently set up for midi using MidiLoop and Ableton. There might need to be adjustments to the code depending on the midi control you choose.