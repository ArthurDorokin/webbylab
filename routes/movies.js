const express = require('express');
const controller = require('../controllers/movies');
const router = express.Router();
const upload = require('../middleware/upload');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/',upload.single('file'), controller.importMovie);
module.exports = router;