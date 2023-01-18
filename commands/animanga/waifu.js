const axios = require('axios');
module.exports = {
	name: 'waifu',
	cmd: ['waifu', 'randomwaifu'],
	category: 'animanga',
	async handler(m, { conn }) { 	 
 	  axios.get(`https://api.waifu.pics/sfw/waifu`)
 	   .then(({data}) => {		
 	    conn.sendReact(m.from, '🕒', m.key);
 	    conn.sendButtonImageV2(
		 m.from,
		 { url : data.url },
		 `Bini gw itu`,
		 "Click next untuk melanjutkan",
		 [`Next`],
		 [`.waifu`],
		 { quoted: m }
	   );
	 })
   }
}