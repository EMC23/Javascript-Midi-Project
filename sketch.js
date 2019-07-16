function setup() {
  // put setup code here
    WebMidi.enable(function (err) {
        if (err) {
                console.log("WebMidi could not be enabled.", err);
                } else {

                        console.log("WebMidi enabled!");
                        console.log(WebMidi.inputs);
                        //console.log(WebMidi.outputs);
                        // Retrieve an input by name, id or index
                        //var input = WebMidi.getInputByName("Launch Control");
                        var input = WebMidi.getInputById("input-0");
                   
                        input.addListener('controlchange', "all",
                            function (e) {
                              console.log("Received 'controlchange' message.", e.data[2]);
                         //        console.log("Received 'controlchange' message.", e);



                            }
                          );
                          // Check for the presence of an event listener (n such cases, you cannot use anonymous functions).
                          function test(e) { 
                            console.log(e);
                           }
                        //  input.addListener('programchange', 12, test);
                        input.addListener('controlchange', "all",function(e) {
                            console.log("value: " + e.value);
                            draw(e)
                        });
            }
        }
    );
}
function draw(e) {

if (typeof e !== 'undefined') {
ellipse(50, 50, 80, e.value);
}


}

