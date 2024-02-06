 const express = require('express');
const mongoose = require('mongoose');
const server = express();
server.use(express.json());

mongoose.connect("mongodb://localhost:27017/mondaytask");


 
const studentRoutes = require('./routes/studentRoutes');
const marksRoutes = require('./routes/marksRoutes');
 
server.use( '/student',studentRoutes); //or server.use(middleware)
server.use('/marks', marksRoutes);//server.use(path,middleware) 

const port = 2001;
server.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
