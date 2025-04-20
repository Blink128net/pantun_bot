// utils/checkJoin.js

const channelUsername = '@indonesia_bots'; // ganti sesuai channel kamu

module.exports = async function checkJoin(bot, userId) {
  try {
    const res = await bot.getChatMember(channelUsername, userId);
    return ['member', 'administrator', 'creator'].includes(res.status);
  } catch (err) {
    console.error('❗ Gagal cek member:', err.message);
    return false;
  }
};
