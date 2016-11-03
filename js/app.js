var randomPage = 0;

var xhr = new XMLHttpRequest;

xhr.addEventListener("load", function() {
    var apiResponse = JSON.parse(xhr.responseText);

    var total_pages = apiResponse.total_pages;
    randomPage = Math.floor(Math.random() * total_pages) + 1;

console.log(apiResponse);
  return apiResponse;
});

function getResults(url) {
  xhr.open("GET", url, true);
  xhr.send();
}

var apikey = config.apikey;
console.log(apikey);
var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true"
getResults(url);
getResults(url + "&page=" + randomPage);
console.log(randomPage);
