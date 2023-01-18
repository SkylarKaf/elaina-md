module.exports = {
  name: 'unblock',
  param: '<number/reply chat>',
  cmd: ['unblock'],
  category: 'owner',
  owner: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key);
    require('./block').handler(m, {conn, text})
  }
}
