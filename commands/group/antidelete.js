module.exports = {
    name: "antidelete",
    param: "<on/off>",
    cmd: ["antidelete"],
    category: "group",
    desc: `Turn on or off antidelete`,
    group: true,
    admin: true,
    async handler(m, {
        conn,
        args
    }) {
        await db.read();
        if (args[0] == "on") {
            if (!db.data.antidelete == '' && db.data.antidelete.includes(m.from)) return m.reply(`antidelete has been activated previously!`);
            db.data.antidelete.push(m.from);
            await db.write();
            m.reply(`antidelete has been activated in this group`);
        } else if (args[0] == "off") {
            if (db.data.antidelete == '') return m.reply("antidelete is not activated in this group");
            if (!db.data.antidelete.includes(m.from)) return m.reply(`antidelete is not activated in this group`);
            db.data.antidelete.splice(db.data.antidelete.indexOf(m.from), 1);
            await db.write();
            m.reply(`antidelete has been deactivated in this group`);
        } else m.reply("Select on/off");
    },
};
