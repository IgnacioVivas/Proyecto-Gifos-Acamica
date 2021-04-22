/* ------------------------ Create Gifos JS ---------------------- */
//Variables
const begin_btn = document.getElementById("begin_btn");
const record_btn = document.getElementById("record_btn");
const end_btn = document.getElementById("end_btn");
const upload_btn = document.getElementById("upload_btn");

const step_first = document.getElementById("creategifo_step_first");
const step_second = document.getElementById("creategifo_step_second");
const step_third = document.getElementById("creategifo_step_third");

const counter_recording = document.getElementById("counter_recording");
const counter_repeat = document.getElementById("counter_repeat");

const upload_title = document.getElementById("upload_title");
const upload_text = document.getElementById("upload_text");

const overlay_video = document.getElementById("overlay_video");
const overlay_icon = document.getElementById("overlay_video_icon");
const overlay_text = document.getElementById("overlay_video_text");
const overlay_actions = document.getElementById("overlay_video_actions");

let recorder;
let blob;
let dateStarted;
let form = new FormData(); //FormData Object
let myGifosArray = [];
let myGifosString = localStorage.getItem("myGifos");
let video = document.getElementById("recording_video");
let recorded_gifo = document.getElementById("recorded_gifo");

//1st step: When click on "Comenzar" button
begin_btn.addEventListener("click", getStreamAndRecord);

//Function: Change screen text and ask camera permissions
function getStreamAndRecord() {
    
    begin_btn.classList.add("hide"); //Hide button
    upload_title.innerHTML = "¿Nos das acceso </br>a tu cámara?"; //Change title text
    upload_text.innerHTML= "El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO." //Change text
    step_first.classList.add("step_now"); //Change style on first indicator

    navigator.mediaDevices.getUserMedia({ audio: false, video: { height: { max: 480 } } }) //Ask camera permission (return a promise)

        //2nd step: Getting access: Shows Camera and "Grabar" button
        .then(function (stream) {
            upload_title.classList.add("hide"); //Hide title
            upload_text.classList.add("hide"); //Hide text
            record_btn.classList.remove("hide"); //Shows "Grabar" button

            step_first.classList.remove("step_now"); //Change style first indicator
            step_second.classList.add("step_now"); //Change style second indicator

            //Video appears
            video.classList.remove("hide");
            video.srcObject = stream;
            video.play();

            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,  
                quality: 10,  
                width: 360,  
                hidden: 240,  
                onGifRecordingStarted: function() { 
                    console.log('started') 
                }, 
            });
        })
}

//3rd step: When click on "Grabar" button
record_btn.addEventListener("click", recordGifo);

//Function
function recordGifo() {
    recorder.startRecording(); //Start recording
    console.log("Recording gifo");

    record_btn.classList.add("hide"); //Hide "Grabar" button
    end_btn.classList.remove("hide"); //Show "Finalizar" button 

    counter_recording.classList.remove("hide"); //Show counter

    //counter
    dateStarted = new Date().getTime(); 

    (function looper() {
        if (!recorder) { //Validate first
            return;
        }
        //Start counter clock
        counter_recording.innerHTML = calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
        setTimeout(looper, 1000);
    })();
}

//4th step: When click on "Finalizar" button
end_btn.addEventListener("click", endingGifo);

//Function
function endingGifo() {

    console.log("Recording Finished");
    end_btn.classList.add("hide"); //Hide "Finalizar" button
    upload_btn.classList.remove("hide"); //Shows "Subir Gifo" button

    counter_recording.classList.add("hide"); //Hide counter
    counter_repeat.classList.remove("hide"); //Show Repeat button

    recorder.stopRecording(function() { //Callback
        video.classList.add("hide"); //Hide video screen
        recorded_gifo.classList.remove("hide"); //Show gifo ready

        //Manage info received
        blob = recorder.getBlob();
        recorded_gifo.src = URL.createObjectURL(recorder.getBlob());

        //Include recording to form with append method
        form.append("file", recorder.getBlob(), "myGifo.gif");
        console.log(form.get('file'));
        form.append("api_key", api_key);
    });

}

//Function: Calculates Duration of Video Recording
function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    return hr + ':' + min + ':' + sec;
}

//5th step: When clicking on "Subir Gifo" button
upload_btn.addEventListener("click", uploadGifo);

//Function Upload Gifo
function uploadGifo() {

    //Show overlay with loading logo and text
    overlay_video.classList.remove("hide");
    overlay_icon.classList.remove("hide");
    overlay_text.classList.remove("hide");

    //Show change in third indicator
    step_second.classList.remove("step_now");
    step_third.classList.add("step_now");

    //Hide Repeat button
    counter_repeat.classList.add("hide");

    //Upload Created Gifo
    fetch("https://upload.giphy.com/v1/gifs", {
        method: "POST",
        body: form,
    })

        .then(response => {
            return response.json();
        })

        //6th step: Gifo uploaded successfully
        .then(gifo => {
            console.log(gifo);
            let myGifoId = gifo.data.id;
            console.log(myGifoId);

            //Show success message in HTML
            overlay_actions.classList.remove("hide");
            overlay_icon.src = "./images/check.svg";
            overlay_text.innerText = "GIFO subido con éxito";
            overlay_actions.innerHTML = `
            <button class="gifo__btn" id="download_btn" onclick="downloadMyGifo('${myGifoId}')">
                <img src="./images/icon-download-hover.svg" alt="download">
            </button>
            <button class="gifo__btn" id="link_btn">
                <img src="./images/icon-link-hover.svg" alt="link">
            </button>`;
            upload_btn.classList.add("invisible");

            //If MyGifos in LocalStorage is empty, MyGifos array keeps empty
            if (myGifosString == null) {
                myGifosArray = [];

            } else {
                //If there is content, convert it to json
                myGifosArray = JSON.parse(myGifosString);
            }

            //Add a new one to MyGifos array
            myGifosArray.push(myGifoId);
            //Convert array to String
            myGifosString = JSON.stringify(myGifosArray);
            //Add MyGifos array to LocalStorage
            localStorage.setItem("myGifos", myGifosString);

        }) 

        .catch(error => console.log("No se pudo enviar el gifo a GIPHY: " + error))

}

//Alternative step: When click on Repeat button, start recording again
counter_repeat.addEventListener("click", repeatRecording);

//Function Repeat Recording
function repeatRecording() {
    recorder.clearRecordedData();
    console.log("New Recording: Started");

    counter_repeat.classList.add("hide");

    //Hide Upload Gifo button
    upload_btn.classList.add("hide");

    //Hide previous gifo
    recorded_gifo.classList.add("hide");

    //Begin recording again
    //Show Recording button
    record_btn.classList.remove("hide");

    //Ask camera permission again
    navigator.mediaDevices.getUserMedia({ audio: false, video: { height: { max: 480 } } })

        //Access: Show Camera and Activates indicator of step 2
        .then(function (stream) {

            step_second.classList.add("step_now"); //Change style second indicator

            //Video appears
            video.classList.remove("hide");
            video.srcObject = stream;
            video.play();

            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,  
                quality: 10,  
                width: 360,  
                hidden: 240,  
                onGifRecordingStarted: function() { 
                    console.log('started') 
                }, 
        })

})
}

//Final step: If you want to download a created new gifo, click download button
async function downloadMyGifo(gifoImg) {
    let blob = await fetch("https://media.giphy.com/media/" + gifoImg + "/giphy.gif").then( img => img.blob());
    invokeSaveAsDialog(blob, "myGifo.gif");
}

/* -------------------- End of Create Gifos JS ------------------- */