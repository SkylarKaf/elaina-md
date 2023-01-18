const axios = require('axios');
module.exports = {
	name: 'loli',
	cmd: ['loli', 'randomloli'],
	category: 'animanga',
	async handler(m, { conn }) { 	 
 	  axios.get(`https://api-lolis.vercel.app/loli`)
 	   .then(({data}) => {		
 	    conn.sendReact(m.from, '🕒', m.key);
 	    conn.sendButtonImageV2(
		 m.from,
		 { url : data.url },
		 `Anjg pedo`,
		 "Click next untuk melanjutkan",
		 [`Next`],
		 [`.loli`],
		 { quoted: m }
	   );
	 })
   }
}