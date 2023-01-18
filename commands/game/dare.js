const fs = require('fs');
const tods = fs.readFileSync('./lib/media/tods.jpg');

module.exports = {
  name: 'dare',
  cmd: ['dare'],
  category: 'game',
  desc: 'Truth or Dare!',
  async handler(m, {conn}){ 
    var dare = await bochil.dare()
    var txt = `*• Dare!*\n\n`
    txt += `${dare}` 
    var footer = `Patuhi aturan mainya dong, gaberani?`
    conn.sendButtonImageV2(m.from, tods, txt, footer, ['Truth', 'Dare'], ['.truth', '.dare'], {isLoc: true})		
    }
}
