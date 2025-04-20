const fs = require('fs');
const path = require('path');

const allowedCategories = [
  'lucu',
  'galau',
  'cinta',
  'gombal',
  'bijak'
];

function savePantun(category, text) {
  const filePath = path.join(__dirname, `../data/pantun_${category}.json`);
  const data = fs.readFileSync(filePath);
  const pantunList = JSON.parse(data);

  pantunList.push(text);

  fs.writeFileSync(filePath, JSON.stringify(pantunList, null, 2));
}

module.exports = (bot) => {
  bot.onText(/^\/tambahpantun (lucu|galau|cinta|gombal|bijak) (.+)/i, (msg, match) => {
    const chatId = msg.chat.id;
    const category = match[1].toLowerCase();
    const newPantun = match[2].trim();
    const allowedUserId = 123456789;
    try {
        // if (msg.from.id !== allowedUserId) {
        //     return bot.sendMessage(chatId, '❌ Kamu tidak punya akses untuk menambahkan pantun.');
        //   }
      if (!allowedCategories.includes(category)) {
        return bot.sendMessage(chatId, `Kategori tidak dikenal. Kategori yang tersedia: ${allowedCategories.join(', ')}`);
      }

      savePantun(category, newPantun);
      bot.sendMessage(chatId, `✅ Pantun berhasil ditambahkan ke kategori *${category}*`, { parse_mode: 'Markdown' });
    } catch (err) {
      console.error(err);
      bot.sendMessage(chatId, '❌ Gagal menambahkan pantun. Pastikan formatnya benar.');
    }
  });
};
