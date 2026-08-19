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

// Dynamic weather icon based on OpenWeather's `condition` (main group)
// and `icon` code (last letter 'd' = day, 'n' = night).
function weatherIconSVG(condition, icon) {
    const isNight = typeof icon === 'string' && icon.endsWith('n');
    const group = (condition || '').toLowerCase();

    if (group === 'clear') {
        return isNight ? moonIcon() : sunIcon();
    }
    if (group === 'clouds') {
        return cloudIcon();
    }
    if (group === 'rain' || group === 'drizzle') {
        return rainIcon();
    }
    if (group === 'thunderstorm') {
        return thunderstormIcon();
    }
    if (group === 'snow') {
        return snowIcon();
    }
    // mist, smoke, haze, dust, fog, sand, ash, squall, tornado -> fallback
    return mistIcon();
}

function sunIcon() {
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

function moonIcon() {
    return `
        <svg class="weather-icon" width="76" height="76" viewBox="0 0 76 76" fill="none">
            <path d="M48 20a20 20 0 1 0 8 34 24 24 0 0 1-8-34Z" fill="#E7ECFB"/>
            <circle cx="52" cy="22" r="1.6" fill="#E7ECFB"/>
            <circle cx="58" cy="30" r="1" fill="#E7ECFB"/>
            <circle cx="47" cy="14" r="1" fill="#E7ECFB"/>
        </svg>
    `;
}

function cloudIcon() {
    return `
        <svg class="weather-icon" width="76" height="76" viewBox="0 0 76 76" fill="none">
            <path d="M23 52a11 11 0 1 1 2.6-21.7A14 14 0 0 1 52 33a9.5 9.5 0 0 1-1 19H23Z" fill="#E7ECFB"/>
        </svg>
    `;
}

function rainIcon() {
    return `
        <svg class="weather-icon" width="76" height="76" viewBox="0 0 76 76" fill="none">
            <path d="M21 42a11 11 0 1 1 2.6-21.7A14 14 0 0 1 50 23a9.5 9.5 0 0 1-1 19H21Z" fill="#E7ECFB"/>
            <g stroke="#8FB8FF" stroke-width="3.5" stroke-linecap="round">
                <line x1="26" y1="52" x2="22" y2="62"/>
                <line x1="38" y1="52" x2="34" y2="62"/>
                <line x1="50" y1="52" x2="46" y2="62"/>
            </g>
        </svg>
    `;
}

function thunderstormIcon() {
    return `
        <svg class="weather-icon" width="76" height="76" viewBox="0 0 76 76" fill="none">
            <path d="M21 40a11 11 0 1 1 2.6-21.7A14 14 0 0 1 50 21a9.5 9.5 0 0 1-1 19H21Z" fill="#E7ECFB"/>
            <path d="M40 46 31 60h9l-4 12 15-18h-9l4-8Z" fill="#FFCF5C"/>
        </svg>
    `;
}

function snowIcon() {
    return `
        <svg class="weather-icon" width="76" height="76" viewBox="0 0 76 76" fill="none">
            <path d="M21 42a11 11 0 1 1 2.6-21.7A14 14 0 0 1 50 23a9.5 9.5 0 0 1-1 19H21Z" fill="#E7ECFB"/>
            <g stroke="#C7D6F2" stroke-width="3" stroke-linecap="round">
                <line x1="26" y1="50" x2="26" y2="64"/>
                <line x1="20" y1="57" x2="32" y2="57"/>
                <line x1="46" y1="50" x2="46" y2="64"/>
                <line x1="40" y1="57" x2="52" y2="57"/>
            </g>
        </svg>
    `;
}

function mistIcon() {
    return `
        <svg class="weather-icon" width="76" height="76" viewBox="0 0 76 76" fill="none">
            <path d="M23 34a11 11 0 1 1 2.6-21.7A14 14 0 0 1 52 15a9.5 9.5 0 0 1-1 19H23Z" fill="#E7ECFB"/>
            <g stroke="#C7D6F2" stroke-width="3.5" stroke-linecap="round">
                <line x1="16" y1="46" x2="60" y2="46"/>
                <line x1="16" y1="56" x2="60" y2="56"/>
                <line x1="16" y1="66" x2="52" y2="66"/>
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
                            ${weatherIconSVG(data.condition, data.icon)}
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
        resultDiv.innerHTML = '<p class="error">Gagal terhubung ke server. Pastikan backend Flask sedang berjalan di port 5000.</p>';
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