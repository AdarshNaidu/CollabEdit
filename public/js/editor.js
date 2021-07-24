let url = 'http://localhost:3000'
var socket = io(url);
// let userId = document.getElementById('user')
let room = document.querySelector('#id').innerText
document.querySelector('#link').innerText = document.location.href
// if(userId){
//   room = document.querySelector('h2').innerText + userId.innerText
//   document.querySelector('#link').innerText = room
// }
let crdt;
let count = 0;
let index;
let caret;
socket.on("connect", () => {
  console.log("connected as " + socket.id);
  socket.emit('join', room)
  crdt = {
    siteId: socket.id,
    list: []
  };

  editor.addEventListener('keydown', (event) => {
    if(event.keyCode == 13){
      index = editor.selectionStart;
      console.log(index);
      count++;
      let character = {
        siteId: crdt.siteId,
        value: "\n",
        count: count
      };
      if (crdt.list.length == 0) {
        crdt.list.push(character);

        socket.emit("insertFirst", { room, character});
      } else {
        if(editor.selectionStart == crdt.length) crdt.list.splice(index, 0, character);
        else crdt.list.splice(index, 0, character);
        // console.log(crdt.list);
        // console.log(index);
        console.log({
          position: crdt.list[index - 1],
          character: crdt.list[index]
        });
        console.log(crdt.list)
        socket.emit("insert", {
          room,
          position: crdt.list[index - 1],
          character: crdt.list[index]
        });
      }

      console.log(generateString(crdt.list));
    }
  })

  editor.addEventListener("input", (event) => {
    // console.log(editor.selectionStart);
    // console.log(event)
    if (event.inputType == "insertText" && event.data != null) {
      index = editor.selectionStart;
      console.log(index);
      count++;
      let character = {
        siteId: crdt.siteId,
        value: event.data,
        count: count
      };
      if (crdt.list.length == 0) {
        crdt.list.push(character);

        socket.emit("insertFirst", {room, character});
      } else {
        if(editor.selectionStart == crdt.length) crdt.list.splice(index, 0, character);
        else crdt.list.splice(index - 1, 0, character);
        // console.log(crdt.list);
        // console.log(index);
        console.log({
          position: crdt.list[index - 2],
          character: crdt.list[index-1]
        });

        socket.emit("insert", {
          room,
          position: crdt.list[index - 2],
          character: crdt.list[index-1]
        });
      }

      console.log(generateString(crdt.list));
    } else if (event.inputType == "deleteContentBackward") {
      index = editor.selectionStart;
      // console.log(index);
      let character = crdt.list.splice(index, 1)[0];
      console.log(generateString(crdt.list));

      socket.emit("delete", {room, character});
    } 
    else if (event.inputType == "deleteContentForward") {
      index = editor.selectionStart;
      let character = crdt.list.splice(index, 1)[0];
      console.log(character)
      console.log(generateString(crdt.list));

      socket.emit("delete", {room, character});
    }
  });

  socket.on("initiation", function(list) {
    crdt.list = list;
    editor.value = generateString(crdt.list);
    autosize.update(document.querySelector('textarea'))
  });

  socket.on("insertFirst", function(character) {
    crdt.list.push(character);
    editor.value = generateString(crdt.list);
    editor.setSelectionRange(0, 0);
  });

  socket.on("insert", function(data) {
    let caret = editor.selectionStart;
    let index;
    for (let i = 0; i < crdt.list.length; i++) {
      // if(isEqual(crdt.list[i], data.position)) index = i;
      if(!data.position){
        index = -1
      }
      else if (
        crdt.list[i].siteId == data.position.siteId &&
        crdt.list[i].count == data.position.count &&
        crdt.list[i].value == data.position.value
      )
        index = i;
    }
    crdt.list.splice(index + 1, 0, data.character);
    editor.value = generateString(crdt.list);
    if (caret > index) {
      editor.setSelectionRange(caret + 1, caret + 1);
    } else {
      editor.setSelectionRange(caret, caret);
    }
    console.log(generateString(crdt.list));
  });

  socket.on("delete", function(character) {
    let caret = editor.selectionStart;
    let index;
    for (let i = 0; i < crdt.list.length; i++) {
      // if(isEqual(crdt.list[i], character)) index = i;
      if (
        crdt.list[i].siteId == character.siteId &&
        crdt.list[i].count == character.count &&
        crdt.list[i].value == character.value
      ) {
        index = i;
      }
    }
    if (index != null) crdt.list.splice(index, 1);
    editor.value = generateString(crdt.list);
    if (caret > index) {
      editor.setSelectionRange(caret - 1, caret - 1);
    } else {
      editor.setSelectionRange(caret, caret);
    }
    console.log(generateString(crdt.list));
  });

  socket.on("refresh", function() {
    crdt.list = [];
    count = 0;
    editor.value = "";
  });
});

const generateString = list => {
  let string = "";
  for (let i = 0; i < list.length; i++) {
    string += list[i].value;
  }
  return string;
};

function Refresh(){
  console.log('refreshed')
  socket.emit('refresh', {room})
}


autosize(document.querySelector('textarea'));

if(document.querySelector('#name').innerText == ""){
  document.querySelector('#name').innerText = room
}