module.exports = {
  name: 'delete',
  param: '<reply chat>',
  cmd: ['delete', 'del'],
  category: 'other',
  desc: 'Delete message bot',
  quoted: true,
  async handler(m, {conn, isAdmin}){
    if(!m.quoted.key.fromMe && !isAdmin) return m.reply('Reply message from Bot!')
    await conn.sendMessage(m.from, {delete: {...m.quoted.key, participant: m.quoted.sender}})
  }
}
