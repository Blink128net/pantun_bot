const fs = require('fs');
const path = require('path');

function getPantun() {
  const data = fs.readFileSync(path.join(__dirname, '../data/pantun_bijak.json'));
  const pantunList = JSON.parse(data);
  return pantunList[Math.floor(Math.random() * pantunList.length)];
}

module.exports = (bot) => {
  bot.onText(/^\/pantun_bijak$/, (msg) => {
    bot.sendMessage(msg.chat.id, getPantun());
  });

  bot.onText(/^🧠 Pantun Bijak$/, (msg) => {
    bot.sendMessage(msg.chat.id, getPantun());
  });
};






// module.exports = (bot) => {
//     bot.onText(/^\/pantun_bijak$/, (msg) => {
//       const pantun = pantunBijak[Math.floor(Math.random() * pantunBijak.length)];
//       bot.sendMessage(msg.chat.id, pantun);
//     });
  
//     bot.onText(/^🧠 Pantun Bijak$/, (msg) => {
//       const pantun = pantunBijak[Math.floor(Math.random() * pantunBijak.length)];
//       bot.sendMessage(msg.chat.id, pantun);
//     });
//   };
  