/* ---------------------- Modal JS -------------------- */
//Variables
const max_btn = document.querySelectorAll(".max_btn");
const download_btn = document.querySelectorAll(".download_btn");
let modal;

/* --------------- Maximize Gifo Mobile -------------- */

//Maximize image Mobile: When click on gifo´s image
//When clicking on any gifo, maximize it
function maxGifosMobile(img, id, slug, user, title) {
    //First, validate if it´s mobile size
    if (window.matchMedia("(max-width: 899px)").matches) {
        maxGifos(img, id, user, title);
    }
};

/* ----------- End of Maximize Gifo Mobile ----------- */


/* --------------- Maximize Gifo Desktop -------------- */

//Maximize image Desktop: When click on maximize button
//When clicking on max button of any gifo, maximize it
function maxGifosDesktop(img, id, slug, user, title) {
    //First, validate if it´s desktop size
    if (window.matchMedia("(min-width: 900px)").matches) {
        maxGifos(img, id, user, title);
    }
}; 

/* ----------- End of Maximize Gifo Desktop ----------- */

//Maximize gifo (function)
function maxGifos(img, id, slug, user, title) {

    modal = document.createElement("div"); //Create general container
    modal.classList.add("modal"); //Class with styles
    modal.innerHTML = ` 
    <div class="modal__container">
            <button class="close_modal_btn" onclick="closeMaxGifos()"><i class="fas fa-times"></i></button>
            <img src="${img}" alt="${id}" class="modal__img">
            <div class="modal__info">
                <div class="modal__text">
                    <p class="modal__user">${user}</p>
                    <p class="modal__title">${title}</p>
                </div>
                <div>
                    <button class="fav_btn" onclick="addFavorite('${id}')"><img src="./images/icon-fav-hover.svg" alt="fav-gif" id="icon-fav-${id}"></button>
                    <button class="download_btn" onclick="downloadGifo('${img}', '${slug}')"><img src="./images/icon-download.svg" alt="download-gif"></button>
                </div>
            </div>
        </div>
    `; //Add container with data received from api
    document.body.appendChild(modal); //Send everything to HTML

}

//Close maximized gifo (function)
function closeMaxGifos(){
    document.body.removeChild(modal); //Eliminates modal container
}

/* ----------------- End of Modal JS ------------------ */