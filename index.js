const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    darkModeIcon = document.getElementById('darkModeIcon'),
    darkMode = document.getElementById('darkMode'),
    sideBarIcon = document.getElementById('sideBarIcon'),
    visibilityIcon = document.getElementById('visibilityIcon'),
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
        document.title = "Good Morning 🌅";
        console.log('./images/Sunrise1.jpg');
        document.body.style.backgroundImage = isDarkMode ? "url('./images/Sunrise1.jpg')" : "url('./images/Sunrise3.jpg')"
        document.body.style.backgroundSize = "1920px 1080px"
        greeting.textContent = 'Good Morning';
    } else if(hour < 18){
        document.title = "Good Afternoon ☀️";
        console.log('./images/Sunrise1.jpg');
        document.body.style.backgroundImage = isDarkMode ? "url('./images/Afternoon.jpg')" : "url('./images/Afternoon1.jpg')"
        document.body.style.backgroundSize = "1920px 1080px"
        greeting.textContent = 'Good Afternoon';
    } else {
        document.title = "Good Night 🌙";
        console.log('./images/Sunrise1.jpg');
        document.body.style.backgroundImage = isDarkMode ? "url('./images/DarkNight.jpg')" : "url('./images/Night.jpg')"
        document.body.style.backgroundSize = "1920px 1080px"
        greeting.textContent = 'Good Evening';
    }
        document.getElementById('time').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('h1').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('h2').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('focus').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('degree').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('location-timezone').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('volume_up').style.color = isDarkMode ? 'white' : 'black';
        document.getElementById('volume_down').style.color = isDarkMode ? 'white' : 'black';
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
        degree.textContent = parseInt(tempF) + String.fromCharCode(176);
    } else{
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
    console.log('preloading');
    preloadImage('./images/Afternoon.jpg');
    preloadImage('./images/Afternoon1.jpg');
    preloadImage('./images/Afternoon2.jpg');
    preloadImage('./images/DarkNight.jpg');
    preloadImage('./images/Morning.jpg');
    preloadImage('./images/Night.jpg');
    preloadImage('./images/Night2.jpg');
    preloadImage('./images/Sunrise.jpg');
    preloadImage('./images/Sunrise1.jpg');
    preloadImage('./images/Sunrise2.jpg');
    preloadImage('./images/Sunrise3.jpg');
    console.log('preloading done');
});

const video = document.querySelector(".vid-container #meditationvideo");
const song = document.querySelector(".song");
const sounds = document.querySelectorAll('.sound-picker button')
var dataSound = "";

function preloadImage(url){
    var img = new Image();
    img.src = url;
}



