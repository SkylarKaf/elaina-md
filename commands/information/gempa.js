module.exports = {
  name: 'infogempa',
  cmd: ['gempa', 'infogempa'],
  category: 'information',
  desc: 'Get info about earthquake',
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key);
    const gempa = await scrapp.gempa(text)
    m.reply(await tool.parseResult('INFO GEMPA', gempa.data, {delete: ['imagemap']}))
   }
}