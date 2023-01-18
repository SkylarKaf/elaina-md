const {
    sticker
} = require("../../lib/convert");
const {
    modStick,
    createExif
} = require("../../lib/exif2");
const fs = require("fs");
module.exports = {
    name: "sticker",
    param: '<reply/send image>',
    cmd: ['sticker', 's', 'stiker'],
    category: "converter",
    desc: "Create a sticker from image or video",
    async handler(m, {conn,text,isQSticker,isQImage,isMedia,isQVideo}){
        const { quoted, from, type } = m;
        const q = text.split("|");
        const packInfo = {
            packname: text ? q[0] ? q[0] : '' : config.packInfo.packname,
            author: text ? q[1] ? q[1] : '' : config.packInfo.author,
        };
        let buffer, stickerBuff;
        try {
            if (isQSticker) {
                const buffer = await quoted.download("./temp/" + await tool.getRandom('.webp'));
                await createExif(text ? q[0] ? q[0] : '' : config.packInfo.packname, text ? q[1] ? q[1] : '' : config.packInfo.author);
                await modStick(buffer, conn, m, m.from);
            } else if ((isMedia && !m.message.videoMessage) || isQImage) {
                const buffer = isQImage ? await quoted.download() : await m.download();
                const stickerBuff = await sticker(buffer, {
                    isImage: true,
                    withPackInfo: true,
                    packInfo,
                    cmdType: "1"
                });
                await conn.sendMessage(from, {
                    sticker: stickerBuff
                }, {
                    quoted: m
                });
            } else if ((isMedia && m.message.videoMessage) || (isQVideo && quoted.message.videoMessage)) {
                if ((isMedia && m.message.videoMessage.seconds > 15 || isQVideo && quoted.message.videoMessage.seconds > 15)) return m.reply('maksimal durasi 15 detik!!')
                const buffer = isQVideo ? await quoted.download() : await m.download();
                const stickerBuff = await sticker(buffer, {
                    isVideo: true,
                    withPackInfo: true,
                    packInfo,
                    cmdType: "1"
                });
                await conn.sendMessage(from, {
                    sticker: stickerBuff
                }, {
                    quoted: m
                });
            } else return m.reply('please reply or send a picture or video with the caption .' + m.command)
        } catch (e) {
        console.log(e)
            await m.reply("Error while creating sticker");
        }
    },
};
