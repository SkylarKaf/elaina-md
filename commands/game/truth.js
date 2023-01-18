const fs = require('fs');
const tods = fs.readFileSync('./lib/media/tods.jpg');

module.exports = {
  name: 'truth',
  cmd: ['truth'],
  category: 'game',
  desc: 'Truth or Dare!',
  async handler(m, {conn}){ 
    var truth = await bochil.truth()
    var txt = `*• Truth!*\n\n`
    txt += `${truth}` 
    var footer = `Patuhi aturan mainya dong, gaberani?`
    conn.sendButtonImageV2(m.from, tods, txt, footer, ['Truth', 'Dare'], ['.truth', '.dare'], {isLoc: true})		
    }
}
