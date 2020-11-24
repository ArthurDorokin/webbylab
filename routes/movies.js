const {check, validationResult} = require('express-validator');
const express = require('express');
const controller = require('../controllers/movies');
const router = express.Router();
const upload = require('../middleware/upload');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/:file', upload.single('file'), controller.importMovie);
router.post('/', [check('ReleaseYear').isInt({min: 1850, max: 2020}).withMessage('Release Year should be between 1850 and 2020'), check('Stars').isString().withMessage('Stars should be string value'), check('Format').isIn(['DVD', 'VHS', 'Blu-Ray']).withMessage('Format should be in [\'DVD\', \'VHS\', \'Blu-Ray \']')], (req, res) => {const errors = validationResult(req); if (!errors.isEmpty()) {return res.status(422).json({errors: errors.array()})}}, controller.addMovie);
router.delete('/:id', controller.deleteMovie);

module.exports = router;