import axios from 'axios';

const apiKey = process.env.OPENWEATHER_API_KEY;
const apiUrl = process.env.OPENWEATHER_API_URL;

const weatherRequest = axios.create({
    baseURL: `${apiUrl}`,
    params: {
        appid: apiKey,
        lat: '45.438759',
        lon: '12.327145',
        units: 'metric',
    },
});

export async function getWeather(interval = 3) {
    try {
        const { data } = await weatherRequest.get();

        const { list, city } = data;

        let forecast = [...list];

        if (interval === 6) {
            forecast = list.filter((item, index) => index % 2 === 0);
        }

        const title = `Forecast for city: ${city.name}, ${city.country}\n\n`;
        let weather = '';

        forecast.slice(0, 9).forEach((item) => {
            weather +=
                `${item?.dt_txt}\n` +
                `Weather: ${item?.weather[0]?.main}, ${item?.weather[0]?.description},\n` +
                `Temperature: ${item?.main?.temp} C, \n` +
                `Clouds: ${item?.clouds?.all}%, \n` +
                `Precipation: ${item?.pop}%, \n\n`;
        });

        return title + weather;
    } catch (err) {
        console.error(err);
    }
}
