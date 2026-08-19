import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv('WEATHER_API_KEY')

def get_weather(city):
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        'q': city,
        'appid': API_KEY,
        'units': 'metric'
    }
    response = requests.get(url, params=params)
    data = response.json()

    if response.status_code != 200:
        return None

    weather_info = {
    'city': data['name'],
    'country': data['sys']['country'],
    'temperature': round(data['main']['temp']),
    'feels_like': round(data['main']['feels_like']),
    'humidity': data['main']['humidity'],
    'description': data['weather'][0]['description'],
    'wind_speed': data['wind']['speed'],
    'pressure': data['main']['pressure'],
    'visibility': round(data['visibility'] / 1000, 1)
    }
    return weather_info

@app.route('/weather')
def weather():
    city = request.args.get('city')

    if not city:
        return jsonify({'error': 'Parameter city wajib diisi'}), 400

    hasil = get_weather(city)

    if hasil is None:
        return jsonify({'error': 'Kota tidak ditemukan'}), 404

    return jsonify(hasil)

if __name__ == '__main__':
    app.run(debug=True, port=5000)