const yts = require('yt-search')
module.exports = {
  name: 'play',
  param: '<query>',
  cmd: ['ytsearch', 'yts', 'play'],
  category: 'downloader',
  desc: 'search video in web youtube.com',
  query: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key);
    const url = await yts(text)
    const filter = url.all.filter(s => s.type == 'video')
    const listSerch = []
    for (let i of filter) {
      listSerch.push({
        title: i.title, rows:[
          {title: "Audio", rowId: `.ytmp3 ${i.url}`, description: `• Description : ${i.description}\n\n• Duration : ${i.timestamp}`},
          {title: "Video", rowId: `.ytmp4 ${i.url}`, description: `• Description : ${i.description}\n\n• Duration : ${i.timestamp}`}]
      })
    }
    var listMessage = {
      text: `Result From ${text}`,
      footer: config.botname,
      title: "[ YouTube Search ]",
      buttonText: "Click Here",
      sections: listSerch
    }
    await conn.sendMessage(m.from, listMessage, {quoted: m})
  }
}
