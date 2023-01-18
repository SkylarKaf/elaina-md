module.exports = {
	name: "left",
	param: "<on/off>",
	cmd: ["left"],
	category: "group",
	desc: `Turn on or off left`,
	group: true,
	admin: true,
	async handler(m, { conn, args }) {
		await db.read();
		if (args[0] == "on") {
			if (db.data.left[m.from] != undefined && db.data.left[m.from].status == true)
				return m.reply(`left has been activated previously!`);
			db.data.left[m.from] = {
				id: m.from,
				status: true,
				left: "",
			};
			await db.write();
			m.reply(`left has been activated in this group`);
		} else if (args[0] == "off") {
			if (db.data.left[m.from] == undefined)
				return m.reply("left is not activated in this group");
			if (!db.data.left[m.from].status)
				return m.reply(`left is not activated in this group`);
			db.data.left[m.from].status = false;
			await db.write();
			m.reply(`left has been deactivated in this group`);
		} else m.reply("Select on/off");
	},
};
