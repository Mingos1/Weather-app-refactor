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
    place = "London",
    mainBody = document.querySelector('main');

// API call
async function callAPI() {
    //console.log(userInput.value);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${KEY}`);
    return await response.json();
}

// Calls API onclick
button.addEventListener('click', function () {
    callAPI()
        .then(response => {
            console.log(response)
            createMainElements(response)
        })
        .catch(err => console.log(err.message))
})

// Helper functions
function createMainElements(response) {

    let insertedContent = document.querySelector('.inserted-content');
    removeInsertedElements(insertedContent);

    mainBody.insertAdjacentHTML('beforeend',
        `<article class='inserted-content'>
            <h3 id='weather-condition'>${response.weather[0].main}</h3>
            <h2 id='temperature'>${convertKelToFaren(response.main.temp)}</h2>
            <h3 id='place-name'>${response.name}</h3>
        </article>
        `
    )
}

// Checks if inserted content is still there and refreshes data
function removeInsertedElements(insertedContent) {
    if(insertedContent) insertedContent.parentNode.removeChild(insertedContent); return;
}

//math
function convertKelToFaren(number) {
    return Math.ceil((number - 273.15) * 9/5 + 32); 
}