var container = document.querySelector('.container');
var search = document.querySelector('.search-box button');
var weatherBox = document.querySelector('.weather-box');
var weatherDetail = document.querySelector('.weather-details');
var error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    var APIKey = '2f5c85497b60ba7f102fc1625fa8ae90';
    var city = document.querySelector('.search-box input').value;

    if(city === ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetail.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        var image = document.querySelector('.weather-box img');
        var temperture = document.querySelector('.weather-box .temperature');
        var desciption = document.querySelector('.weather-box .description');
        var humidity = document.querySelector('.weather-details .humidity span');
        var wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Haze':
                image.src = 'images/mist.png';
                break;
            default:
                image.src = 'images/404.png';
        }

        temperture.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desciption.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherBox.style.display = '';
        weatherDetail.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetail.classList.add('fadeIn');
        container.style.height = '590px';
    })
})