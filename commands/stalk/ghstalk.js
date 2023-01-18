module.exports = {
	name: 'githubstalk',
	param: '<username>',
	cmd: ['githubstalk', 'ghstalk'],
	category: 'stalk',
	desc: 'View profile github by username',
	query: 'Input the username\nExample : .githubstalk SkylarKaf',
	async handler(m, {conn, text}){
 	 conn.sendReact(m.from, '🕒', m.key)	
	 const gh = await scrapp.ghuser(text)
	   if(!gh.status) return m.reply('User not found!')
	    stalkimg = await tool.getBuffer(gh.user.avatarUrl)
        txt = `*GITHUB STALK*\n\n`
        txt += `*• name:* ${gh.user.username}\n`
        txt += `*• followers:* ${gh.user.followers}\n`
        txt += `*• following:* ${gh.user.following}\n`      
        txt += `*• company:* ${gh.user.company}\n`
        txt += `*• blog:* ${gh.user.blog}\n`
        txt += `*• bio:* ${gh.user.bio}\n`
        txt += `*• url:* ${gh.user.githubUrl}\n`
        txt += `*• repo:* ${gh.user.publicRepos}\n`    
      await conn.sendMessage(m.from, {image : stalkimg, caption: txt}, {quoted:m})
    }
}