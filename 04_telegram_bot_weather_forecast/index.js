import TelegramBot from 'node-telegram-bot-api';
import { getWeather } from './weatherService.js';

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to your own personal bot');

    const initialReply = {
        reply_markup: {
            keyboard: [['Weather in Venice']],
            resize_keyboard: true,
            one_time_keyboard: true,
        },
    };

    bot.sendMessage(msg.chat.id, 'Check weather in Venice', initialReply);
});

bot.on('message', async (msg) => {
    if (msg.text === 'Weather in Venice') {
        bot.sendMessage(msg.chat.id, 'Select your interval', {
            reply_markup: {
                keyboard: [['3 hour interval', '6 hour interval']],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        });
    }

    if (msg?.text === '3 hour interval') {
        const weather = await getWeather(3);
        await bot.sendMessage(msg.chat.id, weather);
    }

    if (msg?.text === '6 hour interval') {
        const weather = await getWeather(6);
        await bot.sendMessage(msg.chat.id, weather);
    }
});
