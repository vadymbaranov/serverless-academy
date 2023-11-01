import { program } from 'commander';
import TelegramBot from 'node-telegram-bot-api';

program
    .name('console-bot')
    .description('Telegram bot from your console')
    .version('1.0.0');

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to your own personal bot');
});

program
    .command('send-message')
    .description('Send a message to your telegram bot')
    .alias('m')
    .alias('message')
    .argument('<message>', 'message to send')
    .action(async (str) => {
        await bot.sendMessage(chatId, str);
        process.exit();
    });

program
    .command('send-photo')
    .alias('p')
    .alias('photo')
    .argument('<path>')
    .description('Send an image to your telegram bot')
    .action(async (image) => {
        await bot.sendPhoto(chatId, image);
        process.exit();
    });

program.parse();

