const spawn = require('child_process').spawn;
const os = require('os')
const cpuStat = require('cpu-stat');
let platform = os.platform()
const plat = { //简单内存占用
    linux() {
        return 100 * (process.memoryUsage().rss / os.totalmem());
    },
    win32() {
        return 100 * (os.totalmem() - os.freemem()) / os.totalmem();
    }
}

module.exports = (data, socket) => {
    let { id } = data

    let timer = setInterval(() => {
        if (platform === 'linux') {
            let free = spawn('systeminfo');
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

    let foo = function (data) {
        clearInterval(timer)
        console.log(socket.eventNames())
    }
    socket.on(id + '_cpu_remove', foo)
    // socket.removeListener(id + '_cpu_remove', foo)
}


