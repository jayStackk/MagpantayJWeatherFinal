// import getLocationData from "./geoLocation.js";
// import {prod, dev} from './environment.js';



const currDate = document.getElementById('date');
let cnt = 5;
let apiID = "26f9e030a111095f4a45a2b8be0844f8";
const form = document.getElementById('form');
const search = document.getElementById('search');
const url = (city) => `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiID}&cnt=${cnt}`;

let weekday = new Array(7);

weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";


const getCurrentDay = () => {

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    let currentTime = new Date();
    let date = currentTime.getDate();
    let month = currentTime.getMonth();
    let day = weekday[currentTime.getDay()];
    //console.log(weekday[currentTime.getDay()]);
    //console.log(date + " " + months[month]);

    return (date + " " + months[month] + ", " + day);
};
currDate.innerHTML = getCurrentDay();

form.addEventListener('click', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        searchWeather();
    }
});

searchWeather = () => {
    this.fetchWeather(document.querySelector(".search").value);
}


fetchWeather = (city) => {
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=a2055af730dbdbad41af3b3d6685c62c"
    ).then((response) => {
        if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
        }
        return response.json();
    }).then((data) => this.displayWeather(data));
}

displayWeather = (data) => {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
}

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {
        origin: "cros"
    });
    const respData = await resp.json();
    addWeatherToPage(respData);
}

function addWeatherToPage(result) {
    const data = result.list
    const resultForecast = document.createElement('div')
    for (let i in data) {
        const temp = Ktoc(data[i].main.temp);
        resultForecast.innerHTML = resultForecast.innerHTML + ` 
        <div class="futureforecast">
            <div class="weatherforecast">
              <div class = "row weatherforecastitem">
                <div class = "col-xl-8 col-lg-8 day">${weekday[i]}</div>
                <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="baccground" class="w-icon">
                <div class="col-xl-4 temp"> ${temp}&deg;C</div>
              </div>
            </div>
        </div> 
      `;
    }
    //  cleanup   
    main.innerHTML = "";
    main.appendChild(resultForecast);
};

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('click', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city)
    }
}); 
