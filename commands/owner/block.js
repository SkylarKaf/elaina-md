module.exports = {
  name: 'block',
  param: '<number/reply chat>',
  cmd: ['block'],
  category: 'owner',
  owner: true,
  async handler(m, {conn, text}){
    const action = m.command == 'block' ? 'block' : 'unblock'
    if(m.quoted){
      await conn.updateBlockStatus(m.quoted.sender, action)
      m.reply(`Succsess ${action} User`)
    }
    else if(!m.quoted && m.mentions  != ''){
      await conn.updateBlockStatus(m.mentions[0], action)
      m.reply(`Succsess ${action} User`)
    }
  }
}
