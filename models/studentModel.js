const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  firstName:  { 
   type: String,
  required: true
},
  lastName:{ 
    type: String,
   required: true
 },
  email:{ 
    type: String,
   required: true
 },
  dialCode: { 
    type: String,
   required: true
 },
  phoneNo:{ 
    type: Number,
   required: true
 },
 password:{
  type: String,
  required: true
 }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
