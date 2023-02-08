const fs = require("fs");
const moment = require("moment-timezone");
const {serialize} = require("./serialize");
const chalk = require("chalk");
const ms = require('parse-ms');
const Baileys = require("baileys");
const { logger } = Baileys.DEFAULT_CONNECTION_CONFIG;
const {addhit} = require("../database/hit");
let d = new Date(new Date() + 3600000);
let date = d.toLocaleDateString("id", {
  day: "numeric",
  month: "long",
  year: "numeric",
});
async function handler(conn, msg) {
    if (msg.type !== "notify") return;
    const m = await serialize(JSON.parse(JSON.stringify(msg.messages[0])), conn);
    if (!m.message) return;
    if(m.user.jadibot && conn.self && !owner.includes(m.sender)) return
    else if(attr.isSelf && !owner.includes(m.sender)) return;
    if (Object.keys(m.message)[0] == "senderKeyDistributionMessage") delete m.message.senderKeyDistributionMessage;
    if (Object.keys(m.message)[0] == "messageContextInfo") delete m.message.messageContextInfo;
    if (m.key && m.key.remoteJid === "status@broadcast") return;
    if (m.type === "protocolMessage" || m.type === "senderKeyDistributionMessage" || !m.type || m.type === "") return;
    const findmsg = conn.mess.find((ped) => ped.key.id == m.id)
    if (findmsg) return
    else conn.mess.push(m);
    if (conn.mess.length >= 100) conn.mess = [];
    if (m.sender.startsWith("2")) return;
    global.config = require("../config");
    global.store = m.user.jadibot ? conn.store : baileysstore
    await db.read()
    //constanta
    const {body,type,quoted,mentions,id,from,sender} = m;
    const chats = type == 'extendedTextMessage' && m.quoted && m.quoted.key.fromMe && !m.quoted.key.id.startsWith('BAE5') ? '.' + m.quoted.key.id.split('_')[0] + ' ' + body : type == "conversation" || type == "imageMessage" || type == "videoMessage" || type == "extendedTextMessage" || (type == "templateButtonReplyMessage" && m.quoted.key.fromMe) || (type == "buttonsResponseMessage" && m.quoted.key.fromMe) || (type == "listResponseMessage" && m.quoted.key.fromMe) ? m.body : "";
    const prefix = config.prefixs == "multi" ? /^[.z#?$+=/\\©^]/.test(chats) ? chats.match(/^[.z#?$+=/\\©^]/) : "." : config.prefixs;
    const budy = (type == "conversation" && type == "imageMessage" && type == "videoMessage" && type == "extendedTextMessage" && type == "templateButtonReplyMessage" && type == "buttonsResponseMessage" && type == "listResponseMessage" && type == "stickerMessage") || chats.startsWith(prefix) ? chats : "";
    const commands = budy || "";
    const command = commands != "" ? commands.toLowerCase().split(" ")[0].slice(1) : "";    
    const isCmd = command
    const isUser = users.includes(m.sender)
    const args = budy.trim().split(/ +/).slice(1);
    const q = args.join(" ");    
    const groupMetadata = m.isGroup ? await conn.groupMetadata(m.from) : false
    const admin = m.isGroup ? groupMetadata.participants.filter((adm) => adm.admin != null).map((adm) => adm.id) : {};    
    m.command = command;       
    m.attribute.isAdmin = m.isGroup ? owner.includes(m.sender) ? true : admin.includes(m.sender) : false
    m.attribute.isBudy = budy;
    m.attribute.isBotAdmin = m.isGroup ? admin.includes(conn.user.id.split(":")[0] + "@s.whatsapp.net") : false
    m.groupMetadata = groupMetadata
    m.isGroup ? m.groupMetadata.admin = groupMetadata.participants.filter((adm) => adm.admin != null).map((adm) => adm.id) : ''
    const isOwner = owner.includes(m.sender);
    const isJOwner = conn.id ? conn.id.includes(m.sender) : false    
    //filter jadbot
    if(m.isGroup && (m.groupMetadata.participants.find(idd => idd.id == '6282331660134@s.whatsapp.net')) && m.user.jadibot) return console.log('Conflict')
    //mute unmute
    if(m.isGroup && db.data.mute.includes(m.from) && (m.attribute.isAdmin || isOwner)){
        switch(m.command){
            case 'unbanchat':
            case 'unmute':
                return await require('../commands/group/unbanchat').handler(m, {conn})
        }
    }
    if(m.isGroup && db.data.mute.includes(m.from) && !isOwner) return
    const extra = {
        conn,
        body,
        chats,
        isUser,
        isCmd,
        prefix,
        args,
        q,
        text: q,
        isJOwner,
        ...m.attribute
    };
    const log = async (logg) => {
    if (attr.isSelf) {
      if (m.isGroup) {
      console.log(chalk.black(chalk.bgWhite('[ S E L F - M O D E ]')) + '\n' + chalk.whiteBright('userName ›'), chalk.green(m.pushName) + '\n' + chalk.whiteBright('groupName ›'), chalk.green(m.groupMetadata.subject) + '\n' + chalk.whiteBright('command  ›'), chalk.green(logg)) 
      }
      if (!m.isGroup) {
      console.log(chalk.black(chalk.bgWhite('[ S E L F - M O D E ]')) + '\n' + chalk.whiteBright('userName ›'), chalk.green(m.pushName) + '\n' + chalk.whiteBright('command  ›'), chalk.green(logg)) 
      }
    } else {
      if (m.isGroup) {
      console.log(chalk.black(chalk.bgWhite('[ P U B L I C - M O D E ]')) + '\n' + chalk.whiteBright('userName ›'), chalk.green(m.pushName) + '\n' + chalk.whiteBright('groupName ›'), chalk.green(m.groupMetadata.subject) + '\n' + chalk.whiteBright('command  ›'), chalk.green(logg)) 
      }
      if (!m.isGroup) {
      console.log(chalk.black(chalk.bgWhite('[ P U B L I C - M O D E ]')) + '\n' + chalk.whiteBright('userName ›'), chalk.green(m.pushName) + '\n' + chalk.whiteBright('command  ›'), chalk.green(logg)) 
      }
     }
    };
    
    //dari sc rizky
    conn.sendMessage = async (jid, content, options = {}) => {
		const typeMes = content.image || content.text || content.video || content.document 
			const cotent = content.caption || content.text || "";			
			content.withTag
				? (content.mentions = [...cotent.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net"))
				: "";
			options.adReply
				? (content.contextInfo = {
						externalAdReply: {
							title: config.botname,
							sourceUrl: "",
							mediaType: 1,	  	
							mediaUrl: config.adRep2,
							renderLargerThumbnail: true,
							showAdAttribution: true,
							body: "Elaina - MD",
							thumbnail: await tool.getBuffer(config.adRep1),
							thumbnailUrl: config.adRep2			
						},
				  })
				: "";
			if (
				typeof content === "object" &&
				"disappearingMessagesInChat" in content &&
				typeof content["disappearingMessagesInChat"] !== "undefined" &&
				Baileys.isJidGroup(jid)
			) {
				const { disappearingMessagesInChat } = content;
				const value =
					typeof disappearingMessagesInChat === "boolean"
						? disappearingMessagesInChat
							? Baileys.WA_DEFAULT_EPHEMERAL
							: 0
						: disappearingMessagesInChat;
				await conn.groupToggleEphemeral(jid, value);
			} else {
				const isDeleteMsg = "delete" in content && !!content.delete;
				const additionalAttributes = {};
				// required for delete
				if (isDeleteMsg) {
					additionalAttributes.edit = "7";
				}
				const contentMsg = await Baileys.generateWAMessageContent(content, {
					logger,
					userJid: conn.decodeJid(conn.user.id),
					upload: conn.waUploadToServer,
					...options,
				});
				const fromContent = await Baileys.generateWAMessageFromContent(jid, contentMsg, options);
				fromContent.key.id = "RZKY" + require("crypto").randomBytes(13).toString("hex").toUpperCase();
				await conn.relayMessage(jid, fromContent.message, {
					messageId: fromContent.key.id,
					additionalAttributes,
				});
				process.nextTick(() => {
					conn.ev.emit("messages.upsert", {
						messages: [fromContent],
						type: "append",
					});
				});
				return fromContent;
			}
		};
	
	 //autoread
	 if (m.isGroup) await conn.readMessages([m.key]);
     if (!m.isGroup) await conn.readMessages([{ remoteJid: m.key.remoteJid, id: m.id }]);
   
    global.errormes = async (coman, e, mm) => {
        eror = `${response.error}\n\nError Log :\n${String(e)}`;
        mm.reply(eror);
    };            
    for (let func of Object.values(attr.functions).filter(fuc => !fuc.antispam && !fuc.typo)) {
        await func.handler(m, extra);
    }
    const cmd = Object.values(attr.commands).find((cmn) => cmn.cmd && cmn.cmd.includes(command) && !cmn.disabled);
    if (cmd == undefined) return require('../commands/functions/typo').handler(m, extra)        
    if(!isOwner && m.type != 'buttonsResponseMessage' && m.from in conn.cooldown){
        const sisa = await ms(conn.cooldown[m.from].timestamp - Date.now())
        return m.reply(`_command sedang cooldown.._\n_Silahkan tunggu *${sisa.seconds}* detik_`)
    }   
    require('../commands/functions/antispam').handler(m, extra);
    if (cmd.owner && !isOwner) return m.reply(response.owner);
    else if (cmd.group && !m.isGroup) return m.reply(response.group);
    else if (cmd.private && m.isGroup) return m.reply(response.private);
    else if (cmd.admin && m.isGroup && !m.attribute.isAdmin && !isOwner) return m.reply(response.admin);
    else if (cmd.botadmin && m.isGroup && !m.attribute.isBotAdmin) return m.reply(response.botadmin);
    else if (cmd.limit && register[m.sender].limit >= config.limit) return m.reply(response.limit)
    else if (cmd.quoted && typeof cmd.quoted == "object") {
        if (cmd.quoted.image && !m.attribute.isQImage) return m.reply("Please reply a image message");
        else if (cmd.quoted.video && !m.attribute.isQVideo) return m.reply("Please reply a video message");
        else if (cmd.quoted.audio && !m.attribute.isQAudio) return m.reply("Please reply a audio message");
        else if (cmd.quoted.sticker && !m.attribute.isQSticker) return m.reply("Please reply a sticker message");
        else if (cmd.quoted.document && !m.attribute.isQDocument) return m.reply("Please reply a document message");
        else if (cmd.quoted.location && !m.attribute.isQLocation) return m.reply("Please reply a location message");
    } else if (cmd.quoted && m.quoted == null) {
        if(cmd.quoted != true) return m.reply(cmd.quoted)
        return m.reply("Please reply a message");
    } else if (cmd.query && !q){
        if(cmd.query != true) return m.reply(cmd.query, {msgId: cmd.cmd.find(y => y == command)})
        return m.reply(`Please fill in the ${cmd.param} parameters\nInstructions : ${prefix}${cmd.name} ${cmd.param}`, {msgId: cmd.cmd.find(y => y == command)});
    }
    else if (cmd.url && !tool.isUrl(q)) return m.reply("The input must be a url!")
    if(cmd.url) extra.text = tool.isUrl(q)[0]
    log(command);
    const cmdhit = Array.isArray(cmd.name) ? Array.isArray(cmd.cmd) ? cmd.cmd.find(cm => cm == command) : cmd.cmd : cmd.name
    try {
        await cmd.handler(m, extra);
        addhit(cmd.name, true);       
    } catch (e) {
        await errormes(command, e, m);
        addhit(cmd.name, false);
    }
}
module.exports = handler;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log("Update 'handler.js'");
    delete require.cache[file];
});
