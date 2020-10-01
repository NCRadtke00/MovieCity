function processForm() {
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

function UpdateMovie() {
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

function SearchForm() {
  let filteredMovies = [];
  let searchMovieOptions = document.getElementById("select-option").value;
  let textInput = document.getElementById("text-input").value;
  let intInput = document.getElementById("int-input").value;
  switch (searchMovieOptions) {
    case "title":
      filteredMovies = movies.filter((m) => m.Title.includes(textInput));
      break;
    case "director":
      filteredMovies = movies.filter((m) => m.Director.includes(textInput));
      break;
    case "genre":
      filteredMovies = movies.filter((m) => m.Genre.includes(textInput));
      break;
    case "synopsis":
      filteredMovies = movies.filter((m) => m.Synopsis.includes(textInput));
      break;
    case "run time":
      filteredMovies = movies.filter((m) => m.includes(intInput));
      break;
    default:
      break;
  }
  $(".movieData").html("");
  $.each(filteredMovies, function (index, value) {
    $(".movieData").append(
      "<tr>" +
        "<td>" +
        value.title +
        "</td>" +
        "<td>" +
        value.genre +
        "</td>" +
        "<td>" +
        value.runTime +
        "</td>" +
        "<td>" +
        value.synopsis +
        "</td>" +
        "<td>" +
        value.director +
        "</td>" +
        "<tr>"
    );
  });
  e.preventDefault();
}
$("#searchForm").submit(SearchForm);

function GetMovieList() {
  $.ajax({
    url: "https://localhost:44325/api/movie",
    dataType: "json",
    type: "GET",
    data: JSON.stringify(),
    success: function (data) {
      MovieSucess(data);
    },
  });
}
function MovieSucess(data) {
  movies = data;
  $(".movieData").html("");
  data.forEach((value) => {
    $(".movieData").append(
      "<ul>" + 
      "<li>" + 
      value.title + 
      "</li>" + 
      "<li>" + 
      value.director +
       "</li>" + 
       "<li>" + 
       value.genre + 
       "</li>" + 
       "<li>" + 
       value.synopsis + 
       "</li>" + 
       "<li>" + 
       value.runTime + 
       "</li>" + 
       "</ul>"
    );
  });
}
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
