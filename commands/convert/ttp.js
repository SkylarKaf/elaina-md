const {sticker} = require("../../lib/convert");
module.exports = {
  name: 'ttp',
  param: '<text>',
  cmd: ['ttp'],
  category: 'converter',
  desc: 'Create sticker text',
  query: 'Enter parameter <text>\nExample: .ttp test',
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key);
    const sttp = await scrapp.ttp(text)
    if(!sttp.status) return m.reply(sttp)
    const packInfo = { packname: text, author: "Elaina | Skylarkaf" };
    const stickerBuff = await sticker(await tool.getBuffer(sttp.result), {
      isImage: true,
      withPackInfo: true,
      packInfo,
      cmdType: "1"
    });
    await conn.sendMessage(m.from, {sticker: stickerBuff}, {quoted: m})
  }
}
