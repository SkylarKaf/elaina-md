module.exports = {
	name: 'couple',
	cmd: ['couple', 'ppcp'],
	category: 'animanga',
	async handler(m, { conn }) { 	 
 	  conn.sendReact(m.from, '🕒', m.key);
 	   let anu = await tool.fetchJson('https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json')
 	   let random = anu[Math.floor(Math.random() * anu.length)]
 	  conn.sendMessage(m.from, { image: { url: random.male }, caption: `Couple Male` }, { quoted: m })
      conn.sendMessage(m.from, { image: { url: random.female }, caption: `Couple Female` }, { quoted: m }) 	   
   }
}