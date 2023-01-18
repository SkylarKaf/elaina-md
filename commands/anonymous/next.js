const fs = require('fs')
const anonpath = './database/json/anonymous.json'
module.exports = {
    name: 'next',
    cmd: ['next'],
    category: 'anonymous',
    desc: 'Mencari partner lain di anonymous!',
    private: true,
    async handler(m, {conn}){
        let leave = '*Partner meninggalkan obrolan*\n\n'
        leave += `${shp} .Start\n    > _Mulai anonymous chat><_`
        let footer = `Anonymous Chat Bot`
        const button = [
            {
                quickReplyButton: {
                    displayText: "Start",
                    id: ".start",
                },
            }
        ];
        const anony = JSON.parse(fs.readFileSync(anonpath))
        const splayer = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender))
        if(splayer == undefined) return m.reply('Anda belum memulai anonymous\nKetik .start untuk mulai bermain')
        if(splayer && splayer.b == null) return m.reply('Anda belum mempunyai partner!')
        const to = splayer.a == m.sender ? splayer.b : splayer.a
        await conn.sendButton(to, leave, footer, button)
        delete anony[splayer.b == m.sender ? splayer.a : splayer.a]
        await fs.writeFileSync(anonpath, JSON.stringify(anony, null, 2))
        await require('./start').handler(m, {conn})
    }
}