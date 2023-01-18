module.exports = {
  name: 'mediafire',
  param: '<url>',
  cmd: ['mediafire'],
  category: 'downloader',
  desc: 'Download media from mediafire',
  query: true,
  url: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key)
    const mfire = await scrapp.mediafire(text)
    if(!mfire.status) return m.reply(mfire)
    await m.reply(await tool.parseResult('MEDIAFIRE DOWNLOADER', mfire))
    const tsize = mfire.filesize.includes('.') ? mfire.filesize.split('.')[1].replace(/\d/g, '') : mfire.filesize.replace(/\d/g, '')
    const size = mfire.filesize.includes('.') ? mfire.filesize.split('.')[0].replace(/\D/g, '') : mfire.filesize.replace(/\D/g, '')
    if(tsize != 'KB' && size > 100 || tsize == 'GB') return m.reply('Oversized, silahkan download menggunakan link diatas')
    await conn.sendMessage(m.from, {document: await tool.getBuffer(mfire.link), mimetype: mfire.mimetype, fileName: `${mfire.filename}`}, {quoted: m, adReply: true})
  }
}