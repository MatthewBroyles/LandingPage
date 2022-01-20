const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    darkModeIcon = document.getElementById('darkModeIcon'),
    darkMode = document.getElementById('darkMode'),
    degree = document.getElementById('degree');

var isDarkMode = false;

function updateTime() {
    let today = new Date();
    hour = today.getHours();
    minutes = today.getMinutes();
    seconds = today.getSeconds();

    const apm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;

    time.innerHTML = `${hour}<span>:</span>${formatTime(minutes)}<span>:</span>${formatTime(seconds)}`;

    setTimeout(updateTime, 1000);
}

function formatTime(num){
    return (parseInt(num, 10) < 10 ? '0' : '') + num
}

function setBackgroundTime() {
    let today = new Date(),
     hour = today.getHours();

    if(hour < 12){
        console.log('./images/Sunrise1.jpg');
        document.body.style.backgroundImage = isDarkMode ? "url('./images/Sunrise1.jpg')" : "url('./images/Sunrise3.jpg')"
        document.body.style.backgroundSize = "1920px 1080px"
        greeting.textContent = 'Good Morning';
        document.body.style.color = isDarkMode ? 'white' : 'black';
        darkModeIcon.style.color = isDarkMode ? 'white' : 'black';
        darkMode.style.borderColor = isDarkMode ? 'white' : 'black';
    } else if(hour < 18){
        console.log('./images/Sunrise1.jpg');
        document.body.style.backgroundImage = isDarkMode ? "url('./images/Afternoon.jpg')" : "url('./images/Afternoon1.jpg')"
        document.body.style.backgroundSize = "1920px 1080px"
        greeting.textContent = 'Good Afternoon';
        document.body.style.color = isDarkMode ? 'white' : 'black';
        darkModeIcon.style.color = isDarkMode ? 'white' : 'black';
        darkMode.style.borderColor = isDarkMode ? 'white' : 'black';
    } else {
        console.log('./images/Sunrise1.jpg');
        document.body.style.backgroundImage = isDarkMode ? "url('./images/DarkNight.jpg')" : "url('./images/Night.jpg')"
        document.body.style.backgroundSize = "1920px 1080px"
        greeting.textContent = 'Good Evening';
        document.body.style.color = isDarkMode ? 'white' : 'white';
        darkModeIcon.style.color = isDarkMode ? 'white' : 'white';
        darkMode.style.borderColor = isDarkMode ? 'white' : 'white';
    }
}

function getName() {
    if(localStorage.getItem('name') === null){
        name.textContent = '[Enter Name]';
    } else{
        name.textContent = localStorage.getItem('name');
    }
}

function setName(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('name', e.target.innerText)
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.innerText)
    }
}


function getFocus() {
    if(localStorage.getItem('focus') === null){
        focus.textContent = '[Enter Focus]';
    } else{
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if(e.type === 'keypress') {
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('focus', e.target.innerText)
            focus.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.innerText)
    }
}
function getDarkMode() {
    if(localStorage.getItem('darkMode') === null){
        isDarkMode = false;
        darkModeIcon.innerHTML = "light_mode"
    } else {
        isDarkMode = localStorage.getItem('darkMode') == 'true' ? true : false;
        darkModeIcon.innerHTML = localStorage.getItem('darkMode') == 'true' ? 'dark_mode' : 'light_mode';
    }
    setBackgroundTime();
}

function setDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
    darkModeIcon.innerHTML = isDarkMode ? 'dark_mode' : 'light_mode';
    setBackgroundTime();
}
function changeIcon(){

}
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
darkMode.addEventListener('click', setDarkMode);
degree.addEventListener('click', changeCF);
let tempF = 0;
let tempC = 0;
let isTempF = true;
let timeZone = 'N/A';

function changeCF(){
    isTempF = !isTempF
    if(isTempF){
     //   document.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify({
     //       "event": "command",
     //       "func": "playVideo" 
     //     }), '*');
     //   document.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify({
     //       "event": "command",
     //       "func": "unMute" 
     //   }), '*');  
        degree.textContent = parseInt(tempF) + String.fromCharCode(176);
    } else{
      //  document.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify({
      //      "event": "command",
      //      "func": "pauseVideo" 
      //    }), '*');
      //  document.getElementsByTagName("iframe")[0].contentWindow.postMessage(JSON.stringify({
      //      "event": "command",
      //      "func": "mute" 
      //  }), '*');
        degree.textContent = parseInt(tempC) + String.fromCharCode(176);
    }
}



window.addEventListener('load', ()=> {
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            console.log(position);
                lon = position.coords.longitude;
                lat = position.coords.latitude;
            console.log(lon);
            console.log(lat);

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=4d7cfd4c76aa0e704259c35e0ec8db30&units=imperial`
            console.log(api);
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    console.log(data.timezone);
                    console.log(data.current.weather[0].icon);
                //    document.getElementById('location-timezone').textContent = data.timezone;
                    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
                    degree.textContent = parseInt(data.current.temp) + String.fromCharCode(176);
                    tempF = data.current.temp
                    tempC = (tempF - 32) * (.5556);
                })
            const geoapi = `https://open.mapquestapi.com/geocoding/v1/reverse?key=KyJ4j8nRRmSWNkrikoDyy9Niszngj9p2&location=${lat},${lon}&includeRoadMetadata=true&includeNearestIntersection=false`
            console.log(geoapi);
            fetch(geoapi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const location = (data.results[0].locations[0].adminArea4 + " " + data.results[0].locations[0].adminArea3);
                    document.getElementById('location-timezone').textContent = location;
                })
        });

    } else{

    }
});
const video = document.querySelector(".vid-container video");
const song = document.querySelector(".song");
const sounds = document.querySelectorAll('.sound-picker button')
var dataSound = "";

sounds.forEach(sound => {
    sound.addEventListener("click", function() {
    console.log(song.src);
    console.log(this.getAttribute("data-sound"));
      if(dataSound == this.getAttribute("data-sound")){
          checkPlaying(song);

      } else {
        if(isPlaying){
            checkPlaying(song)
        }
      dataSound = this.getAttribute('data-sound');
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
      }
    });
  });
var isPlaying = false;

function checkPlaying (song) {
    if(!isPlaying){
        isPlaying = true;
        song.play();
        video.play();
        video.style.opacity = '1';
    } else {
        isPlaying = false;
        song.pause();
        video.pause();
        video.style.opacity = '0';
    }
}

const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log("ciao")
}

$('#meditationvideo').on('ended', function() {
    video.currentTime = 0;
    video.play();
})
console.log(document.getElementById('meditationvideo').currentTime);
document.getElementById("meditationvideo").addEventListener('ended', () => {
    console.log('restart');
    document.getElementById("meditationvideo").currentTime = 0;
    document.getElementById("meditationvideo").play();
})




$("#volume").slider({
    min: 0,
    max: 100,
    value: 0,
      range: "min",
    slide: function(event, ui) {
      song.volume = (ui.value / 100);
    }
  });

song.volume = 0;
updateTime();
setBackgroundTime();
getDarkMode();
getName();
getFocus();

const alert = document.querySelector('.alert'),
 form = document.querySelector('.todo-form'),
 todo = document.getElementById('todo'),
 submitBtn = document.querySelector('.submit-btn'),
 container = document.querySelector('.todo-container'),
 list = document.querySelector('.todo-list'),
 clearBtn = document.querySelector('.clear-btn');
 
let editElement,
 editFlag = false,
 editID = '';

 form.addEventListener('submit', addItem);

 function addItem(e) {
     e.preventDefault();
     const value = todo.value;
     const id = new Date().getTime().toString()
     console.log(id);
 }