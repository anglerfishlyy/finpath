const express = require('express');
const router = express.Router();
const {
  createUser,
  getUser,
  updateUser
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/:firebaseUid', getUser);
router.put('/:firebaseUid', updateUser);

module.exports = router; 