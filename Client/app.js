(function ($) {
  movies = []
  function processForm(e) {
    var dict = {
      Title: this["title"].value,
      Director: this["director"].value,
      Genre: this["genre"].value,
      Synopsis: this["synopsis"].value,
      RunTime: this["run  time"].value,
      ImageLocation: this["imagelocation"].value,
    };

    $.ajax({
      url: "https://localhost:44325/api/movie",
      dataType: "json",
      type: "post",
      contentType: "application/json",
      data: JSON.stringify(dict),
      success: function (data, textStatus, jQxhr) {
        $("#response pre").html(data);
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
      },
    });

    e.preventDefault();
  }

  $("#addForm").submit(processForm);

  function UpdateMovie(e) {
    var movie = {
      Title: this["title"].value,
      Director: this["director"].value,
      Genre: this["genre"].value,
      Synopsis: this["synopsis"].value,
      RunTime: this["run  time"].value,
      ImageLocation: this["imagelocation"].value,
    };
    $.ajax({
      url: "https://localhost:44325/api/movie",
      dataType: "json",
      type: "put",
      contentType: "application/json",
      data: JSON.stringify(movie),
      success: function (data, textStatus, errorThrown) {
        $("#response pre").html(data);
      },
      error: function (jqXhr, textStatus, jQxhr) {
        console.log(errorThrown);
      },
    }).then(function () {
      GetMovieList();
    });
    e.preventDefault();
  }
  $("#update-Form").submit(processForm);
  //$("#update-Form").submit(function (e){
  //e.preventDefault();
  //UpdateMovie();
  //});
  function SearchForm(e) {
    let filteredMovies = [];
    let searchMovieOptions = document.getElementById('select-option').value;
    let textInput = document.getElementById('text-input').value;
    switch (searchMovieOptions){
      case "title":
        filteredMovies = movies.filter(m => m.Title.includes(textInput));
        break;
        case "director":
        filteredMovies = movies.filter(m => m.Director.includes(textInput));
        break;
        case "genre":
        filteredMovies = movies.filter(m => m.Genre.includes(textInput));
        break;
        case "synopsis":
        filteredMovies = movies.filter(m => m.Synopsis.includes(textInput));
        break;
        case "run time":
        filteredMovies = movies.filter(m => m..includes(textInput));
        break;
        default:
          break;
    }
    $('.movieData'),html('');
    $.each(filteredMovies)

  }
  function GetMovieList(e) {
    $(document).ready(function (){
      $.ajax({
      url: "https://localhost:44325/api/movie",
      dataType: "json",
      type: "GET",
      
      success: function () {
        $('.movieData'.html(data);
      }
    })
    .then(function (data) {
      movies = data
      $.each(data, function(index,value){
        $('.movieData').append(
          '<tr>' + 
          '<td>' + value.title + '</td>' +
          '<td>' + value.genre + '</td>' +
          '<td>' + value.runTime + '</td>' +
          '<td>' + value.synopsis + '</td>' +
          '<td>' + value.director + '</td>' +
          '<tr>'
        );
      });
    });
   
  });
}$(document).ready(GetMovieList());

})(jQuery);

//$(function(){
//$.get("https://localhost:44325/api/movie", function(data){
//console.log(data);

//data.map(function(el){
//$("#Movies").append('<div> Movie Title: ${el.title} </div>
//<div> Movie Director: ${el.Director}</div>
//<br>');
//})
//})
//})
//$(function(){
//$.get('https://localhost:44325/api/movie $(#id)', function(data){
//console.log(data);

//data.map(function(el){
//$("#Movies").append('<div> Movie Title: ${el.title} </div>
//<div> Movie Director: ${el.Director}</div>
//<br>');
//})
//})
//})
