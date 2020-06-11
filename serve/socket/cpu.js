const spawn = require('child_process').spawn;
const os = require('os')
const cpuStat = require('cpu-stat');
let platform = os.platform()


module.exports = (data, socket) => {
    let { id } = data

    let timer = setInterval(() => {
        if (platform === 'linux') {
            let free = spawn('free', ['-m']);
            free.stdout.on('data', function (data) {
                let mem = data.toString().split('\n')[1].match(/(?<=\s)[0-9]+/ig)
                cpuStat.usagePercent((err, percent, seconds) => {
                    socket.emit(id + '_cpu', { CpuPercent: percent, MenPercent: [mem[0], mem[1]] })
                });
            });
        } else {
            cpuStat.usagePercent((err, percent, seconds) => {
                socket.emit(id + '_cpu', { CpuPercent: percent, MenPercent: [os.totalmem() / 1000000, (os.totalmem() - os.freemem()) / 1000000] })
            });
        }
    }, 1000);

    socket.once(id + '_cpu_remove', function (data) {
        clearInterval(timer)
    })
}


