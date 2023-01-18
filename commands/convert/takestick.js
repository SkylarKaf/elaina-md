module.exports = {
	name: "takestick",
	param: "<reply sticker>",
	cmd: ["take", "takestick"],
	category: "converter",
	quoted: {
		sticker: true,
	},
	async handler(m, { conn, text, isQSticker }) {
		await require("./sticker").handler(m, { conn, text, isQSticker });
	},
};
