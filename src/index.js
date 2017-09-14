
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
    htmlStr += `<h3>movie${id} = ${title} - rating: ${rating}</h3>
    <button>Edit</button>
    <button>Delete</button>`;

  });
  htmlStr += "</div>";
  $(".all-movies").html(htmlStr);
  $(".movie-form").removeClass("hidden");
  $(".loader").hide();

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

};

showNewList();
//insertBtn id
//
// $().click(function(){
//
// };


$("#insertBtn").click(function(e){
    e.preventDefault();
    let title=$("#formTitle").val();
    let rating=$("#formRating").val();

    let movie = {
    title: title,
    rating: rating,
    };
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
    })
});



