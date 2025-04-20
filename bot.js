const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

const token = process.env.BOT_TOKEN; // atau bisa langsung string token-nya
const bot = new TelegramBot(token, { polling: true });

// Load semua command dari folder commands
const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  command(bot);
}
const startCommand = require("./commands/start");
startCommand(bot);
