module.exports = {
    name: "antilink",
    param: "<on/off>",
    cmd: ["antilink"],
    category: "group",
    desc: `Turn on or off antilink`,
    group: true,
    admin: true,
    botAdmin: true,
    async handler(m, {
        conn,
        args
    }) {
        await db.read();
        if (args[0] == "on") {
            if (!db.data.antilink == '' && db.data.antilink.includes(m.from)) return m.reply(`antilink has been activated previously!`);
            db.data.antilink.push(m.from);
            await db.write();
            m.reply(`antilink has been activated in this group`);
        } else if (args[0] == "off") {
            if (db.data.antilink == '') return m.reply("antilink is not activated in this group");
            if (!db.data.antilink.includes(m.from)) return m.reply(`antilink is not activated in this group`);
            db.data.antilink.splice(db.data.antilink.indexOf(m.from), 1);
            await db.write();
            m.reply(`antilink has been deactivated in this group`);
        } else m.reply("Select on/off");
    },
};
