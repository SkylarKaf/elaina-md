let { ytv } = require("../../lib/y2mate");
module.exports = {
	name: "ytmp4",
	param: "<url>",
	cmd: ["ytmp4", "ytvid", "ytvideo", "ytv"],
	category: "downloader",
	desc: "download video from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		conn.sendReact(m.from, '🕒', m.key)	
          let quality = '360p'
          let media = await ytv(text, quality)		
          if (media.filesize >= 999999) return m.reply('*AKSES DITOLAK!*, size Media terlalu besar! '+util.format(media))
	    conn.sendMessage(m.from, { video: {url:media.dl_link}, mimetype: 'video/mp4', fileName: `${media.title}.mp4`}, { quoted: m })						
    }
}