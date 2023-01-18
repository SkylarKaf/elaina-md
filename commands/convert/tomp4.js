const fs = require("fs");
const { exec } = require("child_process");
const { webp2mp4 } = require("../../lib/tools");
module.exports = {
	name: "tomp4",
	param: "<reply sticker>",
	cmd: ["tovideo", "tomp4"],
	category: "converter",
	desc: "Change sticker to video",
	quoted: { sticker: true },
	async handler(m, { conn }) {
    	conn.sendReact(m.from, '🕒', m.key);
		await require("./toimg").handler(m, { conn });
	},
};
