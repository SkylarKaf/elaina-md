module.exports = {
	name: "ytmp3",
	param: "<url>",
	cmd: ["ytmp3", "yta", "ytaudio"],
	category: "downloader",
	desc: "download audio from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		conn.sendReact(m.from, '🕒', m.key)
		const down = await scrapp.youtube("mp3", await scrapp.expandUrl(text));
		const link = down.link;
		down.author = down.author.name;
		const mdata = {
			title: down.title,
			album: config.botname,
			artist: await conn.getName(m.sender),
			image: {
				mime: 'image/png',
				type: {
					id: 3,
					name: 'front cover'
				}				
			}
		}
		var thumb_yt = {url: down.thumbnail}
		if (link == undefined) return m.reply("Cannot find download url!");
		if (m.type != "templateButtonReplyMessage" && m.type != "buttonsResponseMessage")
		try{
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 100 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(link)}`)
			await conn.sendMessage(m.from,{ document: { url: link }, mimetype: "audio/mpeg", fileName: `${mdata.title}.mp3`},{ quoted: m });
		}catch{
			const down = await scrapp.y1s('mp3', await scrapp.expandUrl(text))
			if(!down.status) return m.reply(down)
			if(!down.dlink) return m.reply("Cannot find download url!");
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 100 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(down.dlink)}`)
			await conn.sendMessage(m.from, {document: {url: down.dlink}, mimetype: 'audio/mpeg', fileName: `${mdata.title}.mp3`}, {quoted: m})
		}
    },
};
