module.exports = {
    name: 'tagall',
    cmd: ['tagall'],
    category: 'group',
    desc: 'Tag All member group',
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {text}){
        let tag = `_*TAG ALL*_\n`
        if(text) tag += `${text}\n`
        for(let i of m.groupMetadata.participants.map(mp => mp.id)){
            tag += `\n${shp} @${i.split('@')[0]}`
        }
        m.reply(tag, {withTag: true})
    }
}