module.exports = {
	name: 'garing',
	cmd: ['garing'],
	category: 'random',
	async handler(m, { conn }) { 	 
 	   var meme = dhn.JalanTikusMeme()
 	   conn.sendReact(m.from, '🕒', m.key);
 	   await conn.sendButtonImageV2(
		 m.from,
		 await tool.getBuffer(meme),
		 `Luxu ?`,
		 "Click next untuk melanjutkan",
		 [`Next`],
		 [`.garing`],
		 { quoted: m }
	   );
	}
}