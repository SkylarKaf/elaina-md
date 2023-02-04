module.exports = {
    name: ["blackpink", "thunder", "futuristicneon", "galaxyneon", "matrix", "thundercloud"],
    cmd: ["blackpink", "thunder", "futuristicneon", "galaxyneon", "matrix", "thundercloud"],   
    category: "textpro",
    query: "Input text",
    async handler(m, { conn, q }) {        	
		conn.sendReact(m.from, '🕒', m.key)
		if (/blackpink/.test(m.command)) link = 'https://textpro.me/create-neon-light-blackpink-logo-text-effect-online-1081.html'
		if (/thunder/.test(m.command)) link = 'https://textpro.me/online-thunder-text-effect-generator-1031.html'
		if (/futuristicneon/.test(m.command)) link = 'https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html'
		if (/galaxyneon/.test(m.command)) link = 'https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html'
		if (/matrix/.test(m.command)) link = 'https://textpro.me/matrix-style-text-effect-online-884.html'
		if (/thundercloud/.test(m.command)) link = 'https://textpro.me/create-thunder-text-effect-online-881.html'
	    let skylrkaf = await maker.textpro(link, q)
        conn.sendMessage(m.from, { image: { url: skylrkaf }, caption: `Succes!` }, { quoted: m })
        }
};
