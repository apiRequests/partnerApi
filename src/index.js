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

getMovies().then((movies) => {
  let htmlStr = "<div>";

  movies.forEach(({title, rating, id}) => {
    htmlStr += `<h3>id#${id} - ${title} - rating: ${rating}</h3>`;
  });
  htmlStr += "</div>";
  $("body").html(htmlStr);

}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});
