import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'

const DEBOUNCE_DELAY = 300;


const fetchCountryLi = document.querySelector('.country-list');
const fetchCountryInfo = document.querySelector('.country-info');
const countryList = document.getElementById("search-box"); //caja de texto

countryList.addEventListener("input",debounce(() => {
     const searchCountry = countryList.value;//"colombia";
     if (searchCountry !== '') { 
        fetchCountryes(searchCountry)
.then((countrys) => renderCountryList(countrys))
        .catch((error) => console.log(error));
        // console.log()
    }

}, DEBOUNCE_DELAY));

function fetchCountryes(countryName){
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?limit=10&fields=name,capital,population,flags,languages`
    ).then((response) => {
    if (!response.ok) {
        Notiflix.Notify.warning('no se encuentra en base de datos.');
      throw new Error(response.status);
      
    }
    return response.json();
  });
}

function renderCountryList(countrys) {
      fetchCountryLi.innerHTML = '';
    if (countrys.length > 10) {
        Notiflix.Notify.info('Se encontraron demasiadas coincidencias. Introduzca un nombre más específico.');
    }
    
    if (countrys.length >= 2 && countrys.length <= 10) {
        console.log(countrys.length)
        const markup = countrys
        .map((country) => {
            
        return `
            <li class="country-info" >
                <div class="country-img">
<img src=${country.flags.png} alt="" width = 80px>
                </div>
                <div class="country-content">
                    <h2>${country.name.common}</h2>
                </div>
            </li>
        `;
        })
        .join("");
        //fetchCountryLi.innerHTML = markup;
        fetchCountryLi.insertAdjacentHTML('beforeend', markup);
    }
console.log(countrys)
    if (countrys.length === 1) {
        
        const markup = countrys
        .map((country) => {
            
        return `
            <div class="img-text">
                <img class="country-limg"src=${country.flags.png} width = 80px> 
                <h2> ${country.name.common} </h2>
            </div>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${Object.values(country.languages)}</p>
        `;
        })
        .join("");
        
        //fetchCountryLi.insertAdjacentHTML('beforeend', markup);
        fetchCountryInfo.innerHTML = markup;
    }

    
}

