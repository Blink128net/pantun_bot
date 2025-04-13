module.exports = (bot) => {
    bot.onText(/^\/start$/, (msg) => {
      const chatId = msg.chat.id;
  
      const keyboard = {
        reply_markup: {
          keyboard: [
            [{ text: '🎉 Pantun Lucu' }, { text: '💔 Pantun Galau' }],
            [{ text: '💘 Pantun Cinta' }, { text: '😍 Pantun Gombal' }],
            [{ text: '🧠 Pantun Bijak' }, { text: '📜 Pantun Random' }],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      };
  
      bot.sendMessage(chatId, `Hai ${msg.from.first_name}! Pilih jenis pantun yang kamu mau di bawah ini:`, keyboard);
    });
  };
  console.log("aktif")