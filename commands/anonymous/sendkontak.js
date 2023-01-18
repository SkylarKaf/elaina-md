const fs = require('fs')
const anonpath = './database/json/anonymous.json'
module.exports = {
    name: 'sendkontak',
    cmd: ['sendkontak'],
    category: 'anonymous',
    desc: 'mengirim kontak anda ke lawan main anda',
    private: true,
    ignored: true,
    async handler(m, {conn}){
        const anony = JSON.parse(fs.readFileSync(anonpath))
        const splayer = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender))
        if(splayer == undefined) return m.reply('Anda belum memulai anonymous\nKetik .start untuk mulai bermain')
        if(splayer && splayer.b == null) return m.reply('Anda belum mempunyai partner!')
        const to = splayer.a == m.sender ? splayer.b : splayer.a
        await conn.sendContact(to, [m.sender], m).then(async s => await conn.sendMessage(to, {text: 'Bot : _Partner chat kamu mengirimkan kontaknya><_'}, {quoted: m}))
        await m.reply('Berhasil mengirim kontak')
    }
}