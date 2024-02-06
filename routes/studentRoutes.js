const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
router.post('/', studentController.addStudent);
router.put('/:_id', studentController.updateStudent);
router.get('/', studentController.getAllStudents);
router.get('/:_id', studentController.getOneStudent);
router.delete('/:_id', studentController.deleteStudent);
router.get('/token/:_id',studentController.token_generation);
router.get('/verify/:token',studentController.verifying);
router.post('/auth',studentController.user_authentication);
router.post('/profile_by_token',studentController.get_profile_by_token);
module.exports = router;

 