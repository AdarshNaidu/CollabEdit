const listener = require('../index')

const socket = require('socket.io')
const io = socket(listener);
lists = {}

io.on('connection', (socket) => {
    console.log(`made socket connection with ${socket.id}`)

    socket.on('join', room => {
        socket.join(room)
        console.log(`${socket.id} joined room ${room}`)
        if(!(room in lists)){
            lists[room] = {
              count: 1,
              list : []
            }
        }else{
          lists[room].count++
        }
        socket.emit("initiation", lists[room].list);
    })

    socket.on("insertFirst", function(data) {
        lists[data.room].list.push(data.character);
        socket.to(data.room).emit("insertFirst", data.character);
      });

      socket.on("insert", function(data) {
        let index;
        for (let i = 0; i < lists[data.room].list.length; i++) {
          // if(isEqual(list[i], data.position)) index = i;
          if(!data.position){
            index = -1
          }
          else if (
            lists[data.room].list[i].siteId == data.position.siteId &&
            lists[data.room].list[i].count == data.position.count &&
            lists[data.room].list[i].value == data.position.value
          )
            index = i;
        }
        lists[data.room].list.splice(index + 1, 0, data.character);
        socket.to(data.room).emit("insert", data);
      });

      socket.on("delete", function(data) {
        let index;
        for (let i = 0; i < lists[data.room].list.length; i++) {
          // if(isEqual(list[i], character)) index = i;
          if (
            lists[data.room].list[i].siteId == data.character.siteId &&
            lists[data.room].list[i].count == data.character.count &&
            lists[data.room].list[i].value == data.character.value
          )
            index = i;
        }
        if (index != null) lists[data.room].list.splice(index, 1);
        socket.to(data.room).emit("delete", data.character);
      });

      socket.on("refresh", function(room) {
        lists[room] = [];
        io.to(room).emit("refresh");
      });

    socket.on('message', ({room, message}) => {
        console.log(`Received message: ${message} from ${socket.id}`)
        socket.to(room).emit('message', message)
    })

    socket.on('disconnect', () => {
      room = socket.handshake.headers.referer.split('/')[4]
      if(lists[room].count == 1) delete lists[room]
      else lists[room].count--
    })
})