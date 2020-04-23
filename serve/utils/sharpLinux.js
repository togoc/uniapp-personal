const path = require('path')
const fs = require('fs')
const express = require('express')
const app = express()



app.get('/download-sharp', (req, res) => {
    let readStream = fs.createReadStream(path.resolve(__dirname, 'sharp', 'libvips-8.9.1-linux-x64.tar.gz'))
    res.set('Content-Disposition', 'attachment; filename="' + 'libvips-8.9.1-linux-x64.tar.gz' + '"');
    readStream.pipe(res)
});



app.listen(8787, () => {
    console.log(`Server started on port`);
});

