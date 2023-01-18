module.exports = {
    name: 'sc',
    cmd: ['sc', 'source', 'sourcecode'],
    category: 'other',
    async handler(m, {conn}){
     repo = await scrapp.ghrepo("rzky-multidevice")
     txt = `*SOURCE*\n`
     txt += `Sc : https://github.com/Rizky878/rzky-multidevice\n`
     txt += `Watch : ${repo.items[0].watchers}\n`
     txt += `Forks : ${repo.items[0].forks}\n`
     txt += `Language : ${repo.items[0].language}\n`
     txt += `Create : ${repo.items[0].createdAt}\n`
     txt += `Update : ${repo.items[0].updatedAt}\n\n`
     txt += `*Tq credits*\n`
     txt += `• Rzkyfdlh\n• Zynfinity\n• SkylarKaf\n• Senkuu\n• ZeraID`    
      m.reply(txt)
    }
}