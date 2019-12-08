//text to be displayed
var displayText;
var displayCommand;
var displayNote;
var displayVelocity;

// Get viewport height, make canvas same dimension, for full screen.
// Usually causes scrollbars.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //starting background color
  bgColor= color(220,220,200);

  //starting square color
  squareColor = color(100);

  //Starting text
  displayText="";
  displayCommand="Command not received";
  displayNote="Note not received";
  displayVelocity="Velocity not received";

  ////
  //Setting up MIDI
  ////
	WebMidi.enable(function (err) { //check if WebMidi.js is enabled

    // Request MIDI access
    if (navigator.requestMIDIAccess) {
        console.log('This browser supports WebMIDI!');

        navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

    } else {
        console.log('WebMIDI is not supported in this browser.');
    }
    // Function to run when requestMIDIAccess is successful
    function onMIDISuccess(midiAccess) {

    //name our visible MIDI input and output ports
        var inputs = midiAccess.inputs;
        var outputs = midiAccess.outputs;

        // Attach MIDI event "listeners" to each input
        for (var input of midiAccess.inputs.values()) {
            input.onmidimessage = getMIDIMessage;
        }
    }

    // Function to run when requestMIDIAccess fails
    function onMIDIFailure() {
        console.log('Error: Could not access MIDI devices.');
    }

    //Choose an input port
    inputSoftware = WebMidi.inputs[1];
    //The 0 value is the first value in the array
    //Meaning that we are going to use the first MIDI input we see
    //This can be changed to a different number,
    //or given a string to select a specific port

    // Function to parse the MIDI messages we receive
    function getMIDIMessage(message) {
      //console.dir(event);
        var command = message.data[0];
        var note = message.data[1];
        var velocity = (message.data.length > 2) ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

        console.log("Command: " + command);
        console.log("Note: " + note);
        console.log("Velocity: " + velocity);

        switch (command) {
            case 144:
                if (velocity > 0) {
                    noteOn(note, velocity);
                    showCommand(command);
                } else {
                    noteOff(note);
                }
                break;

            case 128:
                noteOff(note);
                showCommand(command);

            case 176:
                if (velocity > 0) {
                    fader(velocity);
                    showCommand(command);
                } else {
                    fader(velocity);
                }
                break;

            default:
            showCommand(command);
        }
    }

    function showCommand(command) {
      console.log('command');
      displayCommand="Command: " + command;
    }

    // Function to handle noteOn messages (ie. key is pressed)
    // Think of this like an 'onkeydown' event
    function noteOn(note) {
      console.log('noteOn');
      displayNote="Note on: " + note;
    }

    // Function to handle noteOff messages (ie. key is released)
    // Think of this like an 'onkeyup' event
    function noteOff(note) {
    	console.log('noteOff');
      displayNote="Note off: " + note;
    }


    function fader(velocity) {
    	console.log('fader');
    	displayVelocity="Velocity: " + velocity;
    }

    //listen to all incoming "note on" input events
    inputSoftware.addListener('noteon', "all", function (e) {

  		//Show what we are receiving
  		console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");

      displayText="Note " + e.note.name + e.note.octave + " (" + e.note.number + ") is on";

      //If the incoming note is a "D" in any octave, then...
    	if(e.note.name=="D"){
       	console.log("A D note has been received, any octave");
      }
    });

    //The note off functionality will need its own event listener
    //You don't need to pair every single note on with a note off

    inputSoftware.addListener('noteoff', "all", function (e) {

  	 	//Show what we are receiving
  		console.log("Received 'noteoff' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");

      displayText="Note " + e.note.name + e.note.octave + " (" + e.note.number + ") is off";

    	if(e.note.number==64){
        console.log("Detected MIDI note number 64 turned OFF");
        displayText="Note number 64 is off";
      }
    });

    inputSoftware.addListener('midimessage', "all", function (e) {
      console.dir(e);
    });

  //
  //end of MIDI setup
  //
  });
}

function draw() {
  clear();
	colorMode(HSB);
	fill(255, 204, 100);
  fill(squareColor); // Use color variable 'c' as fill color
  noStroke(); // Don't draw a stroke around shapes
	rect(20, 20, 60, 60);
  textSize(40);
  text(displayText,width/2,height/3.5);
  text(displayCommand,width/2,height/3);
  text(displayNote,width/2,height/2.5);
  text(displayVelocity,width/2,height/2);
  noStroke();
}
