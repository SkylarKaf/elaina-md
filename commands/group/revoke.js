module.exports = {
	name: "revoke",
	cmd: ["revoke", "revokelink"],
	category: "group",
	desc: "Used to revoke link group",
	group: true,
	admin: true,
	botAdmin: true,
	async handler(m, { conn, args }) {
		const rev = await conn.groupRevokeInvite(m.from);
		m.reply("Link grup berhasil di reset!");
	},
};
