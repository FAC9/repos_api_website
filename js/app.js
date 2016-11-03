var randomPage = 0;
//var xhr = new XMLHttpRequest;
//xhr.addEventListener("load", function() {
var apikey = config.apikey;
var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1"

function makeRequest(url, cb) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          cb(null, httpRequest.responseText);
        } else {
          cb('There was a problem with the request.');
        }
      }
    };
    httpRequest.open('GET', url);
    httpRequest.send();
  }

function getNewMovieUrl(_, cb) {                              //gets total pages and URL for 'a suite' of movies (one page)
  makeRequest(url, function(err, res){
    // cb(null, moviesList[random(res.movies.length)])
    var apiResponse = JSON.parse(res);                            //converts JSON into a JS object
    var total_pages = apiResponse.total_pages;
    console.log(total_pages);                                    //extracts number of pages from object
    randomPage = Math.floor(Math.random() * (total_pages > 1000 ? 1000 : total_pages)) + 1;
    url += "&page=" + randomPage;                                 //sets url to choose just 1 page
    return cb(null, url);                                         //returns the callback with **URL AND RESULT**
  })
}

function getRandomMovie(url, cb) {                                // uses the url from previous and gets random movie.
    makeRequest(url, function(err, res){
      var apiResponse = JSON.parse(res);
      var moviesOnPage = apiResponse.results.length;
      console.log(moviesOnPage);
      var randomMovieIndex = Math.floor(Math.random() * moviesOnPage) + 1;
      console.log(randomMovieIndex);
      console.log(err, apiResponse.results[randomMovieIndex - 1].title);    //selects a random movie from the page of 20 and gets the title
    });
}

var waterfall = function(arg, tasks, cb) {
  console.log('in waterfall');
  console.log(arg);
  var next = tasks[0]
  var tail = tasks.slice(1)
  if (typeof next !== 'undefined') {
    console.log("in the if")
    next(arg, function(error, result) {
      console.log(arg);
      console.log('calling next');
      if (error) {
        cb(error)
        return ;
      }
      waterfall(result, tail, cb)
    })
    return ;
  }
  console.log('thinking type is undefined');
  return cb(null, arg)
}



var generateButton = document.getElementById("generateBtn");

generateButton.addEventListener("click", function() {

  show("page1","page2");    // Move out of generateButton event handler and create own event that happens when all dom is updated

  waterfall(url, [
    getNewMovieUrl,
    getRandomMovie
  ], function(error, result) {
    console.log('Test 1');
    if (error) {
      throw new Error('test failed with error: ' + error)
    }
  })
}
);

//page switcher function
function show(shown, hidden) {
  document.getElementById(shown).style.display='none';
  document.getElementById(hidden).style.display='block';
  return false;
}
