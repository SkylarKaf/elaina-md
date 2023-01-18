const {execSync} = require('child_process')
const fs = require('fs')
module.exports = {
    name: 'backup',
    cmd: ['backup'],
    category: 'owner',
    owner: true,
    async handler(m, {conn}){
        await m.reply(response.wait)
        const ls = (await execSync('ls')).toString().split('\n').filter(pe => pe != 'node_modules' && pe != 'package-lock.json' && pe != 'baileys_store.json' && pe != 'test.js' && pe != 'kanaeru.json' && pe != 'jadibot' && pe != 'Dockerfile' && pe != 'temp' && pe != '')
        const exec = await execSync(`zip -r backup_bot.zip ${ls.join(' ')}`)
        await conn.sendMessage(m.from, {document: await fs.readFileSync('./backup_bot.zip'), mimetype: 'application/zip', fileName: 'backup_bot.zip'}, {quoted: m})
        await execSync('rm -rf backup_bot.zip')
    }
}