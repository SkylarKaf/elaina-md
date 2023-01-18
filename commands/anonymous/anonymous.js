module.exports = {
    name: 'anonymous',
    cmd: ['anonymous'],
    category: 'anonymous',
    private: true,
    async handler(m, {conn}){
        let foundp = '*ANONYMOUS CHAT*\n\n'
        foundp += `${shp} .Start\n    > _Mulai bermain Anonymous_\n`
        foundp += `${shp} .Next\n    > _Mencari partner lain_\n`
        foundp += `${shp} .Stop\n    > _Keluar dari anonymous room_\n`
        foundp += `${shp} Kirim Kontak\n    > _Untuk mengirim kontak anda ke lawan main anda_`
        let footer = `Anonymous Chat Bot`
        const button = [
            {
                quickReplyButton: {
                    displayText: "Start",
                    id: ".start",
                },
            },
            {
                quickReplyButton: {
                    displayText: "Next",
                    id: ".next",
                },
            },
            {
                quickReplyButton: {
                    displayText: "Stop",
                    id: ".stop",
                },
            },
            {
                quickReplyButton: {
                    displayText: "Kirim Kontak",
                    id: `.sendkontak`,
                },
            },
        ];
        await conn.sendButton(m.from, foundp, footer, button)
    }
}