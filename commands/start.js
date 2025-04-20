// commands/start.js

const { isUserJoined } = require("../utils/checkJoin");

module.exports = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    const joined = await isUserJoined(bot, userId);

    if (!joined) {
      bot.sendMessage(chatId, `🚫 Kamu belum join channel kami.
      
Silakan join dulu sebelum menggunakan bot ini.`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "📢 Join Channel", url: "https://t.me/namachannel_kamu" }],
            [{ text: "✅ Sudah Join", callback_data: "check_join" }]
          ]
        }
      });
      return;
    }

    bot.sendMessage(chatId, "✅ Selamat datang! Kamu sudah join.");
  });

  bot.on("callback_query", async (query) => {
    if (query.data === "check_join") {
      const userId = query.from.id;
      const chatId = query.message.chat.id;

      const joined = await isUserJoined(bot, userId);

      if (joined) {
        bot.sendMessage(chatId, "✅ Terima kasih sudah join! Kamu bisa lanjut.");
      } else {
        bot.sendMessage(chatId, "❗ Kamu masih belum join. Coba lagi setelah join ya.");
      }
    }
  });
};
