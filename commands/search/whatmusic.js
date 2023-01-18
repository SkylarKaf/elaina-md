module.exports = {
    name: 'whatmusic',
    param: '<reply audio/video>',
    cmd: ['whatmusic'],
    category: 'search',
    desc: 'Search song title',
    quoted: 'reply audio/video!',
    async handler(m, {conn}){
        if(m.quoted && (m.quoted.mtype == 'audioMessage' || m.quoted.mtype == 'videoMessage')){
            const smusic = await rzky.search.whatmusic(await m.quoted.download())
            m.reply(await tool.parseResult('WHAT MUSIC', smusic, {delete: ['creator']}))
        }
        else m.reply('reply audio/video')
    }
}