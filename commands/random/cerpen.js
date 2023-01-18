module.exports = {
	name: 'cerpen',
	cmd: ['cerpen', 'randomcerpen'],
	category: 'random',
 	async handler(m, { conn }) { 	 
	   conn.sendReact(m.from, '🕒', m.key);
 	   var crp = dhn.Cerpen()
 	   m.reply(crp) 	     
	}
}