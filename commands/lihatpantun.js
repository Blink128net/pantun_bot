const fs = require('fs');
const path = require('path');

const allowedCategories = [
  'lucu',
  'galau',
  'cinta',
  'gombal',
  'bijak'
];

function loadPantun(category) {
  const filePath = path.join(__dirname, `../data/pantun_${category}.json`);
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

module.exports = (bot) => {
  bot.onText(/^\/lihatpantun (lucu|galau|cinta|gombal|bijak)/i, (msg, match) => {
    const chatId = msg.chat.id;
    const category = match[1].toLowerCase();

    if (!allowedCategories.includes(category)) {
      return bot.sendMessage(chatId, `Kategori tidak dikenali. Gunakan salah satu dari: ${allowedCategories.join(', ')}`);
    }

    try {
      const pantunList = loadPantun(category);
      if (pantunList.length === 0) {
        return bot.sendMessage(chatId, `Belum ada pantun di kategori *${category}*.`, { parse_mode: 'Markdown' });
      }

      pantunList.forEach((pantun, index) => {
        bot.sendMessage(chatId, `📜 *${category.toUpperCase()}* #${index + 1}\n\n${pantun}`, { parse_mode: 'Markdown' });
      });
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, '❌ Gagal memuat pantun. Coba lagi nanti.');
    }
  });
};
