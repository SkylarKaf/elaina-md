module.exports = {
	name: "welcome",
	param: "<on/off>",
	cmd: ["welcome"],
	category: "group",
	desc: `Turn on or off welcome`,
	group: true,
	admin: true,
	async handler(m, { conn, args }) {
		await db.read();
		if (args[0] == "on") {
			if (
				db.data.welcome[m.from] != undefined &&
				db.data.welcome[m.from].status == true
			)
				return m.reply(`Welcome has been activated previously!`);
			db.data.welcome[m.from] = {
				id: m.from,
				status: true,
				welcome: "",
			};
			await db.write();
			m.reply(`Welcome has been activated in this group`);
		} else if (args[0] == "off") {
			if (db.data.welcome[m.from] == undefined)
				return m.reply("Welcome is not activated in this group");
			if (!db.data.welcome[m.from].status)
				return m.reply(`Welcome is not activated in this group`);
			db.data.welcome[m.from].status = false;
			await db.write();
			m.reply(`Welcome has been deactivated in this group`);
		} else m.reply("Select on/off");
	},
};
