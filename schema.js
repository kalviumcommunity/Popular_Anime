const mongoose = require('mongoose')

const data = new mongoose.Schema({
    anime: {
        type: String,
        required: true
      },
      authorname: {
        type: String,
        required: true
      },
      start_date: {
        type: String,
        required: false
      },
      theme: {
        type: String,
        required: true
      },
      character: {
        type: String,
        required: true
      },
      image_url: {
        type: String,
        required: false
      }
});
const dataSet = mongoose.model('dataSet',data);
module.exports=dataSet;