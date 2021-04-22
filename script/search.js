/* ------------------------ Search JS ---------------------- */

//Variables
const search_input = document.getElementById("search_input");
const search_btn = document.getElementById("search_btn");
const right_btn = document.getElementById("right_btn");
const right_icon = document.getElementById("right_icon");
const results_title = document.getElementById("results_title");
const url_search = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key;
const url_suggestions = "https://api.giphy.com/v1/tags/related/";
let autoComp = document.getElementById("autocomplete_content");
let offset = 0;
let value = "";

//Obtain the data from Giphy Api and send it to Results Section HTML
function searchGifos() {

    event.preventDefault(); //Prevent reloading
    results_grid.innerHTML = ""; //Empty results container
    value = search_input.value.trim(); //Grab the searching words
    results.classList.remove("hide"); //Show Results section
    results_title.textContent = value; //Show searching words in Section Title
    
    const search = url_search + "&limit=12&q=" + value + "/"; //Add searching words to url
    console.log(search);
    getSectionsData(search, results_grid, fav_img, fav_add, fav); //Obtain data from API and render results in HTML

    closeAutocompleteSection(); //Close suggested search terms in input
}

/* ---------- Autocomplete with search suggestions ---------- */

//Bring search suggestions when user is writing in input
search_input.addEventListener("keyup", () => {

    //First, grab search input value
    value = search_input.value;

    //Then, validate if input is not empty
    if (value.length >= 1) {

        //Styles of container and buttons
        showAutocompleteSection();

        //Get data from api, up to 3 results
        fetch(`${url_suggestions}${value}?api_key=${api_key}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            suggestedTerms(data);
          })
          .catch(err => {
            console.error("Suggested terms not found: ", err);
          }) 
    } else {

        //Close autocomplete section
        closeAutocompleteSection();

      }
    
});

//Show Autocomplete Section
function showAutocompleteSection() {

  autoComp.style.display = "block"; //Show autocomplete section
  right_icon.classList.remove("fa-search"); //Remove glass icon in the right button
  right_icon.classList.add("fa-times"); //Add cross icon in the right button
  search_btn.classList.remove("hide"); //Show left button with grey glass icon

};

//Render search suggested terms
function suggestedTerms(terms) {

    let suggested = terms.data;
    autoComp.innerHTML = `
    <li class="suggested"> <i class="fas fa-search"></i> <p class="suggested__text">${suggested[0].name}</p></li>
    <li class="suggested"> <i class="fas fa-search"></i> <p class="suggested__text">${suggested[1].name}</p></li>
    <li class="suggested"> <i class="fas fa-search"></i> <p class="suggested__text">${suggested[2].name}</p></li>
    `

};

//Hide Autocomplete Search Section
function closeAutocompleteSection() {

    autoComp.style.display = "none"; //Hide autocomplete section
    right_icon.classList.remove("fa-times"); //Remove cross icon in the right button
    right_icon.classList.add("fa-search"); //Add glass icon in the right button
    search_btn.classList.add("hide"); //Hide left button with grey glass icon

};
/* ------- End of Autocomplete with search suggestions ------- */

/* -------- Search with suggestions from autocomplete -------- */

//Search
autoComp.addEventListener("click", (li) => {
    search_input.value = li.target.textContent;
    searchGifos();
});

//Cancel search
right_btn.addEventListener("click", (e)=> {
    search_input.value = ""; //Empty input value
    search_input.placeholder = "Busca GIFOS y más"; //Put placeholder again
    closeAutocompleteSection(); //Close autocomplete section
});

//Search begins either with click on grey glass icon or enter key
search_btn.addEventListener("click", searchGifos);
search_input.addEventListener("keyup", (e)=> {
  if(e.keyCode === 13) {
    searchGifos();
  }
});

/* ----- End of search with suggestions from autocomplete ---- */

/* -------- Bring next results with "Ver más" button --------- */

more_btn.addEventListener("click", (e)=> {

  e.preventDefault();
  seeMoreResults();

})

//Render next 12 results
function seeMoreResults() {

  offset = offset + 12;
  value = search_input.value.trim();
  let search_more = url_search + "&limit=12&q=" + value + "&offset=" + offset;
  getSectionsData(search_more, results_grid, fav_img, fav_add, fav);

}

/* ----- End of Bring next results with "Ver más" button ----- */

/* ---------- Search with click on Trending Topics ----------- */


let trend_topics = document.getElementById('trend_topics');
window.onload = trendingTopics();

//Get from API the first five trending topics and send them to HTML
function trendingTopics() {
    let url = `https://api.giphy.com/v1/trending/searches?api_key=${api_key}`;

    return fetch(url)
        .then(resp => resp.json()) //Convert data to JSON
        .then(gifoWords => {
            console.log(gifoWords);
            let topics = gifoWords.data;
            //console.log("Trending Topics", topics);
            trend_topics.innerHTML = `
            <p class="trending__links">${topics[0]}</p>, 
            <p class="trending__links">${topics[1]}</p>, 
            <p class="trending__links">${topics[2]}</p>, 
            <p class="trending__links">${topics[3]}</p>, 
            <p class="trending__links">${topics[4]}</p>`;
            
            let topic_btns = document.getElementsByClassName('trending__links');
            for (let x = 0; x < topic_btns.length; x++) {
                topic_btns[x].addEventListener('click', function (e) {
                    search_input.value = topics[x];
                    searchGifos();
                })
            }
        })
        .catch(err => {
            console.log("error trending topics" + err);
        })
}
/* ------ End of search with click on Trending Topics -------- */

/* -------------------- End of Search JS --------------------- */