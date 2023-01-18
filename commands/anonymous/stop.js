const fs = require('fs')
const anonpath = './database/json/anonymous.json'
module.exports = {
    name: 'stop',
    cmd: ['stop'],
    category: 'anonymous',
    desc: 'Stop anonymous chat',
    private: true,
    async handler(m, {conn}){
        let leave = '*Partner meninggalkan obrolan*\n\n'
        leave += `${shp} .Start\n    > _Mulai anonymous chat><_`
        let stop = '*Anda telah keluar dari obrolan*\n\n'
        stop += `${shp} .Start\n    > _Mulai anonymous chat><_`
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
        const to = splayer.a == m.sender ? splayer.b : splayer.a
        await conn.sendButton(m.from, stop, footer, button)
        if(to != null) await conn.sendButton(to, leave, footer, button)
        delete anony[splayer.b == m.sender ? splayer.a : splayer.a]
        await fs.writeFileSync(anonpath, JSON.stringify(anony, null, 2))
    }
}
