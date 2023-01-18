module.exports = {
    name: "tiktokmp3",
    param: "<url>",
    cmd: ["tiktokmp3", "ttmp3", "ttaudio", "tiktokaudio"],
    category: "downloader",
    desc: "Download audio from tiktok",
    query: true,
    url: true,
    async handler(m, { conn, text }) {
		conn.sendReact(m.from, '🕒', m.key)
        const down = await cph.downloader.tiktok(text);          		
        conn.sendMessage(m.from, { audio: { url: down.audio }, mimetype: 'audio/mp4'}, { quoted: m })						
    }
}