//global variables
var currentMovie = {
  id: 0,
  title: "",
  summary: "",
  releaseYear: 0,
  length: 0,
  rating: 0,
  gif: ""
};

var apikey = config.apikey;
var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1"

//standard xmlhttmp request (reusable)
function makeRequest(url, cb) {
  console.log("url: ",url);
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

var waterfall = function(arg, tasks, cb) {
  var next = tasks[0]
  var tail = tasks.slice(1)
  if (typeof next !== 'undefined') {
    next(arg, function(error, result) {
      if (error) {
        cb(error)
        return ;
      }
      waterfall(result, tail, cb)
    })
    return ;
  }
  return cb(null, arg)
}

//get passed into waterfall
function getNewMovieUrl(_, cb) {
  makeRequest(url, function(err, res){
    var apiResponse = JSON.parse(res);
    var total_pages = apiResponse.total_pages; //get total number of pages for api query
    var randomPage = Math.floor(Math.random() * (total_pages > 1000 ? 1000 : total_pages)) + 1;
    url += "&page=" + randomPage; //adds parameter to url to randomise search results
    return cb(null, url);
  });
}

function getRandomMovie(url, cb) {
  var movie={};
  makeRequest(url, function(err, res){
    var apiResponse = JSON.parse(res);
    var moviesOnPage = apiResponse.results.length;
    var randomMovieIndex = Math.floor(Math.random() * moviesOnPage) + 1;
    movie = apiResponse.results[randomMovieIndex - 1];
    return cb(null, movie.id);
  });
}

function getMovieDetails(id, cb){
  var movieUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apikey + "&language=en-US";
  makeRequest(movieUrl, function(err, res){
    var apiResponse = JSON.parse(res);
    parseMovieDetails(apiResponse);
    console.log(currentMovie);
    return cb(null, currentMovie.title);
  });
}

function getGiphy(title, cb){
  var gurl = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=movie+" + title;
  console.log(gurl, "GURRRLL");
  makeRequest(gurl, function(err, res){
    var apiResponse = JSON.parse(res);
    currentMovie.gif = apiResponse.data.fixed_height_downsampled_url;
    return cb(null, currentMovie);
  });
}

//triggered by dom event listeners
function updateDomWithMovieDetails(arg, cb){

  document.getElementById("filmPoster").src = currentMovie.gif;
  document.getElementById("movieTitle").innerHTML = currentMovie.title;
  document.getElementById("summary").innerHTML = truncateSummary();
  document.getElementById("year").innerHTML = "Year: " + currentMovie.releaseYear;
  document.getElementById("length").innerHTML = "Length: " + currentMovie.length;
  document.getElementById("movRating").innerHTML = "Viewer rating: " + currentMovie.rating;
  enableButton();
  return cb(null, currentMovie.id);
}

//helper functions
function parseMovieDetails(movie){
  currentMovie.id = movie.id;
  currentMovie.title= movie.title;
  currentMovie.summary = movie.overview;
  currentMovie.releaseYear = (movie.release_date.split("-"))[0];
  currentMovie.length = movie.runtime + " mins";
  currentMovie.rating = movie.vote_average + " / 10";
}

function buildUrl(){
  addGenres();
  addYears();
  addRating();
}

function addGenres(){
  var arr = filterClicked(document.getElementsByClassName("genre-filter"));
  if(!arr.length){
    return;
  }
  var counter = 0;
  url += "&with_genres=";
  for(i=0; i<arr.length; i++){
        if(counter==0){
        counter++;
        url += arr[i].value;
      } else {
        url+=","+arr[i].value;
      }
    }
    return;
}

function addYears(){
  var arr = filterClicked(document.getElementsByClassName("year-filter"));
  console.log(arr);
  if(!arr.length){
    return;
  }
  var year = arr[0].value;
  if(year == "2016"){
    url += "&release_date.gte=2016-01-01";
    console.log('wtf?');
  } else if(year == "2010"){
    url += "&release_date.gte=2010-01-01&release_date.lte=2015-12-31";
  } else {
    url += "&release_date.gte="+year+"-01-01&release_date.lte="+(parseInt(year)+9)+"-12-31";
  }
  return;
}

function addRating(){
  var arr = filterClicked(document.getElementsByClassName("rating-filter"));
  if(!arr.length){
    return;
  }
  var rating = arr[0].value;
  url+="&vote_average.gte="+rating;
  return;
}

function filterClicked(arr){
  var filtered = [];
  for(i=0; i<arr.length; i++){
    if(arr[i].checked) {
      filtered.push(arr[i]);
    }
  }
  return filtered;
}

function truncateSummary() {
  var fullText = currentMovie.summary;
  var truncated = fullText.length <= 150 ? fullText : fullText.slice(0, 150).trim() + "...&nbsp;&nbsp;";
  document.getElementById("summary-more").style.display = fullText.length <= 150 ? "none" : "inline";
  return truncated;
}

//MODAL CODE
var modal = document.getElementById('myModal');
var btn = document.getElementById("plus");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// nav buttons
var backBtn = document.getElementById("back");
backBtn.addEventListener("click", function() {
  show("page2","page1");
});


var generateAll = [];
generateAll.push(document.getElementById("generateBtn1"));
generateAll.push(document.getElementById("generateBtn2"));


generateAll.forEach(function(element) {
  element.addEventListener("click", function() {
    disableButton();
    show("page1", "page2");
    buildUrl();
    waterfall(url, [
      getNewMovieUrl,
      getRandomMovie,
      getMovieDetails,
      getGiphy,
      updateDomWithMovieDetails
    ], function(error, result) {
      if (error) {
        throw new Error('test failed with error: ' + error)
      }
    });
  });
});

function show(shown, hidden) {
  document.getElementById(shown).style.display='none';
  document.getElementById(hidden).style.display='block';
  return false;
}


var filters2 = document.getElementById("filters-part-2");
var filtPopUpBtn = document.getElementById("filtz");
var sum = document.getElementById("stats");     //hides summary when opening filters on page 2

filtPopUpBtn.addEventListener("click", function() {
  if(filters2.style.display === "none") {
    filters2.style.display = "block";
    filtPopUpBtn.innerHTML = "Hide filters";
    sum.style.display = "none";
  }
  else {
    filters2.style.display ="none";
    filtPopUpBtn.classList.remove('filters-showing');
    sum.style.display = "block";
    filtPopUpBtn.innerHTML = "Show filters";
  }
  return false;
});

function disableButton() {
  var genButtons = document.querySelectorAll(".generateMain");
  genButtons.forEach(function(b) {
    b.innerHTML = 'getting movie...';
    b.disabled = true;
  })
}

function enableButton() {
  var genButtons = document.querySelectorAll(".generateMain");
  genButtons.forEach(function(b) {
    b.innerHTML = "Generate";
    b.disabled = false;
  })
}


document.getElementById("summary-more").addEventListener("click", function() {
  var truncated = this.innerHTML == "See more";
  document.getElementById("summary").innerHTML = !!(truncated) ? (currentMovie.summary + "&nbsp;&nbsp;") : truncateSummary();
  this.innerHTML = !!(truncated) ? "See less" : "See more";
})
