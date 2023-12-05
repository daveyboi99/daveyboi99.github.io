const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=38dff8d32ce43a4eb3fbc2d6112951e5&page=1"; //const to specify where the API is
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"; //const to specifiy where the movie thumbnail path is, this is the root path of all of the images
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=38dff8d32ce43a4eb3fbc2d6112951e5&query="; //const resulting answer from query to API



//update the movie titles list depending on the results from query
const main = document.getElementById("section");
//taking the user input from user to create a query to the db
const form = document.getElementById("form");
const search = document.getElementById("query");


rvMovies(APILINK)
//fxn that returns resulting movies from query
function rvMovies(url)
{
    //fetch(url) starts the process of fetching a resource from the server
    //the url is the path of the resource we want to fetch

    //the .then is a call back fxn of the promise api (in this case being fetch), it either returns
    //an obj if successfull or unsuccesfull
    //in this case we only have one arg, we're only concerned on what happens during success
    //=> is a short hand notation for defining functions in js
    //this case res is the obj of the http response from the query
    //read the respone using .json and then set it to res
    //then afterwards take it and pass it on to the function "data"
    fetch(url).then(res => res.json())
    .then(function(data)
    {   //in this case, data is an obj with a key results 
        //that basically each of the movies information
        console.log(data.results); //print out the resulting data
        data.results.forEach(element => {
            //here we're creating html elements using javascript
            //we do so here because we need to dynamically change each individual element
            //for each thumbnail we get for each query
            const div_card = document.createElement("div"); //creating a div element for each movie that gets returned
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class','row' );

            const div_column = document.createElement('div');
            div_column.setAttribute('class','column');
            
            const image = document.createElement("img");
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');

            const title = document.createElement("h3");
            title.setAttribute('id', 'title');

            const center = document.createElement('center');
            
            //$ makes element.title a string, recall that anything in {} is an obj
            title.innerHTML = `${element.title}<br> <a href="movie.html?id=${element.id}&title=${element.title}>"reviews</a>`;
            //we have to append the poster path to the image path 
            //because the IMG_PATH is the root path
            image.src = IMG_PATH + element.poster_path;

            //appendding children element to their respective
            //parent element
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}

//we classify the user searching for a movie as an event
//here we're adding an event listener to the form


//here the first arg passed in is the event type, in this case being "submit"
//the "submit" eevent fires on the <form> itself 
//the submit event fires when the user clicks a submit button or presses enter while editing a field in a form
//the second parameter is the actual event,e
//
form.addEventListener("submit", (e) => {
    //prevent default method cancels the event if its cancelable, that means the default action 
    //that belongs to the event will never occur, in this case being that it prevents the form from being submitted
    //if the form gets submitted, the page refreshes and we cannot handle nor process the form correctly
    e.preventDefault();
    //doing this replaces the current movie titles to the new ones
    main.innerHTML= "";
    //.search is from the html element "search"
    const searchItem = search.value;
    //if the user actually searched for a movie
    //we call rvMovies() to actually update the movie titles on the webpage
    if(searchItem)
    {
        //passing in the search api, which is the root directory of the all the movies
        //and then append the searched items
        rvMovies(SEARCHAPI + searchItem);
        search.value = ""; //clear the search value after searching for it
    }
});





