const axios = require('axios');
module.exports = {
	name: 'shota',
	cmd: ['shota', 'randomshota'],
	category: 'animanga',
	async handler(m, { conn }) { 	 
 	  axios.get(`https://api-lolis.vercel.app/shota`)
 	   .then(({data}) => {		
 	    conn.sendReact(m.from, '🕒', m.key);
 	    conn.sendButtonImageV2(
		 m.from,
		 { url : data.url },
		 `Anjg pedo`,
		 "Click next untuk melanjutkan",
		 [`Next`],
		 [`.shota`],
		 { quoted: m }
	   );
	 })
   }
}