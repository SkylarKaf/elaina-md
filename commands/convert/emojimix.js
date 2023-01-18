const {sticker} = require("../../lib/convert");
module.exports = {
	name: 'emojimix',
	param: '<emoji1+emoji2>',
	cmd: ['emojimix', 'mix'],
	category: 'converter',
	desc: 'Mixing two emoji',
	async handler(m, {conn, text}){
		conn.sendReact(m.from, '🕒', m.key);
		let emoji = text.split('&')[0]
		emoji = emoji.replace(/\s/g, '') // kalo ada spasi
    	if (emoji.includes('+')) emoji = emoji.replace('+', '') // kalo ada +
    	const parseEmoji = emoji.slice(0, 2)
    	const parseEmoji2 = emoji.slice(2)
    	const emo = await scrapp.emojimix(parseEmoji, parseEmoji2 ? parseEmoji2 : undefined)
    	const packInfo = { packname: `${parseEmoji}${parseEmoji2 ? ' + ' + parseEmoji2 : ''}`, author: "Elaina | Skylarkaf" };
    	if(emo == undefined || emo.code || emo.results == '') return m.reply('Emoji not support!')
    	const stop = parseEmoji2 != '' ? 1 : emo.results.length < 5 ? emo.results.length : 5
    	for(let i=0; i<stop; i++){
    		const stickerBuff = await sticker(await tool.getBuffer(emo.results[i].url), {
                    isImage: true,
                    withPackInfo: true,
                    packInfo,
                    cmdType: "1"
                });
    		await conn.sendMessage(m.from, {sticker: stickerBuff})
    	}
	}
}