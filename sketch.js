function setup() {
  createCanvas(400, 400);

  // put setup code here
    WebMidi.enable(function (err) {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
        console.log(WebMidi.inputs);
        //console.log(WebMidi.outputs);
        var inputDevice = WebMidi.inputs[0];

			//listen to all incoming "note on" input events
			inputDevice.addListener('noteon', "all",

			function (e) {
				//Show what we are receiving.
				console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ") "+ e.note.number +".");
			});
    }
	});
}

function draw() {
  //console.log(e.note);
  fill(255, 204, 100);
  //if (typeof e !== 'undefined') {
    ellipse(50, 50, 80, 80);
  //}
}
