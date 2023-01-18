const axios = require('axios');
module.exports = {
	name: 'wallnime',
	cmd: ['wallnime', 'wallpaperanime', 'randomwallnime'],
	category: 'animanga',
	async handler(m, { conn }) { 	 
 	  axios.get(`https://nekos.life/api/v2/img/neko`)
 	   .then(({data}) => {		
 	    conn.sendReact(m.from, '🕒', m.key);
 	    conn.sendButtonImageV2(
		 m.from,
		 { url : data.url },
		 `Random Wallnime`,
		 "Click next untuk melanjutkan",
		 [`Next`],
		 [`.wallnime`],
		 { quoted: m }
	   );
	 })
   }
}