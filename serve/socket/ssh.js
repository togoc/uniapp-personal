/**
 * 备注: socket.emit跟socket.on 其实不需要一定是唯一的, 因为socket本身就是唯一的, 只有io.on跟io.emit是全部用户(或者通过room发送).
 */
const SSHClient = require('ssh2').Client;
const utf8 = require('utf8');
module.exports = (data, socket) => {
  const ssh = new SSHClient();
  let {
    id,
    ip,
    username,
    password
  } = data;
  ssh.on('ready', function() {
    socket.emit(id + '_ssh', '\r\n***' + ip + ' SSH 尝试连接 ***\r\n');
    ssh.shell(function(err, stream) {
      if (err) {
        // socket.emit(id + '_ssh', id + '_ssh_logout');
        return socket.emit(id + '_ssh', '\r\n*** SSH SHELL 错误: ' + err.message + ' ***\r\n');
      }
      socket.on(id + '_ssh', function(data) {
        stream.write(data);
      });

      stream.on('data', function(d) {
        socket.emit(id + '_ssh', utf8.decode(d.toString('binary')));
      }).on('close', function() {
        ssh.end();
      });
    })
  }).on('close', function() {
    socket.emit(id + '_ssh', '\r\n*** SSH 已经断开连接 ***\r\n');
    socket.emit(id + '_ssh', id + '_ssh_logout');
    socket.removeAllListeners(id + '_ssh')
  }).on('error', function(err) {
    socket.emit(id + '_ssh', '\r\n*** SSH 连接错误: ' + err.message + ' ***\r\n');
  }).connect({
    host: ip,
    port: 22,
    username,
    password,
    readyTimeout: 15000
  });
}