module.exports = {
  name: 'owner',
  cmd: ['owner'],
  category: 'other',
  async handler(m, {conn}){
    await conn.sendContact(m.from, [owner[0]], m)
  }
}