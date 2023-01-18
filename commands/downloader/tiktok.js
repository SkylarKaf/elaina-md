module.exports = {
    name: "tiktok",
    param: "<url>",
    cmd: ["tiktok", "ttdl", "tt", "ttmp4", "ttnowm", "tiktoknowm"],
    category: "downloader",
    desc: "Download video from tiktok",
    query: true,
    url: true,
    async handler(m, {conn, text}) {
        conn.sendReact(m.from, '🕒', m.key)
            const down = await cph.downloader.tiktok(text);
			conn.sendMessage(m.from, { video: { url: down.nowm }, caption: `${down.title}`}, { quoted: m })                                
    },
};
