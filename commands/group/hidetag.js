module.exports = {
	name: "hidetag",
	param: "<text/reply chat>",
	cmd: ["hidetag"],
	category: "group",
	group: true,
	admin: true,
	botAdmin: true,
	async handler(m, { conn, text, isMedia }) {
		const tag = (await conn.groupMetadata(m.from)).participants.map(
			(par) => par.id
		);
		if (!m.quoted && !isMedia && text) {
			await conn.sendMessage(m.from, { text: text, mentions: tag });
		} else if (!m.quoted && isMedia) {
			m.message.imageMessage.caption = text;
			m.copyNForward(m.from, true, {
				contextInfo: { mentionedJid: tag },
			});
		} else if (m.quoted) {
			await m.quoted.copyNForward(m.from, true, {
				contextInfo: { mentionedJid: tag },
			});
		}
	},
};
