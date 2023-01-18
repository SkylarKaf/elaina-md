const prettyms = require("pretty-ms");
module.exports = {
    name: 'listbot',
    cmd: ['listbot', 'listjadibot'],
    category: 'jadibot',
    desc: 'Menampilkan list jadibot',
    async handler(m, {conn}){
        if(Object.keys(conns) == '') return m.reply('Tidak ada client bot')
        const array = Object.values(conns).filter(s => s.user)
        if(array == '') return m.reply('Tidak ada client bot')
        const mapp = array.map(s => s.user)
        let jbot = `*LIST JADIBOT*\n`
        jbot += `${shp} Total : ${mapp.length}\n\n`
        for(let i of mapp){
            jbot += `${shp} No : @${i.id.split(':')[0]}\n`
            jbot += `${shp} Uptime : ${await prettyms(Date.now() - i.uptime, {verbose: true})}\n\n`
        }
        m.reply(jbot, {withTag: true})
    }
}