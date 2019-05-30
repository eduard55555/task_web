const db = require('../models/db');
const Request = require('../models/request');

const save = (req, io) => {
  const trap_id = req.baseUrl.substr(1);

  const request = new Request({
    reqDate: new Date(),
    ip: req.connection.remoteAddress,
    scheme: req.protocol,
    method: req.method,
    body: req.body,
    queryString: req._parsedUrl.query,
    queryParams: JSON.stringify(req.query),
    cookie: req.headers.cookie,
    headers: req.headers,
    trap_id: trap_id
  });

  db.save(request)
    .then(() => io.sockets.in(trap_id).emit('messages', request))
    .catch(err => console.error(err));

  Request.find({'trap_id': trap_id}, (err, data) => {
    if (!data.length) io.emit('messagesTraps', trap_id);
  });
};

module.exports = { save };
