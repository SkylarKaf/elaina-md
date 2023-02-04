module.exports = {
	name: "ytmp4",
	param: "<url>",
	cmd: ["ytmp4", "yta", "ytvideo"],
	category: "downloader",
	desc: "download video from youtube",
	query: true,
	url: true,
	async handler(m, { conn, text }) {
		conn.sendReact(m.from, '🕒', m.key)
		const down = await scrapp.youtube("mp4", await scrapp.expandUrl(text));
		const link = down.link;
		down.author = down.author.name;
		if (link == undefined) return m.reply("Cannot find download url!");
		if (m.type != "templateButtonReplyMessage" && m.type != "buttonsResponseMessage")
	   try{
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 150 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(link)}`)
			await conn.sendMessage(m.from, { video: { url: link }, mimetype: "video/mp4", fileName: down.title }, { quoted: m});
		}catch{
			const down = await scrapp.y1s('mp4', await scrapp.expandUrl(text))
			if(!down.status) return m.reply(down)
			if(!down.dlink) return m.reply("Cannot find download url!");
			const tsize = down.size.split(' ')[1]
			if(down.size.split('.')[0].split(' ')[0] > 150 && tsize != 'KB' || tsize == "GB") return m.reply(`Oversize, silahkan download melalui link dibawah\n${await tool.tiny(down.dlink)}`)
			await conn.sendMessage(m.from, { video: { url: down.dlink }, mimetype: "video/mp4", fileName: down.title }, {quoted: m})
		}
	},
};
