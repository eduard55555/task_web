const socket = io.connect(window.location.host, {transports: ['websocket']});
const trap_id = window.location.pathname.match(/\w+/)[0];

socket.on('connect', () => {
  socket.emit('getRequests', trap_id);
});

window.onload = () => {
  const requestsDiv = document.getElementById('requests');
  setTrap_id(trap_id);

  socket.on('messages', (requestData) => {
    log(requestData);
  });

  const log = (requestData) => {
    requestsDiv.insertBefore(processDict(requestData), requestsDiv.firstChild);
  }

  const processDict = (requestData) => {
    let request = document.createElement('div')
    request.className = 'container-fluid request';

    Object.keys(requestData).map((field) => {
      request.appendChild(createDiv(field, requestData[field]));
    });
    
    return request;
  };

  const createDiv = (field, value) => {
    let newDiv = document.createElement('div');
    newDiv.className = 'row';
    let fieldName = document.createElement('div');
    let fieldValue = document.createElement('div');

    fieldName.innerText = `${field}: `;
    fieldName.className = 'col-sm-2 fieldName';
    
    fieldValue.innerText = value;
    fieldValue.className = 'col-sm-10';

    if(['headers', 'body'].includes(field)) {
      fieldValue = processDict(value)
      fieldValue.className = 'col-sm-10 container';
    };

    newDiv.appendChild(fieldName);
    newDiv.appendChild(fieldValue);

    return newDiv;
  };
};

const setTrap_id = (trap_id) => {
  const trap_idDiv = document.getElementById('trap_id');
  trap_idDiv.innerText = trap_id;
};
