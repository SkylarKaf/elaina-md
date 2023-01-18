let { yta } = require("../../lib/y2mate");
module.exports = {
	name: "ytmp3",
	param: "<url>",
	cmd: ["ytmp3", "ytaudio", "yta"],
	category: "downloader",
	desc: "download audio from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		conn.sendReact(m.from, '🕒', m.key)	
          let quality = '128kbps'
          let media = await yta(text, quality)	         
          let thumbs = {url: media.thumb}		
          if (media.filesize >= 999999) return m.reply('*AKSES DITOLAK!*, size Media terlalu besar! '+util.format(media))
	    conn.sendMessage(m.from, { document: {url:media.dl_link}, fileName: `${media.title}.mp3`, mimetype: 'audio/mp3', jpegThumbnail: await tool.resize(thumbs, 300, 200)}, { quoted: m })						
    }
}