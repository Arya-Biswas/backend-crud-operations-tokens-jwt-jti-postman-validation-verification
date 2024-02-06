const mongoose = require('mongoose');

const marksSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  marks:
  {type: Number,
    required:true},
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
