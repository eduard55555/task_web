const mongoose = require('mongoose');

const save = (model) => {
  mongoose.Promise = global.Promise;

  return model.save()
    .then(() => {
      console.log('Saved');
    })
    .catch((err) => {
      if(err.name === 'MongoError' && err.code === 11000) return;
      console.log(err);
      return err;
    });
};

module.exports = { save };