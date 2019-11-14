/*

This is a p5js sketch that uses the WebMIDI.js library to receive MIDI messages

In the project folder, to the left of this coding window,
you can look at the index.html file and see the following on line 7:

<script src="https://cdn.jsdelivr.net/npm/webmidi"></script>

This is added to the otherwise normal p5js boilerplate,
and bring in the WebMIDI.js library, allowing our browser and JS program
to receive MIDI messages from all types of software and hardware

*/

//background color variable
var bgColor;

//color of a square
var squareColor;

//text to be displayed
var displayText;
var displayVelocity;

//sound to be played
//var soundFX;

var yPos = 0;
var particleFountains = [];

// Get viewport height, make canvas same dimension, for full screen.
// Usually causes scrollbars.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  //400 by 400 pixel canvas
  createCanvas(windowWidth, windowHeight);

  //starting background color
  bgColor= color(220,220,200);

  //starting square color
  squareColor = color(100);

  //starting text
  displayText="Nothing received";

  displayVelcotiy="Nothing received";
  //loading a sound file to play
  //this can be seen inside of the project folder to the left of the code window
  //soundFX = loadSound('piano.mp3');

  ////
  //Setting up MIDI
  ////

	WebMidi.enable(function (err) { //check if WebMidi.js is enabled

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }

  //name our visible MIDI input and output ports
  console.log("---");
  console.log("Inputs Ports: ");
  for(i = 0; i< WebMidi.inputs.length; i++){
    console.log(i + ": " + WebMidi.inputs[i].name);
  }

  console.log("---");
  console.log("Output Ports: ");
  for(i = 0; i< WebMidi.outputs.length; i++){
	console.log(i + ": " + WebMidi.outputs[i].name);
  }

  //Choose an input port
  inputSoftware = WebMidi.inputs[0];
    //The 0 value is the first value in the array
    //Meaning that we are going to use the first MIDI input we see
    //This can be changed to a different number,
    //or given a string to select a specific port

  //listen to all incoming "note on" input events
  inputSoftware.addListener('noteon', "all",
  	function (e) {

		//Show what we are receiving
		console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");

		//change the background color variable
		var randomR = random(0,255);
		var randomG = random(0,255);
		var randomB = random(0,255);
		bgColor = color(randomR,randomB,randomG);

      displayText="Note " + e.note.name + e.note.octave + " (" + e.note.number + ") is on";

      displayVelocity="Velocity is " + e.rawVelocity;
	  
	  console.log(e.note.name);

      // Particles
      var colorNoteMapping = {C: "blue", 'C#': "green", D: "red", 'D#': "purple", E: "yellow", F: "orange", 'F#': "pink", G: "blue", 'G#': "green", A: "red", 'A#': "purple", B: "yellow"};
      var particleColor = colorNoteMapping[e.note.name];
      var t =
          {
              name: "Note",
              colors: [particleColor,[0,255,127,127],[0,255,64,32]],
              lifetime: 10,
              angle: [310,360],
              x: Math.random(),
              y: Math.random(),
              limit: e.rawVelocity/10,
              speed: e.rawVelocity/10,
              shape: 'ellipse',
              size: [10,10],
              sizePercent: 2
          };

      var newFountain = new Fountain(null, t);
      particleFountains.push(newFountain);

    	//This will happen any time any note on message is received
    	//But you can specify particular notes that you want to respond to:

    	//If the incoming note is a "D" in any octave, then...
    	if(e.note.name=="D"){
       	console.log("A D note has been received, any octave");

        //Re-using the background color variable
        //Just re-arranging the random colors
        squareColor = color(randomB, randomG, randomR);
      }
    	//Or you can specify the note
    	if((e.note.name + e.note.octave)=="C4"){
        console.log("A C4 note has been received");

        //set speed of sound playback, changing the tone
        // soundFX.rate(0.555);
      	// //change the volume of the sound, scale of 0.0 to 1.0
      	// soundFX.setVolume(0.15);
        // //play sound
        // soundFX.play();
      }

    	//Or use the MIDI note number instead
    	if(e.note.number==64){
        console.log("Detected MIDI note number 64 turned ON");

        displayText="Note number 64 is on";
      }
    }
  );


    //The note off functionality will need its own event listener
    //You don't need to pair every single note on with a note off

    inputSoftware.addListener('noteoff', "all",
  	function (e) {

  	 	//Show what we are receiving
  		console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");

      displayText="Note " + e.note.name + e.note.octave + " (" + e.note.number + ") is off";

    	if(e.note.number==64){
        console.log("Detected MIDI note number 64 turned OFF");

        displayText="Note number 64 is off";
      }
    }
  );
    //
    //end of MIDI setup
    //
	});
}

function draw() {
  //Draw background with background color variable
  //Will change every time there is a note on
  background(bgColor);
  
  fill(0);
  textAlign(CENTER);
  textSize(60);
  text(displayText,width/2,height/2);

  //Drawing a rectangle, with no outline,
  //Middle of the screen (width and height divided by two)
  fill(squareColor);
  noStroke();
  rect(width/4,height/4,width/2,height/2);
  textSize(40);
  text(displayVelocity,width/4,height/4);
  
  stepParticles();
  drawParticles();
  noStroke();
}

var Particle = function(
  xVel,
  yVel,
  partSize,
  xpos,
  ypos) {
  this.xVel = xVel;
  this.yVel = yVel;
  this.partSize = partSize;
  this.xpos = xpos;
  this.ypos = ypos;
}

Particle.prototype.draw = function() {
  ellipse(this.xpos, this.ypos, this.partSize, this.partSize);
}

Particle.prototype.step = function() {
  // add the velocity to the positions
  this.xpos += this.xVel;
  this.ypos += this.yVel;
  // make the particles shrink
  this.partSize *= 1.01;
  //check for deletion
  return this.partSize > 50;
}

var p = [];

function drawParticles() {
  for (var i = 0; i < p.length; i++) {
    p[i].draw();
  }
}

function stepParticles() {
  var t = new Particle(
    random(-4, 2)+1,
    random(-4, 2)+1,
    2,
    width/2,
    height/2);
  p.unshift(t);
  for (var i = 0; i < p.length; i++) {
    //check for deletion
    if (p[i].step()) {
      p.splice(i, 1);
    }
  }
}