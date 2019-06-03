const apiURL = 'https://www.omdbapi.com/?apikey=aba065d3&';

const resultsContainer = document.getElementById("results-container");
/* createResultsList function is generating the tiles and adding data to them - Movie name, Movie Poster and Movie Type. */
function createResultsList(content) {
    /* Create a list as an overlay flex wrap to keep all the list items. Each movie tile is considered as a separate list item */
    var newList = document.createElement("ul");
    content.Search.forEach(element => {

        const newListItem = document.createElement("li");
        newListItem.setAttribute("id", element.imdbID);

        /*Creating div elements all li items*/
        const title = document.createElement("div");
        title.textContent = element.Title;
        title.setAttribute("class", "movie-title");

        const poster = document.createElement("img");
        poster.src = element.Poster;
        /*If the movie poster returns 404, we just print Movie Poster not available*/
        poster.alt = "Movie Poster not available";

        const type = document.createElement("div");
        type.textContent = element.Type;
        type.setAttribute("class", "movie-type");

        /*Adding the the 3 div elements created above to the li element*/
        newListItem.appendChild(title);
        newListItem.appendChild(poster);
        newListItem.appendChild(type);
        /* Adding mouseenter event listener to each of the list items for the hover behavior*/
        newListItem.addEventListener('mouseenter', handleMouseEnter);

        newList.appendChild(newListItem);
    });
    resultsContainer.appendChild(newList);
}

/* handleInput function is getting the value entered in the search bar and calling the api based on the input */
const handleInput = async function(evt) {
    if (evt.target.value === '') {
        return;
    }
    const response = await fetch(apiURL + `s=${evt.target.value}`);
    const content = await response.json();
    /* Return the api response to the document in case of an error*/
    if (content.Response === 'False') {
        resultsContainer.innerText = content.Error;
    } else {
        resultsContainer.innerHTML = "";
        createResultsList(content);
    }
}

/* handlMouseEnter function is capturing the hover behavior. Note that the api is only called when the item below the hover changes. */
let hoverId = '';
const handleMouseEnter = async function(evt) {
    if (evt.target.id !== hoverId) {
        hoverId = evt.target.id;
        const element = document.getElementById(evt.target.id);

        /* If the element does not have an attribute class(which it should have if the tooltip was called), only then call the api to retrive the tooltip data */
        if (!element.getAttribute("class")) {

            const response = await fetch(apiURL + `i=${evt.target.id}`);
            const content = await response.json();

            element.setAttribute("class", "tooltip");

            /*Creating div elements all tooltip fields*/
            var toolTip = document.createElement("div");
            toolTip.setAttribute("class", "tooltiptext");

            const title = document.createElement("div");
            title.textContent = 'Title -- ' + content.Title;

            const director = document.createElement("div");
            director.textContent = 'Director -- ' + content.Director;

            const rating = document.createElement("div");
            rating.textContent = 'IMDb Rating -- ' + content.imdbRating;

            const year = document.createElement("div");
            year.textContent = 'Year -- ' + content.Year;

            /*Appending all data to the toolTip*/
            toolTip.appendChild(title);
            toolTip.appendChild(director);
            toolTip.appendChild(rating);
            toolTip.appendChild(year);
            element.appendChild(toolTip);
        }
    }
}

/* Adding event listener to the search bar input field */
const search = document.getElementById('search');
search.addEventListener('input', handleInput);