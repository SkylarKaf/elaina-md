const fs = require('fs')
module.exports = {
    name: 'anonymous',
    function: true,
    async handler(m, {conn}){
        if(m.isGroup) return
        if(m.command) return
        const anony = JSON.parse(fs.readFileSync('./database/json/anonymous.json'))
        const find = Object.values(anony).find(anon => [anon.a, anon.b].includes(m.sender) && anon.status == 'chatting')
        if(find){
            const to = find.a == m.sender ? find.b : find.a
            await conn.copyNForward(to, m, true)
        }
    }
}