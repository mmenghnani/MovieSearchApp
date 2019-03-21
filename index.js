
const resultsContainer = document.getElementById("results-container");
function createResultsList (content) { 
  var newList = document.createElement("ul"); 
  content.Search.forEach(element => {
      const newListItem = document.createElement("li");
      newListItem.setAttribute("id",element.imdbID);
      const title = document.createElement("div");
      title.textContent = element.Title;
      title.setAttribute("class", "movie-title");
      const poster = document.createElement("img");
      poster.src = element.Poster;
      poster.alt = "movie poster";
      const type = document.createElement("div");
      type.textContent = element.Type;
      type.setAttribute("class", "movie-type");
      newListItem.appendChild(title);
      newListItem.appendChild(poster);
      newListItem.appendChild(type);
      newListItem.addEventListener('mouseenter',handleMouseEnter);
      newList.appendChild(newListItem);  
    });
  resultsContainer.appendChild(newList);
}

const handleInput = async function (evt) {
  if (evt.target.value === '') {
    return;
  }
  const response = await fetch(`https://www.omdbapi.com/?apikey=aba065d3&s=${evt.target.value}`);
  const content = await response.json();
  if(content.Response === 'False'){
    resultsContainer.innerText = content.Error; 
  }
  else {
    resultsContainer.innerHTML = "";
    createResultsList(content);
    }
}

let hoverId = '';
const handleMouseEnter = async function (evt) {
   if (evt.target.id !== hoverId) {
      hoverId = evt.target.id;
      const element = document.getElementById(evt.target.id);
      if(!element.getAttribute("class")) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=aba065d3&i=${evt.target.id}`);
        const content = await response.json();
        element.setAttribute("class","tooltip");
        var toolTip = document.createElement("div");
        toolTip.setAttribute("class","tooltiptext");
        const title = document.createElement("div");
        title.textContent = 'Title - '+ content.Title;
        const director = document.createElement("div");
        director.textContent = 'Director -'+ content.Director;
        const rating = document.createElement("div");
        rating.textContent = 'Rating - '+ content.imdbRating;
        const year = document.createElement("div");
        year.textContent = 'Year -' + content.Year;
        toolTip.appendChild(title);
        toolTip.appendChild(director);
        toolTip.appendChild(rating);
        toolTip.appendChild(year);
        element.appendChild(toolTip);
      }
   }
}
  
const search = document.getElementById('search');
search.addEventListener('input', handleInput);