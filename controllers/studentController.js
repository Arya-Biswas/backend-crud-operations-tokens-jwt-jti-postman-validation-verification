const mongoose = require("mongoose");
const Student = require("../models/studentModel");
const studentValidationSchema = require("../validations/studentValidation");
const {generate_token} = require("../utils/tokens");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
async function addStudent(req, res) {
  try {
    const { firstName, lastName, email, dialCode, phoneNo, password } =
      req.body;
    const validationResult = studentValidationSchema.validate({
      firstName,
      lastName,
      email,
      dialCode,
      phoneNo,
      password,
    });

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.message });
    }

    const existingNum = await Student.findOne({ phoneNo });
    const existingEmail = await Student.findOne({ email });

    if (firstName === lastName) {
      return res.status(400).send("First and last name cannot be the same");
    }

    if (!existingNum && existingEmail) {
      return res
        .status(409)
        .send(
          `Given email ${existingEmail.email} already exists. Please provide another email.`
        );
    } else if (existingNum && !existingEmail) {
      return res
        .status(409)
        .send(
          `Given phone number ${existingNum.phoneNo} already exists. Please register with another number.`
        );
    } else if (!existingNum && !existingEmail) {
      await Student.create(req.body);
      return res
        .status(201)
        .json({
          success: true,
          message: "Student added successfully",
          Student,
        });
    } else {
      return res.status(409).send("Credentials already exist in our database");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || error });
  }
}

async function updateStudent(req, res) {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid object_id format" });
  }

  const { email } = req.body;

  try {
    const existingStudent = await Student.findOne({ _id });

    if (existingStudent) {
      Student.findOneAndUpdate({ email: email });
      return res
        .status(200)
        .json({ message: "Student updated successfully", Student });
    } else {
      return res
        .status(404)
        .json({ error: "Student not found with the given _id" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}

async function getAllStudents(req, res) {
  let data = await Student.find();
  res.status(200).json(data);
}

async function getOneStudent(req, res) {
  try {
  const _id=req.params._id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid object_id format" });
  }

    const foundStudent = await Student.findOne({ _id });

    if (foundStudent) {
      return res.status(200).json(foundStudent);
    } else {
      return res
        .status(400)
        .json({ error: `Student not found with the given _id ${_id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}

async function deleteStudent(req, res) {
  const _id = req.params._id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: "Invalid object_id format" });
  }

  try {
    const existingStudent = await Student.findOneAndDelete({ _id });

    if (existingStudent) {
      Student.findOneAndDelete({ _id });
      return res
        .status(200)
        .json({ message: "Student deleted successfully", Student });
    } else {
      return res
        .status(404)
        .json({ error: `Student not found with the given _id ${_id}` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function token_generation(req, res) {
  try {
    const { _id } = req.params;  
     
     
    let student = await Student.findOne({ _id });

 
    if (!student) {
      return res.status(404).json({ error: "_id not found" });
    } 
    else {
       
      const jti = uuidv4();
      
     
      const payload = {
        _id: student._id,
        role: "user", 
        jti: jti 
      };

    
      const token =await  generate_token(payload);
console.log(token);
       
     return  res.status(200).send(token);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function user_authentication(req, res) {
  try {
    console.log("Starting authentication");
    const { email, password } = req.body;

     
    const user = await Student.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }else{
    console.log("Authentication successful");
    return res.status(200).json({ success: true, message: "Authentication successful", user });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function verifying(req, res) {
  try {
    const secret_key = "Arya@2001";
    const token = req.params.token;

    const decoded = await jwt.verify(token, secret_key);
    console.log(decoded,"decoded")
    const email = decoded.email;
    const password = decoded.password;
    console.log(email,"hey",password);
    return res.status(200).send({ email: email, password: password });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function get_profile_by_token(req, res) {
  try {
    const secret_key = "Arya@2001";
    const { token } = req.body;

    const decoded = jwt.verify(token, secret_key);
    console.log(decoded);
    const {_id} = decoded;

    const user = await Student.findById(_id);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User found");
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  addStudent,
  updateStudent,
  getAllStudents,
  getOneStudent,
  deleteStudent,
  token_generation,
  user_authentication,
  verifying,
  get_profile_by_token
};
