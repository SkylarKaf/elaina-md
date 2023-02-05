const { toAudio } = require("../../lib/converter");
module.exports = {
	name: "tomp3",
	param: "<reply audio>",
	cmd: ["tomp3", "toaudio"],
	category: "converter",
	desc: "convert video to audio!",
	async handler(m, { conn, isQVideo, isMedia }) {
		if ((isMedia && m.message.videoMessage) || isQVideo) {
			conn.sendReact(m.from, '🕒', m.key);
			const toaud = await toAudio(
				isMedia ? await m.download() : await m.quoted.download(),
				"mp3"
			);
			await conn.sendMessage(
				m.from,
				{ audio: toaud, mimetype: "audio/mpeg" },
				{ quoted: m, ptt: false }
			);
		}
	},
};
