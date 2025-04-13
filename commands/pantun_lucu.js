const fs = require('fs');
const path = require('path');

function getPantun() {
  const data = fs.readFileSync(path.join(__dirname, '../data/pantun_lucu.json'));
  const pantunList = JSON.parse(data);
  return pantunList[Math.floor(Math.random() * pantunList.length)];
}

module.exports = (bot) => {
  bot.onText(/^\/pantun_lucu$/, (msg) => {
    bot.sendMessage(msg.chat.id, getPantun());
  });

  bot.onText(/^🎉 Pantun Lucu$/, (msg) => {
    bot.sendMessage(msg.chat.id, getPantun());
  });
};
