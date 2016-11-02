var xhr = new XMLHttpRequest;
xhr.addEventListener("load", function() {
    var apiResponse = JSON.parse(xhr.responseText);

console.log(apiResponse);
  return apiResponse;
});

function getResults(url) {
  xhr.open("GET", url, true);
  xhr.send();
}
var apikey = config.apikey;
getResults("https://api.themoviedb.org/3/discover/movie?api_key=" + apikey + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1");
