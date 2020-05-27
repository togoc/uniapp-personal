const os = require('os')
const cpuStat = require('cpu-stat');
let platform = os.platform()
const plat = {
    linux() {
        return
    },
    win32() {
        return 100 * (os.totalmem() - os.freemem()) / os.totalmem();
    }
}
module.exports = (data, socket) => {
    let { id } = data

    let timer = setInterval(() => {
        let mem = 100 * (process.memoryUsage().rss / os.totalmem());
        cpuStat.usagePercent((err, percent, seconds) => {
            socket.emit(id + '_cpu', { CpuPercent: percent, MenPercent: mem })
        });
    }, 1000);
    let foo = function (data) {
        clearInterval(timer)
        console.log(socket.eventNames())
    }
    socket.on(id + '_cpu_remove', foo)
    // socket.removeListener(id + '_cpu_remove', foo)
}


