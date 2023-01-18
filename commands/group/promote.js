module.exports = {
	name: "promote",
	param: "<tag/reply chat>",
	cmd: ["promote", "pm"],
	category: "group",
	desc: "To promote someone`s position to admin",
	group: true,
	admin: true,
	botAdmin: true,
	async handler(m, { conn, admin }) {
		let participant = m.mentions[0]
			? m.mentions[0]
			: m.quoted
			? m.quoted.sender
			: text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
		if (participant.replace(/\D/g, "") == "")
			return m.reply("Example : .promote @0", {
				mentions: ["0@s.whatsapp.net"],
			});
		if (m.groupMetadata.admin.includes(participant))
			return m.reply("The user is already an admin");
		await conn.groupParticipantsUpdate(m.from, [participant], "promote");
		await m.reply("Sukses Promote user");
	},
};
