const fs = require('fs');
const path = require('path');

function getAllPantun() {
  const files = [
    'pantun_lucu.json',
    'pantun_galau.json',
    'pantun_cinta.json',
    'pantun_gombal.json',
    'pantun_bijak.json'
  ];
  let allPantun = [];

  for (const file of files) {
    const data = fs.readFileSync(path.join(__dirname, '../data/', file));
    allPantun = allPantun.concat(JSON.parse(data));
  }

  return allPantun[Math.floor(Math.random() * allPantun.length)];
}

module.exports = (bot) => {
  bot.onText(/^📜 Pantun Random$/, (msg) => {
    bot.sendMessage(msg.chat.id, getAllPantun());
  });

  bot.onText(/^\/pantun$/, (msg) => {
    bot.sendMessage(msg.chat.id, getAllPantun());
  });
};
