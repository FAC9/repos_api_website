
//Checking that the files and links are set up correctly to test:
QUnit.test( "Initial test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

// Example tets that check that HTML elements are present:
QUnit.test( "Test for start button", function( assert ) {
  var actual = document.getElementById("startButton").innerHTML;
  assert.ok(actual === 'Start', "Start button exists" );
});

// Example tests that check that js funtions are working:
QUnit.test( "Test start button function", function( assert ) {
  var done = assert.async();
  startWatch();
  window.setTimeout(function(){
    var time = document.getElementById('watch').innerHTML;
    assert.ok(time != '00:00:00:00', "start button triggers time" );
    stop();
    done();
  },500);
});

QUnit.test( "Test startCount variable", function( assert ) {
  startWatch();
  var done = assert.async();
  window.setTimeout(function(){
    var time = document.getElementById('watch').innerHTML;
    stop();
    reset();
    var newTime = document.getElementById('watch').innerHTML;
    assert.ok(startCount === 0, "startCount is equal to 0" );
    done();
  },500);
});