sounds.forEach(sound => {
    sound.addEventListener("click", function() {

      if(dataSound == this.getAttribute("data-sound")){
          checkPlaying(song);

      } else {
        if(isPlaying){
            console.log('delay?');
            console.log(isPlaying)
            checkPlaying(song);
            setTimeout(() => {
                dataSound = this.getAttribute('data-sound');
                song.src = this.getAttribute("data-sound");
                video.src = this.getAttribute("data-video");
            }, 400)
            setTimeout(checkPlaying,500,song);
            console.log(this);
        } else{
            dataSound = this.getAttribute('data-sound');
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
            console.log(this);
    }
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
        video.style.transition = 'opacity 0.5s ease-in-out';
    } else {
        isPlaying = false;
        song.pause();
        video.pause();
        video.style.opacity = '0';
        video.style.transition = 'opacity 0.5s ease-in-out';
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

const 
 form = document.querySelector('.todo-form'),
 todo = document.getElementById('todo'),
 submitBtn = document.querySelector('.submit-btn'),
 container = document.querySelector('.todo-container'),
 list = document.querySelector('.todo-list'),
 clearBtn = document.querySelector('.clear-btn');
 
let editElement,
 editFlag = false,
 editID = '';

 submitBtn.addEventListener('click', addItem);
 clearBtn.addEventListener('click', clearItems);
 window.addEventListener('DOMContentLoaded',setupItems);
 
 function addItem(e) {
     e.preventDefault();
     const value = todo.value;
     const id = new Date().getTime().toString()
     console.log(id);
     if(value !== '' && editFlag === false){
         createItem(id,value);
         addToLocalStorage(id,value);
         setBackToDefault();
     } else if(value !== '' && editFlag === true){
         editElement.innerHTML = value;
         editLocalStorage(editID, value)
         setBackToDefault();
     } else {
     }
 }
function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    setBackToDefault();
    removeFromLocalStorage(id);
}
function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.previousElementSibling;
    todo.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'Edit';
}

 function clearItems(){
     const items = document.querySelectorAll('.todo-item');
     console.log('wtfisgoingon');
     if(items.length > 0){
         items.forEach(function(item){
             list.removeChild(item);
         });
     }
     setBackToDefault();
     localStorage.removeItem('list');
 }

 function addToLocalStorage(id, value){
     console.log('added');
     const items = { id, value};
     let itemList = getLocalStorage();
     console.log(itemList);
     itemList.push(items);
     localStorage.setItem('list',JSON.stringify(itemList))
 }
function removeFromLocalStorage(id){
 let itemList = getLocalStorage();
 itemList = itemList.filter(function(item){
    if(item.id !== id){
        return item;
    }
 })
 localStorage.setItem('list', JSON.stringify(itemList));
}

function editLocalStorage(id, value){
    let itemList = getLocalStorage();
    itemList = itemList.map(function(item){
        if(item.id===id){
            item.value = value;
        }
        return item;
    });
    localStorage.setItem('list', JSON.stringify(itemList));
}
function getLocalStorage(){
    return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
}
 function setBackToDefault(){
     todo.value = '';
     editFlag = false;
     editID = '';
     submitBtn.textContent = 'Add';
     console.log('default');
 }
 function setupItems(){
     let itemList = getLocalStorage();
     if(itemList.length > 0){
        itemList.forEach(function(item){
            createItem(item.id,item.value);
        })
     }
 }

 function createItem(id, value){
    const element = document.createElement('article');
    element.classList.add('todo-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = ` <div class='container-element'><p class='title'>${value}</p>
        <button type="button" class='edit-btn'><i class="material-icons">edit</i></button>
        <button type='button' class='delete-btn'><i class="material-icons" >check</i></button></div>
    `;
    const deleteBtn = element.querySelector('.delete-btn'),
       editBtn = element.querySelector('.edit-btn'),
       message = element.querySelector('.title'),
       divcontainer = element.querySelector('.container-element');
    


    divcontainer.style.display = 'flex';
    divcontainer.style.outline = '2px solid gray';
    message.style.width = '80%';
    message.style.textAlign = 'left';
    message.style.fontSize = '20px';
    deleteBtn.style.width = '10%';
    editBtn.style.width = '10%';
    deleteBtn.style.cursor = 'pointer';
    editBtn.style.cursor = 'pointer';
    message.style.color = 'white';
    deleteBtn.style.float = 'right';
    editBtn.style.float = 'right';


    deleteBtn.addEventListener('click',deleteItem);
    editBtn.addEventListener('click',editItem);
    list.appendChild(element);
 }

 let isSideBarOpen = false;
 document.querySelector('.todo-all-container').style.display = 'none'
 /* Open the sidenav */
function changeSideBar() {
    isSideBarOpen = !isSideBarOpen;
    if(isSideBarOpen){
        document.getElementById("mySidenav").style.width = "30vw";
        document.querySelector('.todo-all-container').style.opacity = '1';
        document.querySelector('.todo-all-container').style.transition = 'opacity 0.5s ease-in-out';
        window.setTimeout(function(){
            document.querySelector('.todo-all-container').style.display = 'block'
        }, 500);     
    } else{
        document.getElementById("mySidenav").style.width = "40px"; 
        document.querySelector('.todo-all-container').style.display = 'none'
        document.querySelector('.todo-all-container').style.opacity = '0';      
    }
  }
let todoHeader = localStorage.getItem('header') ? localStorage.getItem('header') : "ToDo";
document.getElementById('ToDoHeader').innerHTML = todoHeader == 'ToDo' ? '🗒️ToDo✏️' : '🌟Goals🌟';
function toggleHeader(){
    if(todoHeader === 'ToDo'){
        todoHeader = 'Goals';
        document.getElementById('ToDoHeader').innerHTML = '🌟Goals🌟';
        localStorage.setItem('header' , 'Goals');
    } else{
        todoHeader = 'ToDo';
        document.getElementById('ToDoHeader').innerHTML = '🗒️ToDo✏️';
        localStorage.setItem('header' , 'ToDo');
    }
}