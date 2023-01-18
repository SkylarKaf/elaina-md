module.exports = {
    name: 'function_typo',
    function: true,
    typo: true,
    async handler(m, {conn, isOwner, isAdmin}){
        if(m.command == '') return
        try{
            pe = await Object.values(attr.commands).filter(plugin => !plugin.disabled)
            cmd = []
            pe.map(cemde => {
                cemde.cmd.map(ps => {
                    cmd.push(ps)
                })
            })
            typo = await rzky.tools.detectTypo(m.command, cmd)
            if(typo.result != ''){
                if(typo.result[0].keakuratan >= '0.70'){
                    m.reply(`_Mungkin yang anda maksud adalah : .*${typo.result[0].teks}*_\n\nKeakuratan : ${typo.result[0].keakuratan}\n\n_Silahkan ulang jika benar_`)
                }
            }
        }catch{}
    }
}