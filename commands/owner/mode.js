module.exports = {
	name: "self/public",
	cmd: ["self", "public"],
	category: "owner",
	owner: true,
	async handler(m, { conn }) {
		if (m.command == "self") {
			m.user.jadibot ? conn.self = true : attr.isSelf = true;
			m.reply("Self mode active");
		} else {
			m.user.jadibot ? conn.self = false : attr.isSelf = false;
			m.reply("Public mode active");
		}
	},
};
