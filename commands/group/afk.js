const fs = require("fs");
module.exports = {
	name: "afk",
	param: "<reason>",
	cmd: ["afk"],
	category: "group",
	desc: "Away From Keyboard",
	async handler(m, { conn, text }) {
		const afk = JSON.parse(fs.readFileSync("./database/json/afk.json"));
		afk[m.sender] = {
			id: m.sender,
			time: Date.now(),
			reason: text ? text : "nothing",
		};
		await fs.writeFileSync("./database/json/afk.json", JSON.stringify(afk));
		await conn.sendMessage(m.from, {text: `Afk mode activated\nReason : ${text ? text : "Nothing"}`}, {quoted: m});
	},
};
