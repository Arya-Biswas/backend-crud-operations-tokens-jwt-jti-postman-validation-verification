const Student = require('../models/studentModel.js');  
const Marks = require('../models/marksModel.js');  
const marksValidationSchema=require('../validations/marksValidation.js');
const mongoose=require('mongoose');
async function addStudentMarks(req, res) {
  const _id = req.params._id;

  try {
    const { subject, marks } = req.body;
    const validationResult = marksValidationSchema.validate({ subject, marks });

    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid object_id format" });
    }

    if (!subject || !marks) {
      return res.status(400).json({ message: "Invalid subject or marks" });
    }

    const existingStudent = await Student.findById(_id);

    if (!existingStudent) {
      return res.status(404).json({ error: "Student not found with the given _id" });
    }

    const newMarks = new Marks({
      subject,
      marks,
      studentId: existingStudent._id,
    });

    await newMarks.save();

    return res.status(201).json({ message: "Marks added successfully", newMarks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addStudentMarks,
};
