function setup() {
  // put setup code here
    WebMidi.enable(function (err) {
        if (err) {
          console.log("WebMidi could not be enabled.", err);
        } else {
          console.log("WebMidi enabled!");
          console.log(WebMidi.inputs);
          //console.log(WebMidi.outputs);
          var input = WebMidi.inputs[1];
		  
			//listen to all incoming "note on" input events
			input.addListener('noteon', "all",
			function (e) {

				//Show what we are receiving
				console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");
			});

        }
	});
}

function draw(e) {
  if (typeof e !== 'undefined') {
    ellipse(50, 50, 80, e.value);
  }
}
