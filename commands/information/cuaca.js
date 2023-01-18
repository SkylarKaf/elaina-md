module.exports = {
  name: 'cuaca',
  param: '<place>',
  cmd: ['cuaca', 'weather'],
  category: 'information',
  desc: 'Get info about weather',
  query: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key);
    m.reply(await tool.parseResult('INFO CUACA', await scrapp.cuaca(text)))
  }
}
