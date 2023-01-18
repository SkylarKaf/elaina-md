module.exports = {
	name: 'zippyshare',
	param: '<url>',
	cmd: ['zippyshare', 'zippydl', 'zippy'],
	category: "downloader",
	desc: 'Download media from zippyshare',
	query: true,
	url: true,
	async handler(m, {conn, text}){		
	try {
	 conn.sendReact(m.from, '🕒', m.key)
     let result = await cph.downloader.zippyshare(text)     
   conn.sendFile(m.from, result.url, `${text.title}`, "", m)
   } catch (e) {
   m.reply(`Error!, kemungkinan link zippy expired`)
   }
  }
}