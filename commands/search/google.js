module.exports = {
  name: 'google',
  param: '<query>',
  cmd: ['google'],
  category: 'search',
  desc: 'Search content in Google.com',
  query: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key)
    const ggs = await scrapp.google(text)
    if(!ggs.status) return m.reply('Content not found!')
    m.reply(await tool.parseResult(`Google Search : ${text}`, ggs.result, {delete: ['header']}))
  }
}
