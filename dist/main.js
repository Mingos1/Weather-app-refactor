(()=>{"use strict";let e=document.querySelector("#user-input"),t=document.querySelector("#search-button"),n=new Date,c=document.querySelector("main");function a(e){e&&e.parentNode.removeChild(e)}t.addEventListener("click",(function(){event.preventDefault(),async function(){const t=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.value}&appid=90a2160e298f430b373827c5c8f9aaa2`);return await t.json()}().then((e=>{console.log(e),"404"===e.cod&&function(e){a(document.querySelector(".inserted-content")),c.insertAdjacentHTML("beforeend",`<article class='inserted-content section weather-card'>\n            <h3>${e.message}</h3>\n            <h2>${e.cod}</h2>\n        </article>\n        `)}(err),function(e){var t;a(document.querySelector(".inserted-content")),c.insertAdjacentHTML("beforeend",`<article class='inserted-content section weather-card'>\n            <h3 id='weather-condition'>${e.weather[0].main}</h3>\n            <h2 id='temperature'>${t=e.main.temp,Math.ceil(9*(t-273.15)/5+32)}°F</h2>\n            <h3 id='place-name'>${e.name}, ${e.sys.country}</h3>\n            <h4 id='time'>Weather fetched at: ${n}</h4>\n        </article>\n        `)}(e)})).catch((e=>console.log(e.message)))}))})();