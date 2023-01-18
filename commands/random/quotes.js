module.exports = {
	name: 'quotes',
	cmd: ['quotes', 'katakata', 'quote', 'randomquotes'],
	category: 'random',
	async handler(m, { conn }) {
 	   const res = dhn.Quotes()
 	   buttons = [{buttonId: `.quotes`, buttonText: {displayText: 'Next'}, type: 1}]
 	     var txt = `• Random Quotes\n\n`
 	        txt += `${res.quotes}\n\n`
            txt += `- ${res.author}` 	     
          let buttonMessage = {
          text: txt,
          footer: `Click next untuk melanjutkan`,
          buttons: buttons,
          headerType: 4,         
           }
    conn.sendMessage(m.from, buttonMessage, { quoted: m })          
 	}
} 