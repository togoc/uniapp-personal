const path = require('path')
const fs = require('fs')

const serve = require('http').createServer((req, res) => {
    if (req.url === '/download-sharp/libvips-8.9.1-linux-x64.tar.gz') {
        let readStream = fs.createReadStream(path.resolve(__dirname, 'sharp', 'libvips-8.9.1-linux-x64.tar.gz'))
        res.writeHead(200, { 'Content-Disposition': 'attachment; filename="' + 'libvips-8.9.1-linux-x64.tar.gz' + '"' });
        readStream.pipe(res)
    } else {
        res.end('npm config set sharp_dist_base_url "http://localhost:8787/download-sharp/');
    }
})

serve.listen(8787, () => {
    console.log(`npm config set sharp_dist_base_url "http://localhost:8787/download-sharp/`)
})