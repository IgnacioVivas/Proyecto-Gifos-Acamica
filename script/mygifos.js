/* -------------------- My Gifos JS ------------------ */
//Variables
myGifosArray = [];
myGifosString = localStorage.getItem("myGifos");
const my_gifos_gifos = document.getElementById("my_gifos_gifos");
const my_gifos_icon = "./images/icon-mis-gifos-sin-contenido.svg";
const trash_img = "./images/icon-trash-hover.svg";

//Show my uploaded gifos in this section
renderMyGifos();

//Render function
function renderMyGifos() {
    my_gifos_gifos.innerHTML = ""; //Avoid repeating

    //First, validate if there are any uploaded gifos in LocalStorage
    if (myGifosString == null || myGifosString == "[]") {
        my_gifos_gifos.classList.remove("grid"); //Style of container
        noResults(my_gifos_icon, my_gifos_gifos, "¡Animate a crear tu primer GIFO!"); //Show message
    } else {
        myGifosArray = JSON.parse(myGifosString); //Create a new array with Info in LocalStorage converted to String
        console.log(myGifosArray);
        //Bring information from api about MyGifos Array in LocalStorage
        let urlMyGifos = `https://api.giphy.com/v1/gifs?ids=${myGifosArray.toString()}&api_key=${api_key}`;
        console.log(urlMyGifos);

        //Use API information and send My Gifos to HTML
        getSectionsData(urlMyGifos, my_gifos_gifos, trash_img, erase_gifo, erase_gifo);
    }
}

function erase(gifo) {
    let Array
}
//Erase Favorite Gifo
function erase(gifo){
    let arrayAux = [];
    arrayAux = JSON.parse(myGifosString);
    let index = arrayAux.indexOf(gifo);
    console.log(arrayAux);
    console.log(index);

    arrayAux.splice(index, 1);

    let newMyGifosString = JSON.stringify(arrayAux);
    localStorage.setItem("myGifos", newMyGifosString);

    //Reloading page
    location.reload();
}

/* --------------- End of My Gifos JS ---------------- */