/*
User enters place to search weather
Button press leads to calling API
API response hits and is appended to document
Repeat
*/

import "dotenv/config";
let place = "London";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${process.env.API_KEY}`;


async function callAPI() {
    let response = await fetch(url);
    let results =  await response.json();

    console.log(results);
}

callAPI();