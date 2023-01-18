module.exports = {
  name: 'twitter',
  param: '<url>',
  cmd: ['twitter'],
  category: 'downloader',
  desc: 'Download twitter media',
  query: true,
  url: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key)
    const twit = await scrapp.twitterdl2(text)
    if(!twit.status) return m.reply(twit)
    const url = twit.hd ? twit.hd : twit.sd
    if(!url) return m.reply("Link download not found!")
    await conn.sendFileFromUrl(m.from, url, {}, {quoted: m, adReply: true})
  }
}
