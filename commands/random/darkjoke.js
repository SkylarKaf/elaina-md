module.exports = {
	name: 'darkjoke',
	cmd: ['darkjoke', 'darkjokes'],
	category: 'random',
	async handler(m, { conn }) { 	 
 	   var meme = dhn.Darkjokes()
 	   conn.sendReact(m.from, '🕒', m.key);
 	   await conn.sendButtonImageV2(
		 m.from,
		 await tool.getBuffer(meme),
		 `Ini darkjoke?`,
		 "Click next untuk melanjutkan",
		 [`Next`],
		 [`.darkjoke`],
		 { quoted: m }
	   );
	}
}