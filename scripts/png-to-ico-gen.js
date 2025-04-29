const pngToIco = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const pngPath = path.join(__dirname, '../public/favicon-32.png');
const icoPath = path.join(__dirname, '../public/favicon.ico');

pngToIco([pngPath])
  .then(buf => {
    fs.writeFileSync(icoPath, buf);
    console.log('favicon.ico generated from favicon-32.png');
  })
  .catch(console.error);
