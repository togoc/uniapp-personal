const spawn = require('child_process').spawn;
const os = require('os')


module.exports = (data, socket) => {
    let platform = os.platform()
    let { id } = data
    let backData = ""
    let netForm = []

    if (platform === 'win32') {
        let free = spawn('netstat', ['-o']);
        free.stdout.on('data', function (data) {
            backData += data
        })
        free.on('exit', function () {
            netForm = backData.toString().match(/TCP.*/ig).map(v => v.replace(/\s+/ig, " ").split(' '))
            socket.emit(id, netForm)
        })
    } else {
        let free = spawn('netstat', ['-ntpl']);
        free.stdout.on('data', function (data) {
            backData += data
        })
        free.on('exit', function () {
            netForm = backData.toString().match(/tcp.*/ig).map(v => {
                v = v.replace(/\s+/ig, " ").split(' ')
                v.splice(1, 2)
                return v
            })
            socket.emit(id, netForm)
        })
    }
}






