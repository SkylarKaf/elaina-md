const {
       proto,
       jidDecode, 
       downloadContentFromMessage, 
       getContentType,
       getStream,
       generateForwardMessageContent,
       generateWAMessageFromContent 
} = require("baileys");
const path = require("path");
const fetch = require("node-fetch");
const Baileys = require("baileys");
const { logger } = Baileys.DEFAULT_CONNECTION_CONFIG;
const axios = require("axios");
const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment");
const { fromBuffer } = require("file-type");
const { isUrl } = require("./tools");
const phonenumber = require("awesome-phonenumber");
const { toOpus, toAudio, convert, convert2 } = require("./convert");
const { toPTT, toAudio: toAudio2 } = require("./converter");
const id3 = require('node-id3');
let parseMention = text => [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
const cmd = {
  1: [
    "-fs 1M",
    "-vcodec",
    "libwebp",
    "-vf",
    `scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1`,
  ],
  2: ["-fs 1M", "-vcodec", "libwebp"],
};
const downloadMedia = (message, pathFile) =>
  new Promise(async (resolve, reject) => {
    let type = Object.keys(message)[0];
    let mimeMap = {
      imageMessage: "image",
      videoMessage: "video",
      stickerMessage: "sticker",
      documentMessage: "document",
      audioMessage: "audio",
    };
    let mes = message;
    if (type == "templateMessage") {
      mes = message.templateMessage.hydratedFourRowTemplate;
      type = Object.keys(mes)[0];
    }
    if (type == "buttonsMessage") {
      mes = message.buttonsMessage;
      type = Object.keys(mes)[0];
    }
    try {
      if (pathFile) {
        const stream = await downloadContentFromMessage(mes[type], mimeMap[type]);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        await fs.promises.writeFile(pathFile, buffer);
        resolve(pathFile);
      } else {
        const stream = await downloadContentFromMessage(mes[type], mimeMap[type]);
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        resolve(buffer);
      }
    } catch (e) {
      reject(e);
    }
  });
async function serialize(msg, conn) {
	conn.decodeJid = (jid) => {
		if (/:\d+@/gi.test(jid)) {
			const decode = jidDecode(jid) || {};
			return ((decode.user && decode.server && decode.user + "@" + decode.server) || jid).trim();
		} else return jid;
	};
  /**
   * getBuffer hehe
   * @param {String|Buffer} path
   * @param {Boolean} returnFilename
   */
    
  const groupQuery = async (jid, type, content) => (conn.query({
    tag: 'iq',
    attrs: {
      type,
      xmlns: 'w:g2',
      to: jid,
    },
    content
  }));
  conn.generateGroupInviteMessage = async (jid, participant) => {
    const result = await groupQuery(
      jid,
      'set',
      [{
        tag: 'add',
        attrs: {},
        content: [{ tag: 'participant', attrs: { jid: participant } }]
      }]    
    )
  };
  conn.groupAdmin = async (jid) => {
      let participant = await (await conn.groupMetadata(jid)).participants
      let admin = []
      for (let i of participant)(i.admin === "admin" || i.admin === "superadmin") ? admin.push(i.id) : ''
      return admin
   }
  conn.copyNForward = async (jid, message, forceForward = false, options = {}) => {
    let vtype;
    if (options.readViewOnce) {
      message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : message.message || undefined;
      vtype = Object.keys(message.message.viewOnceMessage.message)[0];
      delete (message.message && message.message.ignore ? message.message.ignore : message.message || undefined);
      delete message.message.viewOnceMessage.message[vtype].viewOnce;
      message.message = {
        ...message.message.viewOnceMessage.message,
      };
    }
    let mtype = Object.keys(message.message)[0];
    let content = await generateForwardMessageContent(message, forceForward);
    let ctype = Object.keys(content)[0];
    let context = {};
    if (mtype != msg.type) context = message.message[mtype].contextInfo;
    content[ctype].contextInfo = {
      ...context,
      ...content[ctype].contextInfo,
      ...(options.contextInfo ?
        {
          ...options.contextInfo,
        } :
        {}),
    };
    const waMessage = await generateWAMessageFromContent(jid, content, options ? {
      ...content[ctype],
      ...options,
      ...(options.contextInfo ?
        {
          contextInfo: {
            ...content[ctype].contextInfo,
            ...options.contextInfo,
          },
        } :
        {}),
    } :
      {}
    );
    await conn.relayMessage(jid, waMessage.message, {
      messageId: waMessage.key.id,
    });
    return waMessage;
  };
  conn.getFile = async (PATH, returnAsFilename) => {
    let res, filename;
    let data = Buffer.isBuffer(PATH) ?
      PATH :
      /^data:.*?\/.*?;base64,/i.test(PATH) ?
        Buffer.from(PATH.split`,`[1], "base64") :
        /^https?:\/\//.test(PATH) ?
          await (res = await fetch(PATH)).buffer() :
          fs.existsSync(PATH) ?
            ((filename = PATH), fs.readFileSync(PATH)) :
            typeof PATH === "string" ?
              PATH :
              Buffer.alloc(0);
    if (!Buffer.isBuffer(data)) throw new TypeError("Result is not a buffer");
    let type = (await fromBuffer(data)) || {
      mime: "application/octet-stream",
      ext: ".bin",
    };
    if (data && returnAsFilename && !filename)
      (filename = path.join(
        __dirname,
        "../temp/" + new Date() * 1 + "." + type.ext
      )),
        await fs.promises.writeFile(filename, data);
    return {
      res,
      filename,
      ...type,
      data,
    };
  };
  conn.sendButton = async (jid, text, footer, buttons, opt) => {
    return await conn.sendMessage(
      jid, {
      text: text,
      footer: footer,
      templateButtons: buttons,
      withTag: opt ? (opt.withTag ? true : false) : false,
      adReply: opt ? (opt.adReply ? true : false) : false,
    }, {
      ...opt
    }
    )
  }
  conn.sendButtonImage = async (jid, image, caption, footer, buttons, opt) => {
    if (opt && opt.isLoc) {
      return await conn.sendMessage(
        jid, {
        location: {
          degreesLatitude: 0,
          degreesLongitude: 0,
          jpegThumbnail: await tool.resize(image, 200, 200)
        },
        caption: caption,
        footer: footer,
        templateButtons: buttons,
        withTag: opt ? (opt.withTag ? true : false) : false,
        adReply: opt ? (opt.adReply ? true : false) : false,
      }, {
        ...opt
      }
      );
    }
    return await conn.sendMessage(
      jid, {
      image: image,
      caption: caption,
      footer: footer,
      templateButtons: buttons,
      withTag: opt ? (opt.withTag ? true : false) : false,
      adReply: opt ? (opt.adReply ? true : false) : false,
    }, {
      ...opt
    }
    );
  };
  conn.sendButtonImageV2 = async (
    from,
    img,
    teks,
    footer,
    display,
    buttonid,
    opt
  ) => {
    datai = [];
    for (let i = 0; i < display.length; i++) {
      datai.push({
        buttonId: buttonid[i],
        buttonText: {
          displayText: display[i]
        },
        type: 1,
      });
    }
    if (opt && opt.isLoc) {
      bts = {
        location: {
          degreesLatidude: 0,
          degreesLongitude: 0,
          jpegThumbnail: await tool.resize(img, 200, 200)
        },
        caption: teks,
        footer: footer,
        buttons: datai,
        headerType: "LOCATION",
      };
    } else {
      bts = {
        image: img,
        caption: teks,
        footer: footer,
        buttons: datai,
        headerType: "IMAGE",
      };
    }
    return await conn.sendMessage(from, bts, {
      ...opt
    });
  };
  conn.sendButtonVideoV2 = async (
    from,
    vid,
    teks,
    footer,
    display,
    buttonid,
    opt
  ) => {
    datai = [];
    for (let i = 0; i < display.length; i++) {
      datai.push({
        buttonId: buttonid[i],
        buttonText: {
          displayText: display[i]
        },
        type: 1,
      });
    }
    bts = {
      video: vid,
      caption: teks,
      footer: footer,
      buttons: datai,
      headerType: "VIDEO",
    };
    return await conn.sendMessage(from, bts, {
      ...opt
    });
  };
  conn.sendButtonVideo = async (jid, video, caption, footer, buttons, opt) => {
    return await conn.sendMessage(
      jid, {
      video: video,
      gifPlayback: opt ? (opt.gifPlayback ? true : false) : false,
      caption: caption,
      footer: footer,
      templateButtons: buttons,
      withTag: opt ? (opt.withTag ? true : false) : false,
      adReply: opt ? (opt.adReply ? true : false) : false,
    }, {
      ...opt
    }
    );
  };
  conn.getName = (jid, withoutContact = false) => {
		id = conn.decodeJid(jid);
		withoutContact = conn.withoutContact || withoutContact;
		let v;
		if (id.endsWith("@g.us"))
			return new Promise(async (resolve) => {
				v = store.contacts[id] || {};
				if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {};
				resolve(
					v.name ||
						v.subject ||
						require("awesome-phonenumber")("+" + id.replace("@s.whatsapp.net", "")).getNumber(
							"international"
						)
				);
			});
		else
			v =
				id === "0@s.whatsapp.net"
					? {
							id,
							name: "WhatsApp",
					  }
					: id === conn.decodeJid(conn.user.id)
					? conn.user
					: store.contacts[id] || {};
		return (
			(withoutContact ? "" : v.name) ||
			v.subject ||
			v.verifiedName ||
			require("awesome-phonenumber")("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international")
	   );
   };
	
  conn.getBuffer = async (url, options) => {
    try {
      options ? options : {};
      const res = await require("axios")({
        method: "get",
        url,
        headers: {
          DNT: 1,
          "Upgrade-Insecure-Request": 1,
        },
        ...options,
        responseType: "arraybuffer",
      });
      return res.data;
    } catch (e) {
      console.log(`Error : ${e}`);
    }
  };
  conn.sendContact = async (jid, contact, quoted = false, opts = {}) => {
    let list = [];
    for (let i of contact) {
      num = typeof i == "number" ? i + "@s.whatsapp.net" : i;
      num2 = typeof i == "number" ? i : i.split("@")[0];
      list.push({
        displayName: await conn.getName(num),
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${await conn.getName(
          num
        )}\nFN:${await conn.getName(
          num
        )}\nitem1.TEL;waid=${num2}:${num2}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${config.email
          }\nitem2.X-ABLabel:Email\nitem3.URL:${config.instagram
          }\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
      });
    }
    return conn.sendMessage(
      jid, {
      contacts: {
        displayName: `${list.length} Kontak`,
        contacts: list,
      },
      ...opts,
    }, {
      quoted
    }
    );
  };
  conn.sendSticker = async (jid, url, quoted, option = {}) => {
    let ext;
    let buf = url;
    if (!Buffer.isBuffer(url)) buf = await conn.getBuffer(url);
    if (!Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    if (Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    url =
      ext == "mp4" ?
        await convert2(
          buf,
          ext.ext,
          "webp",
          cmd[parseInt(option.cmdType ? option.cmdType : 1)]
        ) :
        await convert(
          buf,
          ext.ext,
          "webp",
          cmd[parseInt(option.cmdType ? option.cmdType : 1)]
        );
    let sticker = {
      url
    };
    return conn.sendMessage(jid, {
      sticker: url,
      ...option
    }, {
      quoted
    });
  };

  conn.logger = {
    ...conn.logger,
    info(...args) {
      console.log(
        chalk.bold.rgb(
          57,
          183,
          16
        )(
          `INFO [${chalk.rgb(
            255,
            255,
            255
          )(moment(Date.now()).format(" dddd, DD MMMM YYYY HH:mm:ss "))}]`
        ),
        chalk.cyan(...args)
      );
    },
    error(...args) {
      console.log(
        chalk.bold.rgb(
          247,
          38,
          33
        )(
          `ERROR [${chalk.rgb(
            255,
            255,
            255
          )(moment(Date.now()).format(" dddd, DD MMMM YYYY HH:mm:ss "))}]:`
        ),
        chalk.rgb(255, 38, 0)(...args)
      );
    },
    warn(...args) {
      console.log(
        chalk.bold.rgb(
          239,
          225,
          3
        )(
          `WARNING [${chalk.rgb(
            255,
            255,
            255
          )(moment(Date.now()).format(" dddd, DD MMMM YYYY HH:mm:ss "))}]:`
        ),
        chalk.keyword("orange")(...args)
      );
    },
  };
  conn.sendReact = async (jid, emoticon, keys = {}) => {
      let reactionMessage = {
         react: {
            text: emoticon,
            key: keys
         }
      }
      return await conn.sendMessage(jid, reactionMessage)
  };   
  conn.sendGroupV4Invite = async (jid, participant, inviteCode, inviteExpiration, groupName = "unknown subject", jpegThumbnail, caption = "Invitation to join my WhatsApp group", options = {}) => {
    let msg = Baileys.proto.Message.fromObject({
      groupInviteMessage: Baileys.proto.GroupInviteMessage.fromObject({
        inviteCode,
        inviteExpiration: inviteExpiration ?
          parseInt(inviteExpiration) :
          +new Date(new Date() + 3 * 86400000),
        groupJid: jid,
        groupName: groupName ? groupName : (await conn.groupMetadata(jid)).subject,
        jpegThumbnail,
        caption,
      }),
    });
    const ms = Baileys.generateWAMessageFromContent(participant, msg, options);
    await conn.relayMessage(participant, ms.message, {
      messageId: ms.key.id,
    });
  }; 
  conn.sendImage = async (jid, url, quoted, option = {}) => {
    let ext;
    let buf = url;
    if (!Buffer.isBuffer(url)) buf = await conn.getBuffer(url);
    if (!Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    if (Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    let type = /jpg|png|webp/i.test(ext.ext);
    if (!type) return ReferenceError(`Format file invalid`);
    url = buf;
    return conn.sendMessage(jid, {
      image: url,
      ...option
    }, {
      quoted
    });
  };  
  conn.sendVideo = async (jid, url, quoted, option = {}) => {
    let ext;
    let buf = url;
    if (!Buffer.isBuffer(url)) buf = await conn.getBuffer(url);
    if (!Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    if (Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    let type = /gif|webm|mp4/i.test(ext.ext);
    if (!type) return ReferenceError(`Format file invalid`);
    url = ext.ext !== "mp4" ? await convert(buf, ext.ext, "mp4", cmd[parseInt(option.cmdType ? option.cmdType : 1)]) : buf;
    return conn.sendMessage(jid, { video: url, ...option, mimetype: ext.mimetype }, { quoted });
  };
  conn.sendAudio = async (jid, url, quoted, ptt = false, option = {}) => {
    let ext;
    let buf = url;
    if (!Buffer.isBuffer(url)) buf = await conn.getBuffer(url);
    if (!Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    if (Buffer.isBuffer(url)) ext = await fromBuffer(buf);
    let type = /mp3|wav|opus|m4a/i.test(ext.ext);
    if (!type) return ReferenceError(`Format file invalid`);
    url = ext.ext !== "mp3" ? await convert(buf, ext.ext, "mp3", cmd[parseInt(option.cmdType ? option.cmdType : 1)]) : buf;
    return conn.sendFile(msg.from, url, Date.now() / 1000 + ext.ext, "", quoted, ptt);
  };
  conn.sendFileFromUrl = async (from, url, opt, opt1) => {
    let mime = "";
    let res = await axios.head(url);
    mime = res.headers["content-type"];
    let type = mime.split("/");
    if (mime.includes("image")) type = "image";
    else if (mime.includes("video")) type = "video";
    else if (mime.split("/")[0] === "audio") type = "audio";
    else type = "document";
    //else if(mime === "application/pdf") type = 'document'
    return await conn.sendMessage(
      from, {
      [type]: await tool.getBuffer(url),
      ...opt
    }, {
      ...opt1
    }
    );
  };
  conn.sendFile = async (jid, path, filename = "", caption = "", quoted, ptt = false, options = {}) => {
    let type = await conn.getFile(path, true);
    let { res, data: file, filename: pathFile } = type;
    if ((res && res.status !== 200) || file.length <= 65536) {
      try {
        throw { json: JSON.parse(file.toString()) };
		} catch (e) {
        if (e.json) throw e.json;
      }
    }
    let opt = { filename };
    if (quoted) opt.quoted = quoted;
    if (!type) if (options.asDocument) options.asDocument = true;
    let mtype = "",
    mimetype = type.mime;
    let naem = (a) => "./temp/" + Date.now() + "." + a;
    if (/webp/.test(type.mime)) mtype = "sticker";
    else if (/image/.test(type.mime)) mtype = "image";
    else if (/video/.test(type.mime)) mtype = "video";
    else if (/audio/.test(type.mime))
      (ss = await (ptt ? toPTT : toAudio2)(file, type.ext)),
        (skk = await require("file-type").fromBuffer(ss.data)),
        (ty = naem(skk.ext)),
        require("fs").writeFileSync(ty, ss.data),
        (pathFile = ty),
        (mtype = "audio"),
        (mimetype = "audio/mpeg");
    else mtype = "document";
    conn.sendMessage(jid, { ...options, caption, ptt, fileName: filename, [mtype]: { url: pathFile }, mimetype, }, { ...opt, ...options, })
      .then(() => {
        fs.unlinkSync(pathFile);
        conn.logger.info("delete file " + pathFile);
      });
  };
  conn.reply = async (jid, text, quoted, options) => {
      return conn.sendMessage(jid, {
         text: text,
         mentions: parseMention(text),
         ...options
      }, {
         quoted
      })
  };
  if (msg.key) {
    msg.id = msg.key.id;
    msg.isSelf = msg.key.fromMe;
    msg.from = msg.key.remoteJid;
    msg.isGroup = msg.from.endsWith("@g.us");
    msg.sender = msg.isGroup ? conn.decodeJid(msg.key.participant) : msg.isSelf ? conn.decodeJid(conn.user.id) : msg.from;
  }
  if (msg.message) {
    msg.type = getContentType(msg.message);
    if (msg.type === "ephemeralMessage") {
      msg.message = msg.message[msg.type].message;
      const tipe = Object.keys(msg.message)[0];
      msg.type = tipe;
      if (tipe === "viewOnceMessage") {
        msg.message = msg.message[msg.type].message;
        msg.type = getContentType(msg.message);
      }
    }
    if (msg.type === "viewOnceMessage") {
      msg.message = msg.message[msg.type].message;
      msg.type = getContentType(msg.message);
    }
    try {
      msg.mentions = msg.message[msg.type].contextInfo ? msg.message[msg.type].contextInfo.mentionedJid || [] : [];
    } catch {
      msg.mentions = [];
    }
    try {
      const quoted = msg.message[msg.type].contextInfo;
      if (quoted.quotedMessage["ephemeralMessage"]) {
        const tipe = Object.keys(quoted.quotedMessage.ephemeralMessage.message)[0];
        if (tipe === "viewOnceMessage") {
          msg.quoted = {
            type: "view_once",
            stanzaId: quoted.stanzaId,
            sender: conn.decodeJid(quoted.participant),
            message: quoted.quotedMessage.ephemeralMessage.message.viewOnceMessage.message,
          };
        } else {
          msg.quoted = {
            type: "ephemeral",
            stanzaId: quoted.stanzaId,
            sender: conn.decodeJid(quoted.participant),
            message: quoted.quotedMessage.ephemeralMessage.message,
          };
        }
      } else if (quoted.quotedMessage["viewOnceMessage"]) {
        msg.quoted = {
          type: "view_once",
          stanzaId: quoted.stanzaId,
          sender: conn.decodeJid(quoted.participant),
          message: quoted.quotedMessage.viewOnceMessage.message,
        };
      } else {
        msg.quoted = {
          type: "normal",
          stanzaId: quoted.stanzaId,
          sender: conn.decodeJid(quoted.participant),
          message: quoted.quotedMessage,
        };
      }
      msg.quoted.isSelf = msg.quoted.sender === conn.decodeJid(conn.user.id);
      msg.quoted.mtype = Object.keys(msg.quoted.message).filter((v) => v.includes("Message") || v.includes("conversation"))[0];
      msg.quoted.text =
        msg.quoted.message[msg.quoted.mtype].text ||
        msg.quoted.message[msg.quoted.mtype].description ||
        msg.quoted.message[msg.quoted.mtype].caption ||
        (msg.quoted.mtype == "templateButtonReplyMessage" &&
          msg.quoted.message[msg.quoted.mtype].selectedDisplayText) ||
        msg.quoted.message[msg.quoted.mtype] ||
        "";
      msg.quoted.key = {
        id: msg.quoted.stanzaId,
        fromMe: msg.quoted.isSelf,
        remoteJid: msg.from,
      };
      msg.quoted.isBot = (msg.quoted.key.id.startsWith("BAE5") && msg.quoted.key.id.length == 16) || (msg.quoted.key.id.startsWith("3EB0") && msg.quoted.key.id.length == 20) ?
        true :
        false;
      msg.quoted.delete = () => conn.sendMessage(msg.from, { delete: msg.quoted.key });
      msg.quoted.download = (pathFile) => downloadMedia(msg.quoted.message, pathFile);
      msg.quoted.copyNForward = async (jid = msg.from, forceForward = false, opt) => conn.copyNForward(jid, await msg.getQuotedObj(), forceForward, opt);
      msg.quoted.react = async (react) => {
        return await conn.sendMessage(msg.from, {
          react: {
            text: react,
            key: msg.quoted.key
          },
        });
      };
    } catch (e) {
      msg.quoted = null;
    }
    try {
      msg.body =
        msg.message.conversation ||
        msg.message[msg.type].text ||
        msg.message[msg.type].caption ||
        (msg.type === "listResponseMessage" &&
          msg.message[msg.type].singleSelectReply.selectedRowId) ||
        (msg.type === "buttonsResponseMessage" &&
          msg.message[msg.type].selectedButtonId &&
          msg.message[msg.type].selectedButtonId) ||
        (msg.type === "templateButtonReplyMessage" &&
          msg.message[msg.type].selectedId) ||
        "";
    } catch {
      msg.body = "";
    }
    const contentQ = msg.quoted ? JSON.stringify(msg.quoted) : []
    msg.attribute = {
      isOwner: owner.includes(msg.sender),
      isBot: (msg.key.id.startsWith("BAE5") && msg.key.id.length == 16) || (msg.key.id.startsWith("3EB0") && msg.key.id.length == 20) ? true : false,
      isVideo: msg.type === "videoMessage",
      isImage: msg.type === "imageMessage",
      isLocation: msg.type === "locationMessage",
      isMedia: msg.type === "imageMessage" || msg.type === "videoMessage",
      isQAudio: msg.type === "extendedTextMessage" && contentQ.includes("audioMessage"),
      isQVideo: msg.type === "extendedTextMessage" && contentQ.includes("videoMessage"),
      isQImage: msg.type === "extendedTextMessage" && contentQ.includes("imageMessage"),
      isQDocument: msg.type === "extendedTextMessage" && contentQ.includes("documentMessage"),
      isQSticker: msg.type === "extendedTextMessage" && contentQ.includes("stickerMessage"),
      isQLocation: msg.type === "extendedTextMessage" && contentQ.includes("locationMessage")
    }
    msg.user = {
      id: msg.sender,
      device: msg.attribute.isBot ? 'web' : 'smartphone',
      jadibot: conn.id ? true : false
    }
    msg.getQuotedObj = msg.getQuotedMessage = async () => {
      if (!msg.quoted.stanzaId) return false;
      let q = await store.loadMessage(msg.from, msg.quoted.stanzaId, conn);
      return serialize(q, conn);
    };
    msg.react = async (react) => {
      return await conn.sendMessage(msg.from, {
        react: {
          text: react,
          key: msg.key
        },
      });
    };
    msg.copyNForward = (jid = msg.from, forceForward = false, opt) => conn.copyNForward(jid, msg, forceForward, opt);
    msg.reply = async (text, opt = {adReply:true}) => {
      return await conn.sendMessage(msg.from, {
        text: require("util").format(text),
        mentions: opt ?
          opt.withTag ?
            [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
              (v) => v[1] + "@s.whatsapp.net"
            ) :
            [] :
          [],
        ...opt,
      }, {
        ...opt,
        quoted: msg
      }
      );
    };
    msg.download = (pathFile) => downloadMedia(msg.message, pathFile);
  }
  return msg;
}

module.exports = {
  serialize,
  downloadMedia
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update 'serialize.js'");
  delete require.cache[file];
});
