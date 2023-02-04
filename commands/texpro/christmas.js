module.exports = {
    name: ["turquoise", "festive", "snow", "wintercold", "3dfrozen", "christmastree", "candy", "3dchristmas", "merrychristmas", "christmasholiday", "xmas-cards", "icecold", "snowfootprints"],
    cmd: ["turquoise", "festive", "snow", "wintercold", "3dfrozen", "christmastree", "candy", "3dchristmas", "merrychristmas", "christmasholiday", "xmas-cards", "icecold", "snowfootprints"],
    category: "textpro",
    desc: "Texpro category christmas",
    query: "Input text",
    async handler(m, { conn, q }) {        	 	
		conn.sendReact(m.from, '🕒', m.key)
		if (/turquoise/.test(m.command)) link = 'https://textpro.me/gold-and-turquoise-christmas-3d-text-style-effect-1104.html'
		if (/festive/.test(m.command)) link = 'https://textpro.me/create-christmas-festive-text-effects-online-1103.html'
		if (/snow/.test(m.command)) link = 'https://textpro.me/create-beautiful-3d-snow-text-effect-online-1101.html'
		if (/wintercold/.test(m.command)) link = 'https://textpro.me/create-winter-cold-snow-text-effect-online-1100.html'
		if (/3dfrozen/.test(m.command)) link = 'https://textpro.me/create-realistic-3d-text-effect-frozen-winter-1099.html'
		if (/christmastree/.test(m.command)) link = 'https://textpro.me/christmas-tree-text-effect-online-free-1057.html'
		if (/candy/.test(m.command)) link = 'https://textpro.me/create-christmas-candy-cane-text-effect-1056.html'
		if (/3dchristmas/.test(m.command)) link = 'https://textpro.me/3d-christmas-text-effect-by-name-1055.html'
		if (/merrychristmas/.test(m.command)) link = 'https://textpro.me/sparkles-merry-christmas-text-effect-1054.html'
		if (/christmasholiday/.test(m.command)) link = 'https://textpro.me/create-a-christmas-holiday-snow-text-effect-1007.html'
		if (/snowfootprints/.test(m.command)) link = 'https://textpro.me/create-snow-text-effects-for-winter-holidays-1005.html'
		if (/xmascards/.test(m.command)) link = 'https://textpro.me/xmas-cards-3d-online-942.html'
		if (/icecold/.test(m.command)) link = 'https://textpro.me/ice-cold-text-effect-862.html'
	    let skylrkaf = await maker.textpro(link, q)
        conn.sendMessage(m.from, { image: { url: skylrkaf }, caption: `Succes!` }, { quoted: m })
        }
};