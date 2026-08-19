const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (!city) {
        resultDiv.innerHTML = '<p class="error">Masukin nama kota dulu ya sayang</p>';
        return;
    }

    getWeather(city);
});

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchBtn.click();
});

// Static sun icon used for the hero card background for now.
// Later this can be swapped based on data.description (sunny/cloudy/rain/etc).
function weatherIconSVG() {
    return `
        <svg class="weather-icon" width="76" height="76" viewBox="0 0 76 76" fill="none">
            <circle cx="38" cy="38" r="16" fill="#FFCF5C"/>
            <g stroke="#FFCF5C" stroke-width="4" stroke-linecap="round">
                <line x1="38" y1="6" x2="38" y2="14"/>
                <line x1="38" y1="62" x2="38" y2="70"/>
                <line x1="6" y1="38" x2="14" y2="38"/>
                <line x1="62" y1="38" x2="70" y2="38"/>
                <line x1="14.5" y1="14.5" x2="20" y2="20"/>
                <line x1="56" y1="56" x2="61.5" y2="61.5"/>
                <line x1="61.5" y1="14.5" x2="56" y2="20"/>
                <line x1="20" y1="56" x2="14.5" y2="61.5"/>
            </g>
        </svg>
    `;
}

async function getWeather(city) {
    resultDiv.innerHTML = `
        <div class="loading-state">
            <span class="spinner"></span>
            <span>Mencari cuaca untuk "${city}"...</span>
        </div>
    `;

    try {
        const response = await fetch(`http://127.0.0.1:5000/weather?city=${encodeURIComponent(city)}`);
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
                        <div class="temp-block">
                            ${weatherIconSVG()}
                            <div class="temp-display">
                                <span class="temp-number">${data.temperature}&deg;C</span>
                                <p class="description">${data.description}</p>
                                <p class="feels-like">Feels like ${data.feels_like}&deg;C</p>
                            </div>
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

                <div class="detail-grid">
                    ${detailCard('Temperature', `${data.temperature}&deg;C`, `Feels like ${data.feels_like}&deg;C`)}
                    ${detailCard('Humidity', `${data.humidity}%`, humidityLabel(data.humidity))}
                    ${detailCard('Wind', `${data.wind_speed} m/s`, 'Current')}
                    ${detailCard('Pressure', `${data.pressure} hPa`, 'Steady')}
                </div>
            </div>
        `;

    } catch (error) {
        resultDiv.innerHTML = '<p class="error">Gagal terhubung ke server</p>';
    }
}

function detailCard(label, value, sub) {
    return `
        <div class="detail-card">
            <span class="detail-value">${value}</span>
            <span class="detail-label">${label} &middot; ${sub}</span>
        </div>
    `;
}

function humidityLabel(humidity) {
    if (humidity < 30) return 'Dry';
    if (humidity < 60) return 'Comfortable';
    return 'Humid';
}