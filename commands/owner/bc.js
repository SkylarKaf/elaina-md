module.exports = {
  name: 'bc',
  param: '<text/reply media>',
  cmd: ['bc'],
  category: 'owner',
  owner: true,
  async handler(m, {conn, text, isMedia}){
    if(!text && !m.quoted && !isMedia) return m.reply('Mau bc apaan?')
      const id = Object.keys(await conn.groupFetchAllParticipating())
      for(let i of id){
        if(m.quoted){
          if(m.quoted.message[m.quoted.mtype] != 'conversation'){
            m.quoted.message[m.quoted.mtype].caption = text + '\n\n' + config.namebot + ` Broadcast`
            conn.copyNForward(i, m.quoted)
          }
        }
        else if(text && !isMedia){
          await conn.sendMessage(i, {text: text + '\n\n' + config.namebot + ` Broadcast`})
        }
        else if(isMedia){
          m.message[m.type].caption = text + '\n\n' + config.namebot + ` Broadcast`
          await conn.copyNForward(i, m)
        }
        await tool.sleep(7000)
      }
  }
}
