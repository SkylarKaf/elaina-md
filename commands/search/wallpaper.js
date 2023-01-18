module.exports = {
	name: "wallpaper",
	param: "<query>",
	cmd: ["wallpaper", 'wall'],
	category: "search",
	desc: "Search image from peakpx.com",
	query: true,
	async handler(m, { conn, text }) {
		conn.sendReact(m.from, '🕒', m.key);
		const pin = await scrapp.peakpx(text);
		if (pin == "") return m.reply("Image not found!");
		const rand = await tool.randomobj(pin);
		await conn.sendButtonImageV2(
			m.from,
			await tool.getBuffer(rand.image),
			`Wallpaper : ${text}`,
			"Click Button above to get again",
			[`GET AGAIN`],
			[`.wallpaper ${text}`],
			{ quoted: m }
		);
	},
};
