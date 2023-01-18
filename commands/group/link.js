module.exports = {
	name: "linkgroup",
	cmd: ["linkgroup", "link", "linkgc"],
	category: "group",
	desc: "Get link group",
	group: true,
	botAdmin: true,
	async handler(m, { conn }) {
		const getinv = await conn.groupInviteCode(m.from);				
		const button = [					
					{
					  urlButton: {
					  displayText: "Copy Link Group",
					  url: `https://www.whatsapp.com/otp/copy/https://chat.whatsapp.com/${getinv}`,
					},
				 },					
				];			  
		 conn.sendButton(m.from, `*LINK GROUP*`, config.botname, button)
	},
};
