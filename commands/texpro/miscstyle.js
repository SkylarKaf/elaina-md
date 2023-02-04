module.exports = {
    name: ["cage", "knitted", "sketch", "artisticquote", "cloud"],
    cmd: ["cage", "knitted", "sketch", "artisticquote", "cloud"],
    category: "textpro",
    desc: "Texpro category misc style",
    query: "Input text",
    async handler(m, { conn, q }) {        	
		conn.sendReact(m.from, '🕒', m.key)
		if (/cage/.test(m.command)) link = 'https://textpro.me/create-cage-text-effect-online-1110.html'
		if (/knitted/.test(m.command)) link = 'https://textpro.me/create-a-knitted-text-effect-online-1109.html'
		if (/sketch/.test(m.command)) link = 'https://textpro.me/create-a-sketch-text-effect-online-1044.html'
		if (/artisticquote/.test(m.command)) link = 'https://textpro.me/create-artistic-black-and-white-status-and-quote-with-your-photos-1021.html'
		if (/cloud/.test(m.command)) link = 'https://textpro.me/create-a-cloud-text-effect-on-the-sky-online-1004.html'		
	    let skylrkaf = await maker.textpro(link, q)
        conn.sendMessage(m.from, { image: { url: skylrkaf }, caption: `Succes!` }, { quoted: m })
        }
};