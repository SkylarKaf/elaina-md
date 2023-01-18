const toms = require('ms')
module.exports = {
    name: ['antispam_function'],
    antispam: true,
    function: true,
    async handler(m, {conn, msgId, isOwner, zx}){
        if(m.command && m.type != 'buttonsResponseMessage' ){
            if(m.from in conn.cooldown == false){
                conn.cooldown[m.from] = {
                    id: m.from,
timestamp: Date.now() + await toms('6000')
                }
                setTimeout(() => {
                    delete conn.cooldown[m.from]
                }, 6000)
            }
        }
    }
}