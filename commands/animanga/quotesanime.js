module.exports = {
	name: 'quotesanime',
	cmd: ['quotesanime', 'katakataanime', 'quoteanime', 'randomquotesanime'],
	category: 'animanga',
	async handler(m, { conn }) {
 	   let anu = await scrapp.quotesAnime()
       result = anu[Math.floor(Math.random() * anu.length)]
 	   buttons = [{buttonId: `.quotesanime`, buttonText: {displayText: 'Next'}, type: 1}]
 	     var txt = `• Quotes Anime\n\n`
 	        txt += `${result.quotes}\n\n`
            txt += `- ${result.karakter}\n` 	  
            txt += `- ${result.anime} Eps ${result.episode}`
          let buttonMessage = {
          text: txt,
          footer: `Click next untuk melanjutkan`,
          buttons: buttons,
          headerType: 4,         
           }
    conn.sendMessage(m.from, buttonMessage, { quoted: m })          
 	}
} 