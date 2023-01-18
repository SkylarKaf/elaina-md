const axios = require('axios');
module.exports = {
	name: 'neko',
	cmd: ['neko', 'randomneko'],
	category: 'animanga',
	async handler(m, { conn }) { 	 
 	  axios.get(`https://nekos.life/api/v2/img/neko`)
 	   .then(({data}) => {		
 	    conn.sendReact(m.from, '🕒', m.key);
 	    conn.sendButtonImageV2(
		 m.from,
		 { url : data.url },
		 `Furry ya bg?`,
		 "Click next untuk melanjutkan",
		 [`Next`],
		 [`.neko`],
		 { quoted: m }
	   );
	 })
   }
}