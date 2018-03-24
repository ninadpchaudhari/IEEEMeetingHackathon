var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var old_sent = 0;
http.listen(3000, function(){
  console.log('listening on *:3000');
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  setInterval(function(){
    var fs=require('fs');
    filename="../samples/change.txt";
    var data=fs.readFileSync(filename);
    var res=data.toString().split('\n').length;
    console.log(res-1);
    console.log(old_sent);
    console.log("\n");
    if((res-1) > old_sent){
      for(i = 0 ; i < res-old_sent; i ++){
        io.emit('clap',"something");
        console.log("sent");
        }
        old_sent = res-1;
    }

  },1000);




});
