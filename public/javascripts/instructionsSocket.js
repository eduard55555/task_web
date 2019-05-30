const socket = io.connect(window.location.host, {transports: ['websocket']});

socket.on('connect', () => {
  socket.emit('getTraps');
});

window.onload = () => {
  const trapTable = document.getElementById('traps');

  socket.on('messagesTraps', (trapData) => {
    log(trapData);
  });

  const log = (trapData) => {
    let row = trapTable.insertRow(1);
    let cell = row.insertCell(0);
    cell.innerHTML = trapData;
    // trapDiv.insertBefore(processDict(trapData), trapDiv.firstChild);
  }

  const processDict = (trapData) => {
    let trap = document.createElement('div')
    trap.innerText = trapData;
  
    return trap;
  };
};
