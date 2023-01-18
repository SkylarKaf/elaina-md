module.exports = {
	name: "group",
	param: "<open/close>",
	cmd: ["group", "gc"],
	category: "group",
	desc: "Used to open and close groups",
	group: true,
	admin: true,
	botAdmin: true,
	async handler(m, { conn, args }) {
		if (args[0] == "open") {
			if (!(await conn.groupMetadata(m.from)).announce)
				return m.reply("The group has been open before");
			await conn.groupSettingUpdate(m.from, "not_announcement");
		} else if (args[0] == "close") {
			if ((await conn.groupMetadata(m.from)).announce)
				return m.reply("The group has been closed before");
			await conn.groupSettingUpdate(m.from, "announcement");
		}
	},
};
