module.exports = (server) => {
  const io = require('socket.io')(server);
  const createCpuServer = require('./cpu')
  const createSSHServer = require('./ssh')
  const createNetServer = require('./net')


  io.on('connection', function(socket) {
    socket.on('createNewSSH', function(data) { //新建一个ssh连接
      createSSHServer(data, socket);
    })

    // 返回cpu使用信息
    socket.on('cpu', function(data) { //新建一个ssh连接
        createCpuServer(data, socket);
      })
      // 网络端口信息
    socket.on('nets', function(data) { //新建一个ssh连接
      createNetServer(data, socket);
    })

    socket.on("rmListener", function(data) {
      let { key } = data
      socket.removeAllListeners(key)
    });

    socket.on('disconnect', function() {
      console.log(`user disconnected ${socket.id}`);
    });
  })
}