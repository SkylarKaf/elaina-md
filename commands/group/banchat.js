module.exports = {
    name: 'banchat',
    cmd: ['banchat', 'mute'],
    category: 'group',
    desc: 'mute chat in group',
    group: true,
    admin: true,
    async handler(m, {conn}){
        await db.read()
        if(db.data.mute.includes(m.from)) return m.reply('Bot telah dimute digroup sebelumnya!')
        db.data.mute.push(m.from)
        await db.write()
        m.reply('Bot dimute digroup ini!')
    }
}