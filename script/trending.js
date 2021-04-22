//Variables
const api_key = "X8uVDVu0tjBEZczfVjzJRb12boFsrTVS"; //Api key from Giphy
const url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=10`; //Url with parameters
const slider = document.getElementById("slider"); //Trending slider
const icon_search = "./images/icon-busqueda-sin-resultado.svg";
const results_grid = document.getElementById("results_grid");
const more_btn = document.getElementById("more_btn");
const fav_img = "./images/icon-fav.svg";
const fav_add = "addFavorite";
const fav_remove = "removeFav";
const erase_gifo = "erase";
const fav = "fav";

/* ------------ Trending Gifos --------------- */

//Template for new gifo
function gifoBoxTemplate(gifo, leftButton, leftFunction, type) {
    return (
      `<div class="gifo" onclick="maxGifosMobile('${gifo.images.downsized.url}', '${gifo.id}', '${gifo.slug}', '${gifo.username}', '${gifo.title}')">
            <img class="gifo__img" src=${gifo.images.downsized.url} alt=${gifo.title} >
                <div class="gifo__hover">
                    <div class="gifo__buttons">
                        <button class="gifo__btn">
                            <img src=${leftButton} alt="${type}" class="${type}_btn" id="icon-${type}-${gifo.id}" onclick="${leftFunction}('${gifo.id}')">
                        </button>
                        <button class="gifo__btn">
                            <img src="./images/icon-download-hover.svg" alt="download" class="download_btn" onclick="downloadGifo('${gifo.images.downsized.url}', '${gifo.slug}')">
                        </button>
                        <button class="gifo__btn">
                            <img src="./images/icon-max-hover.svg" alt="fullsize" class="max_btn" onclick="maxGifosDesktop('${gifo.images.downsized.url}', '${gifo.id}', '${gifo.slug}', '${gifo.username}', '${gifo.title}')">
                        </button>
                    </div>
                    <div class="gifo__text">
                        <p>${gifo.username}</p>
                        <h6>${gifo.title}</h6>
                    </div>
                </div>
        </div>`
    )
  }

//No results in screen
function noResults(iconUrl, place, msg){
    place.innerHTML = "";
    let cont = document.createElement("div");
    cont.classList.add("error_msg");
    let text = document.createElement("p");
    text.classList.add("no_results_title");
    text.textContent = msg;
    let icon = document.createElement("img");
    icon.src = iconUrl;
    cont.appendChild(icon);
    cont.appendChild(text);
    place.appendChild(cont);
}

//Rendering Gifos
function renderAllGifos(arrayGifos, container, favButton, favFunction, type){
    let content = "";

    //First, verify if array of gifos is empty and render error
    if(arrayGifos.data.length == 0){
        container.classList.remove("grid");
        noResults(icon_search, results_grid, "Intenta con otra búsqueda");
        more_btn.classList.add("invisible");

    } else {
        //If array of gifos is not empty, render it
        for (const gifo of arrayGifos.data) {
            content += gifoBoxTemplate(gifo, favButton, favFunction, type);
            more_btn.classList.remove("invisible");
        }
        container.innerHTML += content;

        //If there are less than 12 results, hide "Ver más" button
        if(arrayGifos.pagination.total_count <= (arrayGifos.pagination.offset + 12)){
            more_btn.classList.add("invisible");
        }
    }
}

//Get data from API
function getSectionsData(url, container, favButton, favFunction, type){
    fetch(url)
        .then((response) => response.json())
        .then((content) => {
            console.log(content);
            renderAllGifos(content, container, favButton, favFunction, type);
        })
        .catch((error) => console.log("Gifo no encontrado: ", error));
};

  //Rendering Trending Gifos
  function renderTrendingGifos(arrayGifos, container, favButton, favFunction, type) {

    let content = "";

    for (const gifo of arrayGifos.data) {
        content += gifoBoxTemplate(gifo, favButton, favFunction, type);
    }
    container.innerHTML += content;

  }

//Get data from API
function getTrendingData(url, container, favButton, favFunction, type){
    fetch(url)
        .then((response) => response.json())
        .then((content) => {
            console.log(content);
            renderTrendingGifos(content, container, favButton, favFunction, type);
        })
        .catch((error) => console.log("Gifo no encontrado: ", error));
};

//Obtain the data from Giphy Api and send it to Trending section HTML
function trendings() {
    getTrendingData(url_trending, slider, fav_img, fav_add, fav);
};

trendings();

/* --------- End of Trending Gifos ----------- */

