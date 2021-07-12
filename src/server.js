const app = require('express')()
let path = require('path')
const http = require('http').createServer(app)
const wsServer = require('socket.io')(http)

app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/index.html');
});
app.get('/socket.io', (req, res) =>{
  res.send('111');
});
//一共有多少人连接
let aSock = [];
console.log(wsServer.on.toString())
wsServer.on('connection',socket =>{
	console.log('a user connected');
	aSock.push(socket);
	socket.on('massge',str =>{
		console.log(str,333)
		//收到前端发送过来的消息
		aSock.forEach(s =>{
			if(s != socket){
				s.emit('massge',str)
			}
		})
	})
	socket.on('disconnect', () =>{
	    console.log('user disconnected');
	});
})


http.listen(3000, function(){
  console.log('listening on *:3000');
});




