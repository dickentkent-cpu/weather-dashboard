const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;

    if (!city) {
        resultDiv.innerHTML = '<p>Masukin nama kota dulu ya sayang</p>';
        return;
    }

    getWeather(city);
});

async function getWeather(city) {
    resultDiv.innerHTML = '<p>Loading...</p>';

    try {
        const response = await fetch(`http://127.0.0.1:5000/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<p class="error">${data.error}</p>`;
            return;
        }

        const now = new Date();
        const options = { weekday: 'long', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const formattedDate = now.toLocaleDateString('id-ID', options);

        resultDiv.innerHTML = `
            <div class="weather-card">
                <div class="weather-main">
                    <div class="location-info">
                        <h2>${data.city}, ${data.country}</h2>
                        <p class="date">${formattedDate}</p>
                    </div>
                    <div class="temp-display">
                        <span class="temp-number">${data.temperature}°C</span>
                        <p class="description">${data.description}</p>
                        <p class="feels-like">Feels like ${data.feels_like}°C</p>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Humidity</span>
                        <span class="stat-value">${data.humidity}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Wind</span>
                        <span class="stat-value">${data.wind_speed} m/s</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Pressure</span>
                        <span class="stat-value">${data.pressure} hPa</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Visibility</span>
                        <span class="stat-value">${data.visibility} km</span>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        resultDiv.innerHTML = '<p class="error">Gagal terhubung ke server</p>';
    }
}