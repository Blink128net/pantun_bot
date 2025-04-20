// utils/checkJoin.js

const TelegramBot = require('node-telegram-bot-api');

// Username channel publik (pakai @)
const CHANNEL_USERNAME = "@indonesia_bots"; // Ganti sesuai channel kamu

// Fungsi cek apakah user sudah join channel
async function isUserJoined(bot, userId) {
  try {
    const res = await bot.getChatMember(CHANNEL_USERNAME, userId);
    const status = res.status;
    return status === 'member' || status === 'administrator' || status === 'creator';
  } catch (error) {
    console.error("❌ Error cek join:", error.message);
    return false;
  }
}

module.exports = { isUserJoined };
