module.exports = {
    name: ["3dmetalic", "golden", "metalic", "transformer", "harrypotter"],
    cmd: ["3dmetalic", "golden", "metalic", "transformer", "harrypotter"],
    category: "textpro",
    desc: "Texpro category metalic style",
    query: "Input text",
    async handler(m, { conn, q }) {        	
		conn.sendReact(m.from, '🕒', m.key)
		if (/3dmetalic/.test(m.command)) link = 'https://textpro.me/create-3d-metallic-text-with-details-online-1108.html'
		if (/golden/.test(m.command)) link = 'https://textpro.me/create-realistic-golden-text-effect-on-red-sparkles-online-1082.html'
		if (/metalic/.test(m.command)) link = 'https://textpro.me/create-a-metallic-text-effect-free-online-1041.html'
		if (/transformer/.test(m.command)) link = 'https://textpro.me/create-a-transformer-text-effect-online-1035.html'
		if (/harrypotter/.test(m.command)) link = 'https://textpro.me/create-harry-potter-text-effect-online-1025.html'
	    let skylrkaf = await maker.textpro(link, q)
        conn.sendMessage(m.from, { image: { url: skylrkaf }, caption: `Succes!` }, { quoted: m })
        }
};
