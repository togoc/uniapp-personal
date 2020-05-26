const SSHClient = require('ssh2').Client;
const utf8 = require('utf8');
module.exports = (data, socket) => {
    const ssh = new SSHClient();
    let { id, ip, username, password
    } = data;
    console.log(data)
    ssh.on('ready', function () {
        socket.emit(id + '_ssh', '\r\n***' + ip + ' SSH CONNECTION ESTABLISHED ***\r\n');
        ssh.shell(function (err, stream) {
            if (err) {
                return socket.emit(id + '_ssh', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
            }
            socket.on(id + '_ssh', function (data) {
                stream.write(data);
                console.log(data)
            });
            stream.on('data', function (d) {
                socket.emit(id + '_ssh', utf8.decode(d.toString('binary')));
            }).on('close', function () {
                ssh.end();
            });
        })
    }).on('close', function () {
        socket.emit(id + '_ssh', '\r\n*** SSH CONNECTION CLOSED ***\r\n');
    }).on('error', function (err) {
        console.log(err);
        socket.emit(id + '_ssh', '\r\n*** SSH CONNECTION ERROR: ' + err.message + ' ***\r\n');
    }).connect({
        host: ip,
        port: 22,
        username,
        password
    });
}
