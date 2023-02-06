// HAYOLOO MAU AMBIL THUMBNAIL GEDE YA?

const fs = require("fs");
async function greeting(json, conn) {
	const action = json.action;
	await db.read();	
	if (action == "add") {
		const cekdata = db.data.welcome[json.id];
		if (cekdata == undefined) return;
		if (!cekdata.status) return;
		const mdata = await conn.groupMetadata(json.id).catch(() => {
			return
		})
		const user = json.participants[0];
		const subject = mdata.subject;
		const desc = mdata.desc.toString();
		const txt = cekdata.welcome ? cekdata.welcome : `Halo @${user.split("@")[0]} 👋🏻\nSelamat datang di Group ${mdata.subject}\nPatuhi rules group ini ya...`;
		const ruser = txt.replace(/@user/, user);
		const rsubject = ruser.replace(/@subject/g, subject);
		const greet = rsubject.replace(/@desc/g, desc);
		const pp_user = await conn.profilePictureUrl(user, 'image').catch(() => 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png')
		const ppuser = await tool.getBuffer(pp_user)  	
	 	 let buttons = [{buttonId: `.`, buttonText: {displayText: 'Welcome 👋'}, type: 1}]
         let welcomeMessage = {
              document: ppuser,
              mimetype: `application/rtf`,                 
              fileName: `${mdata.subject}`,
              fileLength: 9999999999,
              caption: txt,
              footer: `welcome msg by @elaina-md`,
              buttons: buttons,
              mentions: [user],
              headerType: 4,
              contextInfo:{externalAdReply:{
                title: `Welcome to ${mdata.subject}`,
                body: `Semoga betah disini :)`,
                jpegThumbnail: ppuser,
                thumbnail: ppuser,
                mediaType: 1,             
                renderLargerThumbnail: true, 
                "previewType": "VIDEO",
                "mediaUrl": `pp`,
                sourceUrl: `pp`
                 }}
                }                
    conn.sendMessage(json.id, welcomeMessage, {withTag: true})                
   	} else if (action == "remove") {
		const cekdata = db.data.left[json.id];
		if (cekdata == undefined) return;
		if (!cekdata.status) return;
		const mdata = await conn.groupMetadata(json.id).catch(() => {
			return
		})
		const user = json.participants[0];
		const subject = mdata.subject;
		const desc = mdata.desc.toString();
		const txt = cekdata.welcome ? cekdata.welcome : `Selamat jalan @${user.split("@")[0]} 👋🏻`;
		const ruser = txt.replace(/@user/, user);
		const rsubject = ruser.replace(/@subject/g, subject);
		const greet = rsubject.replace(/@desc/g, desc);
		const pp_user = await conn.profilePictureUrl(user, 'image').catch(() => 'https://divedigital.id/wp-content/uploads/2021/10/2-min.png')
		const ppuser = await tool.getBuffer(pp_user)  	
	 	 let buttons = [{buttonId: `.`, buttonText: {displayText: 'Byee 👋'}, type: 1}]
         let leaveMessage = {
              document: ppuser,
              mimetype: `application/rtf`,                 
              fileName: `${mdata.subject}`,
              fileLength: 9999999999,
              caption: txt,
              footer: `leaveing msg by @elaina-md`,
              buttons: buttons,
              mentions: [user],
              headerType: 4,
              contextInfo:{externalAdReply:{
                title: `Leaving from ${mdata.subject}`,
                body: `Balik lagi ya :(`,
                jpegThumbnail: ppuser,
                thumbnail: ppuser,
                mediaType: 1,             
                renderLargerThumbnail: true, 
                "previewType": "VIDEO",
                "mediaUrl": `pp`,
                sourceUrl: `pp`
                 }}
                }                
    conn.sendMessage(json.id, leaveMessage, {withTag: true})       
		}
}
module.exports = greeting;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log("Update 'greetings.js'");
	delete require.cache[file];
});
