module.exports = {
  name: 'igstalk',
  param: '<username>',
  cmd: ['igstalk'],
  category: 'stalk',
  desc: 'View ig profile',
  query: true,
  async handler(m, {conn, text}){
    conn.sendReact(m.from, '🕒', m.key)	
    try{
      const stalk = await ig.igstalk(text)
      if(!stalk.status) return m.reply('User not found!')
      stalkimg = await tool.getBuffer(stalk.profile.high)
      txt = `*INSTAGRAM STALK*\n\n`
      txt += `*• name:* ${stalk.data.fullname}\n`
      txt += `*• followers:* ${stalk.data.follower}\n`
      txt += `*• following:* ${stalk.data.following}\n`
      txt += `*• bio:* ${stalk.data.bio}\n`
      txt += `*• url:* ${stalk.data.url}\n`
      txt += `*• id:* ${stalk.data.id}\n`      
      await conn.sendMessage(m.from, {image : stalkimg, caption: txt}, {quoted:m})
      }catch{
      m.reply('User not found!')
      }
   }
}