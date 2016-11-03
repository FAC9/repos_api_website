//Checking that the files and links are set up correctly to test:
QUnit.test( "Initial test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

// Checking that the HTML elements are present:
QUnit.test( "Test for action button", function( assert ) {
  var actual = document.getElementById("action").innerHTML;
  assert.ok(actual === 'Action', "Action button exists" );
});

QUnit.test( "Test for animation button", function( assert ) {
  var actual = document.getElementById("animation").innerHTML;
  assert.ok(actual === 'Animation', "Animation button exists" );
});

QUnit.test( "Test for comedy button", function( assert ) {
  var actual = document.getElementById("comedy").innerHTML;
  assert.ok(actual === 'Comedy', "Comedy button exists" );
});

QUnit.test( "Test for family title", function( assert ) {
  var actual = document.getElementById('family').innerHTML;
  assert.ok(actual === 'Family', "Family button exists" );
});

QUnit.test( "Test for horror button", function( assert ) {
  var actual = document.getElementById('horror').innerHTML;
  assert.ok(actual === 'Horror', "Horror button exists" );
});

QUnit.test( "Test for romance button", function( assert ) {
  var actual = document.getElementById("romance").innerHTML;
  assert.ok(actual === 'Romance', "Romance button exists" );
});

QUnit.test( "Test for scifi button", function( assert ) {
  var actual = document.getElementById("scifi").innerHTML;
  assert.ok(actual === 'SciFi', "Scifi button exists" );
});

QUnit.test( "Test for thriller button", function( assert ) {
  var actual = document.getElementById('thriller').innerHTML;
  assert.ok(actual === 'Thriller', "Thriller button exists" );
});

QUnit.test( "Test for release date title", function( assert ) {
  var actual = document.getElementById('releaseDateTitle').innerHTML;
  assert.ok(actual === 'Release Date', "Release date title exists" );
});

QUnit.test( "Test for genre title", function( assert ) {
  var actual = document.getElementById('genreTitle').innerHTML;
  assert.ok(actual === 'Genre', "Genre title exists" );
});

QUnit.test( "Test for rating date title", function( assert ) {
  var actual = document.getElementById('ratingTitle').innerHTML;
  assert.ok(actual === 'Rating', "Rating title exists" );
});

QUnit.test( "Test for generate button",  function( assert ) {
  var actual = document.getElementById('generateBtn').innerHTML;
  assert.ok(actual === 'Generate', "Generate button exists" );
});

QUnit.test( "Test for 2016 button", function( assert ) {
  var actual = document.getElementById("2016").innerHTML;
  assert.ok(actual === '2016', "2016 button exists" );
});

QUnit.test( "Test for 2015 button", function( assert ) {
  var actual = document.getElementById("2015").innerHTML;
  assert.ok(actual === '2015', "2015 button exists" );
});

QUnit.test( "Test for 2010-2014 button", function( assert ) {
  var actual = document.getElementById("2010-2014").innerHTML;
  assert.ok(actual === '2010-2014', "2010-2014 button exists" );
});

QUnit.test( "Test for 00 button", function( assert ) {
  var actual = document.getElementById('00').innerHTML;
  assert.ok(actual === "00's", "00 button exists" );
});

QUnit.test( "Test for 90 button", function( assert ) {
  var actual = document.getElementById('90').innerHTML;
  assert.ok(actual === "90's", "90 button exists" );
});

QUnit.test( "Test for 80 button", function( assert ) {
  var actual = document.getElementById("80").innerHTML;
  assert.ok(actual === "80's", "80 button exists" );
});

QUnit.test( "Test for 8+ button", function( assert ) {
  var actual = document.getElementById("8").innerHTML;
  assert.ok(actual === '8+', "8+ button exists" );
});

QUnit.test( "Test for 7+ button", function( assert ) {
  var actual = document.getElementById('7').innerHTML;
  assert.ok(actual === '7+', "7+ button exists" );
});

QUnit.test( "Test for 6+ button", function( assert ) {
  var actual = document.getElementById('6').innerHTML;
  assert.ok(actual === '6+', "6+ button exists" );
});

QUnit.test( "Test for 5+ button", function( assert ) {
  var actual = document.getElementById('5').innerHTML;
  assert.ok(actual === '5+', "5+ button exists" );
});
