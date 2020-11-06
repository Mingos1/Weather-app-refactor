import { KEY } from './dummy_secret.js';

//const fetch = require('node-fetch');
//import 'dotenv/config';

/*
User enters place to search weather
Button press leads to calling API
API response hits and is appended to document
Repeat
*/

let userInput = document.querySelector('#user-input'),
    button = document.querySelector('#search-button'),
    timeNow = new Date(),
    mainBody = document.querySelector('main');

// API call
async function callAPI() {
    //console.log(userInput.value);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${KEY}`);
    return await response.json();
}

// Calls API onclick
button.addEventListener('click', function () {
    event.preventDefault();
    callAPI()
        .then(response => {
            console.log(response)
            //Error handler not finished - doesn't return a new element
            if (response.cod === '404') creatErrorElements(err) 
            createMainElements(response)
        })
        .catch(err => 
            console.log(err.message))
        })

function creatErrorElements(response) {
    let insertedContent = document.querySelector('.inserted-content');
    removeInsertedElements(insertedContent);

    mainBody.insertAdjacentHTML('beforeend',
        `<article class='inserted-content section weather-card'>
            <h3>${response.message}</h3>
            <h2>${response.cod}</h2>
        </article>
        `
    )
}


// Helper functions
function createMainElements(response) {
    let insertedContent = document.querySelector('.inserted-content');
    removeInsertedElements(insertedContent);

    mainBody.insertAdjacentHTML('beforeend',
        `<article class='inserted-content section weather-card'>
            <h3 id='weather-condition'>${response.weather[0].main}</h3>
            <h2 id='temperature'>${convertKelToFaren(response.main.temp)}°F</h2>
            <h3 id='place-name'>${response.name}, ${response.sys.country}</h3>
            <h4 id='time'>Weather fetched at: ${timeNow}</h4>
        </article>
        `
    )
}

// Checks if inserted content is still there and refreshes data
function removeInsertedElements(insertedContent) {
    if(insertedContent) insertedContent.parentNode.removeChild(insertedContent); return;
}

// Temperature math
function convertKelToFaren(number) {
    return Math.ceil((number - 273.15) * 9/5 + 32); 
}