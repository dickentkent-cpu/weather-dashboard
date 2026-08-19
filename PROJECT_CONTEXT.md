# Weather Dashboard — Project Context

## 1. Project Overview

Weather Dashboard adalah aplikasi web sederhana untuk mencari informasi cuaca berdasarkan nama kota.

User memasukkan nama kota pada frontend, kemudian frontend mengirim request ke backend Flask. Backend mengambil data cuaca dari OpenWeather API dan mengembalikan data dalam format JSON. Frontend kemudian menampilkan hasil cuaca kepada user.

Repository:
https://github.com/dickentkent-cpu/weather-dashboard

Branch utama:
`main`

---

## 2. Current Tech Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript
* Fetch API

### Backend

* Python
* Flask
* Flask-CORS
* Requests
* python-dotenv

### External API

* OpenWeather API

### Development Tools

* VS Code
* Git
* GitHub
* Python virtual environment (`venv`)

---

## 3. Project Structure

```text
weather-dashboard/
│
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── app.py
│   └── venv/
│
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

### Important Files

`backend/app.py`

* Menjalankan Flask server.
* Mengambil API key dari environment variable `WEATHER_API_KEY`.
* Mengakses OpenWeather API.
* Menyediakan endpoint `/weather`.

`frontend/index.html`

* Struktur utama halaman Weather Dashboard.
* Berisi input kota, tombol search, dan area hasil.

`frontend/script.js`

* Mengatur interaksi search.
* Mengirim request ke backend.
* Mengolah response JSON.
* Menampilkan data cuaca ke halaman.

`frontend/style.css`

* Mengatur seluruh tampilan dan styling frontend.

`backend/.env`

* Menyimpan API key secara lokal.
* Jangan menuliskan API key ke source code atau dokumentasi project.

---

## 4. Current Backend Architecture

Backend menggunakan Flask dan berjalan pada:

```text
http://127.0.0.1:5000
```

Endpoint utama:

```text
GET /weather?city=<nama kota>
```

Contoh:

```text
http://127.0.0.1:5000/weather?city=Jakarta
```

Backend mengambil API key dari:

```text
WEATHER_API_KEY
```

Data yang dikembalikan backend saat request berhasil meliputi:

* city
* country
* temperature
* feels_like
* humidity
* description
* wind_speed
* pressure
* visibility

---

## 5. Current Frontend Flow

Alur aplikasi saat ini:

```text
User memasukkan nama kota
        ↓
Klik Search
        ↓
frontend/script.js
        ↓
fetch ke backend
        ↓
GET /weather?city=<city>
        ↓
Flask backend
        ↓
OpenWeather API
        ↓
Backend menerima data cuaca
        ↓
Backend mengirim JSON
        ↓
Frontend menampilkan weather card
```

Frontend saat ini menggunakan:

```text
http://127.0.0.1:5000/weather
```

sebagai alamat backend.

---

## 6. Current UI

Halaman utama memiliki:

* Judul "Weather Dashboard"
* Input nama kota
* Tombol "Search"
* Area untuk menampilkan hasil
* Weather card setelah pencarian berhasil

Jika input kota kosong, frontend menampilkan pesan:

```text
Masukin nama kota dulu ya sayang
```

Jika frontend gagal menghubungi backend, frontend menampilkan:

```text
Gagal terhubung ke server
```

---

## 7. Current Weather Data Display

Saat pencarian berhasil, frontend menampilkan:

* Nama kota dan negara
* Waktu/tanggal pencarian
* Temperature
* Weather description
* Feels like
* Humidity
* Wind speed
* Pressure
* Visibility

---

## 8. Current Project Status

### Completed

* [x] Basic frontend layout
* [x] City search input
* [x] Search button
* [x] Flask backend
* [x] Backend `/weather` endpoint
* [x] OpenWeather API integration
* [x] Frontend-to-backend fetch request
* [x] Display current weather data
* [x] Basic error handling
* [x] Git repository
* [x] GitHub repository

### Not Yet Implemented / Possible Future Features

* [ ] Weather forecast
* [ ] Better loading state
* [ ] Better error messages
* [ ] Weather icons
* [ ] Search history
* [ ] Responsive/mobile improvements
* [ ] More detailed weather information
* [ ] Improved UI/UX
* [ ] Better backend error handling
* [ ] Production deployment

---

## 9. Important Development Notes

This project is currently a learning project.

Prioritize:

1. Keep the existing functionality working.
2. Make changes incrementally.
3. Avoid unnecessary rewrites.
4. Explain important changes before making large architectural changes.
5. Preserve the current frontend/backend separation unless there is a good reason to change it.
6. When modifying the API response structure, also check the frontend code that consumes the response.

Do not hardcode the API key into `app.py`, JavaScript, HTML, CSS, or this documentation.

The API key should remain in the local `.env` file.

---

## 10. Running the Project Locally

### Start Backend

Open a terminal in the project root:

```bash
cd backend
```

Activate the virtual environment if necessary.

Then run:

```bash
python app.py
```

The Flask backend should run on:

```text
http://127.0.0.1:5000
```

### Start Frontend

Open the `frontend/index.html` using the preferred local development method.

The frontend must be able to access the Flask backend running on port `5000`.

---

## 11. Git Workflow

After making changes:

```bash
git status
```

Review the changed files.

Then:

```bash
git add .
```

Create a descriptive commit:

```bash
git commit -m "Describe the change"
```

Push to GitHub:

```bash
git push
```

GitHub is the source of truth for the latest committed version of this project.

---

## 12. How AI Should Work With This Project

When an AI assistant starts a new session with this repository, it should:

1. Read this `PROJECT_CONTEXT.md`.
2. Read the current project structure.
3. Inspect the relevant source files before making changes.
4. Check recent Git history when the previous development context is unclear.
5. Treat the current GitHub repository as the source of truth for the latest committed code.
6. Avoid assuming that code mentioned in an old conversation still exists.
7. If a requested change affects both frontend and backend, inspect both sides before modifying anything.
8. Do not expose, reproduce, or request the actual API key stored in `.env`.

Before making a major change, explain:

* Which files need to change.
* What the change will do.
* Whether the backend API contract changes.
* Whether existing functionality could be affected.

---

## 13. Current Development Goal

Continue developing the Weather Dashboard from its current basic working state.

The immediate goal is to gradually turn the simple current-weather search into a more complete and polished weather dashboard while keeping the code understandable and maintainable.

Do not assume that future features have already been implemented. Always verify the current repository before continuing development.
