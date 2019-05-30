const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  reqDate: Date,
  ip: String,
  scheme: String,
  method: String,
  body: Object,
  queryString: String,
  queryParams: Object,
  cookie: String,
  headers: Object,
  trap_id: { 
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Request', requestSchema);
