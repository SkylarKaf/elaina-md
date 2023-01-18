module.exports = {
	name: 'funfact',
	cmd: ['funfact', 'faktamenarik'],
	category: 'information',
 	async handler(m, { conn }) { 	 
	   conn.sendReact(m.from, '🕒', m.key);
 	   var txt = rzky.randomtext.fakta()
 	   buttons = [{buttonId: `.funfact`, buttonText: {displayText: 'Next'}, type: 1}]
 	   anu = `• Fakta Menarik\n\n`
 	   anu += `${txt.result}`     
          let buttonMessage = {
          text: anu,
          footer: `Click next untuk melanjutkan`,
          buttons: buttons,
          headerType: 4,         
           }
    conn.sendMessage(m.from, buttonMessage, { quoted: m })          
 	}
}