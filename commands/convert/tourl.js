module.exports = {
    name: 'tourl',
    param: '<reply/send image/video>',
    cmd: ['tourl'],
    category: 'converter',
    desc: 'upload media to telegraph',
    async handler(m, {conn}){
        conn.sendReact(m.from, '🕒', m.key);
        if(!m.quoted && (m.type == 'imageMessage' || m.type == 'videoMessage')){
            const tele = await tool.telegraph(await m.download())
            m.reply(tele)
        }
        else if(m.quoted && (m.quoted.mtype == 'imageMessage' ||  m.quoted.mtype == 'videoMessage')){
            const tele = await tool.telegraph(await m.quoted.download())
            m.reply(tele)
        }
        else if(m.quoted && (m.quoted.mtype == 'documentMessage' || m.quoted.mtype == 'stickerMessage' || m.quoted.mtype == 'audioMessage')){
            const upload = await tool.ugu(await m.quoted.download())
            if(upload.status != 200) return m.reply('Error : File extension not support')
            await m.reply(await tool.parseResult('TO URL', upload.result))
        }
    }
}
