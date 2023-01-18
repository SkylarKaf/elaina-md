module.exports = {
    name: 'unbanchat',
    cmd: ['unbanchat', 'unmute'],
    category: 'group',
    desc: 'mute chat in group',
    group: true,
    admin: true,
    async handler(m, {conn}){
        await db.read()
        if(!db.data.mute.includes(m.from)) return m.reply('Bot tidak dimute digroup ini!')
        db.data.mute.splice(db.data.mute.indexOf(m.from), 1)
        await db.write()
        m.reply('Bot diunmute digroup ini!')
    }
}