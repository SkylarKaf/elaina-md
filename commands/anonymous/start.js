const fs = require('fs')
const anonpath = './database/json/anonymous.json'
let foundp = '*Partner Ditemukan*\n\n'
foundp += `${shp} .Next\n    > _Mencari partner lain_\n`
foundp += `${shp} .Stop\n    > _Keluar dari anonymous room_\n`
foundp += `${shp} Kirim Kontak\n    > _Untuk mengirim kontak anda ke lawan main anda_`
let footer = `Anonymous Chat Bot`
module.exports = {
    name: 'start',
    cmd: ['start'],
    category: 'anonymous',
    desc: 'Start the anonymous chat!',
    private: true,
    async handler(m, {conn}){
        const button = [
            {
                quickReplyButton: {
                    displayText: "Next",
                    id: ".next",
                },
            },
            {
                quickReplyButton: {
                    displayText: "Stop",
                    id: ".stop",
                },
            },
            {
                quickReplyButton: {
                    displayText: "Kirim Kontak",
                    id: `.sendkontak`,
                },
            },
        ];
        const anony = JSON.parse(fs.readFileSync(anonpath))
        const splayer = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender))
        if(splayer != undefined) return m.reply('Anda masih berada didalam room!')
        await m.reply('Mencari partner....\nHarap tunggu +- 1 menit')
        const sroom = Object.values(anony).find(anon => anon.status == 'waiting')
        if(sroom != undefined){
            sroom.b = m.sender
            sroom.status = 'chatting'
            await fs.writeFileSync(anonpath, JSON.stringify(anony, null, 2))
            await conn.sendButton(m.from, foundp, footer, button)
            await conn.sendButton(sroom.a, foundp, footer, button)
        }
        else{
            anony[m.sender] = {
                id: m.sender,
                a: m.sender,
                b: null,
                status: 'waiting'
            }
            await fs.writeFileSync(anonpath, JSON.stringify(anony, null, 2))
            await tool.sleep(60000)
            const timeout = JSON.parse(fs.readFileSync(anonpath))
            if(timeout[m.sender].b == null){
                m.reply('Waktu habis')
                delete timeout[m.sender]
                await fs.writeFileSync(anonpath, JSON.stringify(timeout, null, 2))
            }
        }
    }
}