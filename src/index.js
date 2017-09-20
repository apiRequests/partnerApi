
"use strict";
/**
 * es6 modules and imports
 */

import $ from "jquery";
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const getMovies = require('./getMovies.js');

const showNewList = () => {



getMovies().then((movies) => {
  let htmlStr = "<div>";

  movies.forEach(({title, rating, id}) => {
    htmlStr += `<h4><ul><li><span>${id}</span>: ${title} &nbsp &nbsp Rating: ${rating}
      <button class="delete">Delete</button></li></ul></h4>`;
  });

  htmlStr += "</div>";
  $("#allMovies").html(htmlStr);
  $(".movie-form").removeClass("hidden");
  $(".loader").hide();

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
};

 showNewList();

$("#insertBtn").click(function(event){
    event.preventDefault();
    let title=$("#formTitle").val();
    let rating=$("#formRating").val();
    let movie = {
    title: title,
    rating: rating,
    };
    // if(rating == ""){
    //     alert("Rate is required!");
    //     return;
    // }
    console.log(movie);

    fetch('/api/movies', {
        headers: {
            "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({title, rating})
    }).then( (response) => {
        response.json();
    } ).then( () => {
        showNewList();
        $("#formTitle").val("");
        $("#formRating").val("");
    })
});

$("#insertBtnUpdate").click(function(e){
    e.preventDefault();
    let id = document.getElementById('id').value;
    let title=$("#formTitleTwo").val();
    let rating=$("#formRatingTwo").val();

     if(id == ""){
         alert("ID is required!");
         return;
     }


    fetch(`/api/movies/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({title, rating})
    }).then( (response) => {
        response.json();
    } ).then( () => {
        showNewList();
        $("#formRatingTwo").val("");
        $("#formTitleTwo").val("");
        $("#id").val("");
    })
});

$("#allMovies").delegate(".delete", 'click', function(e){
    e.preventDefault();

    let id = e.target.parentElement.children[0].innerHTML;

    fetch(`/api/movies/${id}`, {
        headers: {
            "content-type": "application/json"
        },
        method: "DELETE",
        body: JSON.stringify({
            "id": id
        })
    }).then(() => {
        showNewList();
    })
});


