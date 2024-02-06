
const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');

router.post('/:_id', marksController.addStudentMarks);

module.exports = router;
