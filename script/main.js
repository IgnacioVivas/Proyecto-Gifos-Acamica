/* -------------------- Main JS ------------------ */

/* ---------------- Hamburguer Menu -------------- */
//Variables
const burger = document.getElementById("burger");
const burger_icon = document.getElementById("burger_icon");
const menu = document.getElementById("menu");

//When click on the burger button, it shows the menu
burger.addEventListener("click", ()=>{

    burger_icon.classList.toggle("fa-bars");
    burger_icon.classList.toggle("fa-times");
    menu.classList.toggle("invisible");
    menu.classList.toggle("visible");
})

/* ----------- End of Hamburguer Menu ------------ */

/* ------ Change in Navbar when scroll down ------ */

  //The debounce function receives our function as a parameter
  const debounce = (fn) => {
  //This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame;

  //The debounce function returns a new function that can receive a variable number of arguments
  return (...params) => {
    //If the frame variable has been defined, clear it now, and queue for next frame
    if (frame) { 
      cancelAnimationFrame(frame);
    }

    //Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      //Call our function and pass any params we received
      fn(...params);
    });

  }

};

// Reads scroll position and stores it in the data attribute
// so we can use it in SCSS
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

// Update scroll position for first time
storeScroll();

/* --- End of Change in Navbar when scroll down --- */

/* ----- Change of image in Navbar when hover ----- */
//Variable
const create_img = document.getElementById("create_img");

//Change of url when hover
create_img.addEventListener("mouseover", ()=> {
  //First, validate if body has dark mode class or not
  if(body.classList == "") {
    create_img.src = "./images/CTA-crear-gifo-hover.svg";
  } else {
    create_img.src = "./images/CTA-crear-gifo-hover-modo-noc.svg";
  }
});

//Return of the original url when mouseout
create_img.addEventListener("mouseout", ()=> {
  if(body.classList == "") {
    create_img.src = "./images/button-crear-gifo.svg";
  } else {
    create_img.src = "./images/CTA-crear-gifo-modo-noc.svg";
  }
});

/* -- End of Change of image in Navbar when hover -- */

/* ------------------ Dark Mode -------------------- */
//Variables
const theme_btn = document.getElementById("theme_btn");
const body = document.getElementById("body");
const logo = document.getElementById("logo");
const camera = document.getElementById("camera");
const film_reel = document.getElementById("film_reel");
const theme_link = document.getElementById("theme_link");

// When click on "MODO NOCTURNO" link, apply dark mode
theme_btn.addEventListener("click", (e)=> {
  e.preventDefault();
  //First, we validate if dark mode is not already applied
  if(body.classList == ""){
    //Apply dark mode
    body.classList.add("dark");
    //Dark mode create img
    create_img.src = "./images/CTA-crear-gifo-modo-noc.svg";
    //Dark mode logo
    logo.src = "./images/Logo-modo-noc.svg";
    //Dark mode images in Create Section
    camera.src ="./images/camara-modo-noc.svg";
    film_reel.src = "./images/pelicula-modo-noc.svg";
    //Change in link to "MODO DIURNO" text
    theme_link.textContent = "Modo diurno";
  } else {
    //If dark mode is applied, when click on the link, we remove it
    body.classList.remove("dark");
    //Light mode create img
    create_img.src = "./images/button-crear-gifo.svg";
    //Light mode logo
    logo.src = "./images/logo-mobile.svg";
    //Light mode images in Create Section
    camera.src ="./images/camara.svg";
    film_reel.src = "./images/pelicula.svg";
    //Change in link to "MODO NOCTURNO" text
    theme_link.textContent = "Modo nocturno";
  }
})
/* -------------- End of Dark Mode ----------------- */

/* ------------- Reload Landing Page --------------- */

// When click logo, reload page, show Hero, hide Favorites and My Gifos
logo.addEventListener("click", ()=> {
  //reload page
  location.reload();

});

/* ---------- End of Reload Landing page ----------- */

