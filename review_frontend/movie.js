const APILINK = "http://127.0.0.1:5500/API/v1/reviews/"; //const to specify where the API is



//update the movie titles list depending on the results from query
const main = document.getElementById("section");



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
            title.innerHTML = `${element.title}`;
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



