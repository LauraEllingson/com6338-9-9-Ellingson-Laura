// Selecting DOM elements
//converted vars to const
const form = document.querySelector('form'); // Selects the first <form> element
const cityInput = document.getElementById('weather-search'); // Retrieves input element by ID
const section = document.getElementById('weather'); // Retrieves section element by ID

// Form submission event handling
//converted to use async and await
form.onsubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    const city = cityInput.value.trim();
    const apiKey = '7e5379b3c6a4afecd1a36c6c82815e9d'; // OpenWeatherMap API key
    cityInput.value = ""; // Clearing input field

    if (city !== '') { // Check if input is not empty
        try {
            // Fetching weather data from OpenWeatherMap API
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
            const weatherData = await res.json(); // Parsing response as JSON

            console.log(weatherData); // Logging weather data to console
            section.innerHTML = ""; // Clearing section content

            // Displaying city name and country
            const cityName = document.createElement('h2');
            cityName.textContent = `${weatherData.name}, ${weatherData.sys.country}`; //converted string concatenation to use literals ad string interpolation 
            section.appendChild(cityName);

            // Generating Google Maps link for location
            const mapLink = document.createElement('a');
            const latCoord = weatherData.coord.lat;
            const lonCoord = weatherData.coord.lon;
            mapLink.href = `https://www.google.com/maps/search/?api=1&query=${latCoord},${lonCoord}`;
            mapLink.target = '_blank';
            mapLink.textContent = "Click to view map";
            section.appendChild(mapLink);

            // Displaying weather icon
            const cityImg = document.createElement('img');
            const icon = weatherData.weather[0].icon;
            cityImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            section.appendChild(cityImg);

            // Displaying weather condition
            const weatherCon = document.createElement('p');
            weatherCon.textContent = weatherData.weather[0].description;
            section.appendChild(weatherCon);

            // Displaying current temperature
            const current = document.createElement('p');
            current.textContent = "Current: " + weatherData.main.temp + "°" + " F";
            section.appendChild(current);

            // Displaying "feels like" temperature
            const feelsLike = document.createElement('p');
            feelsLike.textContent = "Feels like: " + weatherData.main.feels_like + "°" + " F";
            section.appendChild(feelsLike);

            // Displaying time of last update
            //converted to arrow function
        const updated = () => {
                const time = new Date(weatherData.dt * 1000);
                const timeString = time.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                });
                return "Last updated: " + timeString;
            };
            const updatedParagraph = document.createElement('p');
            updatedParagraph.textContent = updated(); // calling the updated function
            section.appendChild(updatedParagraph);
        } catch (err) {
            section.innerHTML = ""; // Clearing section content
            const locErr = document.createElement('h2');
            locErr.textContent = 'Location not found.'; // Error message for location not found
            section.appendChild(locErr);
            console.error("Error fetching weather data:", err); // Logging error to console
        }
    }
};