/* ---- Go to the Top When Click on Menu Links ----- */
let intervalId = 0; // Needed to cancel the scrolling when we're at the top of the page

function scrollStep() {
    // Check if we're at the top already. If so, stop scrolling by clearing the interval
    if (window.pageYOffset === 0) {
        clearInterval(intervalId);
    }
    //Go to the top
    window.scroll(window.pageYOffset, 0);
}

/* - End of Go to the Top when Click on Menu Links - */

/* ------------ Show Favorites Section ------------- */
//Variables
const fav_link = document.getElementById("fav_link");
const favorites = document.getElementById("favorites");
const hero = document.getElementById("hero");
const results = document.getElementById("results");
const create = document.getElementById("create");

// When click on "FAVORITOS" link, hide Hero, My Gifos, Create and show Favorites Section
fav_link.addEventListener("click", (e)=> {
  e.preventDefault();
  scrollStep(); //Go to the top
  hero.classList.add("hide");
  results.classList.add("hide");
  my_gifos.classList.add("hide");
  create.classList.add("hide");
  favorites.classList.remove("hide");
  renderFavorites();
});

/* -------- End of Show Favorites Section ----------- */

/* ------------- Show My Gifos Section -------------- */
//Variables
const my_gifos_link = document.getElementById("my_gifos_link");
const my_gifos = document.getElementById("my_gifos");

// When click on "MY GIFOS" link, hide Hero, Favorites, Create and show My Gifos Section
my_gifos_link.addEventListener("click", (e)=> {
  e.preventDefault();
  scrollStep(); //Go to the top
  hero.classList.add("hide");
  results.classList.add("hide");
  favorites.classList.add("hide");
  create.classList.add("hide");
  my_gifos.classList.remove("hide");
  renderMyGifos();
});

/* --------- End of Show My Gifos Section ----------- */

/* ----------- Show Create Gifos Section ------------ */
//Variables
const create_link = document.getElementById("create_link");
const trending = document.getElementById("trending");

// When click on create image, hide Hero, Favorites, Trending and show Create Section
create_link.addEventListener("click", (e)=> {
  e.preventDefault();
  scrollStep(); //Go to the top
  hero.classList.add("hide");
  results.classList.add("hide");
  favorites.classList.add("hide");
  trending.classList.add("hide");
  my_gifos.classList.add("hide");
  create.classList.remove("hide");
});

/* -------- End of Show Create Gifos Section --------- */

/* --------- Trending Section Slider Mobile ---------- */
//Variables
const trendslider = document.getElementById("trendslider");
let start;
let change;

/* --- Touch events in mobile devices --- */

//Grab the start event of touch on screen
trendslider.addEventListener("touchstart", (e)=> {
  start = e.touches[0].clientX;
});

//Grab the slide of the finger on screen
trendslider.addEventListener("touchmove", (e)=> {
  e.preventDefault();
  //initial position
  let touch = e.touches[0];
  //calculate the slide on screen
  change = start - touch.clientX;
});

//Grab the final event of touch on screen
trendslider.addEventListener("touchend", slideShow);

/*   End of Touch events in mobile devices   */

//Function slide of container to the left
function slideShow(){
  if(change > 0){
      trendslider.scrollLeft += 200;
  } else {
      trendslider.scrollLeft -= 200;
  }
};

/* --------- End of Trending Slider Mobile ----------- */

/* --------- Trending Section Slider Desktop --------- */
//Variables
const prev_btn = document.getElementById("prev");
const next_btn = document.getElementById("next");

//Prev Button
prev_btn.addEventListener("click", (e)=> {
  e.preventDefault();
  trendslider.scrollLeft -= 300;
});

//Next Button
next_btn.addEventListener("click", (e)=> {
  e.preventDefault();
  trendslider.scrollLeft += 300;
});

/* --------- End of Trending Slider Desktop ---------- */

/* ----------------- End of Main JS ------------------ */