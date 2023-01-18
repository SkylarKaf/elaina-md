const {sticker} = require("../../lib/convert");
const encodeurl = require('encodeurl')
module.exports = {
    name: 'smeme',
    param: '<reply/send image>',
    cmd: ['smeme'],
    category: 'converter',
    query: 'Wrong Format\nExample : .smeme Test|oke',
    async handler(m, {conn, text}){
        text = text.replace(/\?/g, '')
        let t1 = await encodeurl(text.split('|')[0] ? text.split('|')[0] : '_')
        let t2 = await encodeurl(text.split('|')[1] ? text.split('|')[1] : '_')
        if(m.quoted && (m.quoted.mtype == 'stickerMessage' || m.quoted.mtype == 'imageMessage')){
            conn.sendReact(m.from, '🕒', m.key);
            const upload = await tool.ugu(await m.quoted.download())
            const packInfo = { packname: `StickMeme`, author: "Elaina | Skylarkaf" };
            const url = await encodeurl(`https://api.memegen.link/images/custom/${t1}/${t2}.png?background=${upload.result.url}`)
            const stickerBuff = await sticker(await tool.getBuffer(url), {
                isImage: true,
                withPackInfo: true,
                packInfo,
                cmdType: "1"
            });
            await conn.sendMessage(m.from, {sticker: stickerBuff}, {quoted: m})
        }
        else if(!m.quoted && (m.type == 'stickerMessage' || m.type == 'imageMessage')){
            conn.sendReact(m.from, '🕒', m.key);
            const upload = await tool.ugu(await m.download())
            const packInfo = { packname: `StickMeme`, author: "Elaina | Skylarkaf" };
            const stickerBuff = await sticker(await tool.getBuffer(`https://api.memegen.link/images/custom/${t1}/${t2}.png?background=${upload.result.url}`), {
                isImage: true,
                withPackInfo: true,
                packInfo,
                cmdType: "1"
            });
            await conn.sendMessage(m.from, {sticker: stickerBuff}, {quoted: m})
        }
        else m.reply('reply/send image')
    }
}
