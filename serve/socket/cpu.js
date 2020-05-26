const os = require('os')
const cpuStat = require('cpu-stat');

module.exports = (data, socket) => {
    let { id } = data
    let timer = setInterval(() => {
        let mem = 100 * (os.totalmem() - os.freemem()) / os.totalmem();
        cpuStat.usagePercent((err, percent, seconds) => {
            socket.emit(id + '_cpu', { CpuPercent: percent, MenPercent: mem })
            // cpuStat = null
            // mem = null
            // clearInterval(timer)
        });
    }, 1000);
    let foo = function (data) {
        clearInterval(timer)
        console.log(socket.eventNames())
    }
    socket.on(id + '_cpu_remove', foo)
    // socket.removeListener(id + '_cpu_remove', foo)

}


