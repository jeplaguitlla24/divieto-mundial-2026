const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/assets/img/CARTAS PNG');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

(async () => {
  let totalIn = 0, totalOut = 0;
  for (const file of files) {
    const input = path.join(dir, file);
    const outputName = file.replace('.png', '.webp');
    const output = path.join(dir, outputName);
    const result = await sharp(input).webp({ lossless: true }).toFile(output);
    const inSize = fs.statSync(input).size;
    totalIn += inSize;
    totalOut += result.size;
    console.log(`${file}: ${Math.round(inSize/1024)}KB → ${Math.round(result.size/1024)}KB`);
  }
  console.log(`\nTotal: ${Math.round(totalIn/1024)}KB → ${Math.round(totalOut/1024)}KB (${Math.round((1-totalOut/totalIn)*100)}% menos)`);
})();
