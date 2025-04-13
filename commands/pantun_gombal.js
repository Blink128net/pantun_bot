const fs = require('fs');
const path = require('path');

function getPantun() {
  const data = fs.readFileSync(path.join(__dirname, '../data/pantun_gombal.json'));
  const pantunList = JSON.parse(data);
  return pantunList[Math.floor(Math.random() * pantunList.length)];
}

module.exports = (bot) => {
    bot.onText(/^😍 Pantun Gombal$/, (msg) => {
      bot.sendMessage(msg.chat.id, getPantun());
    });
  };