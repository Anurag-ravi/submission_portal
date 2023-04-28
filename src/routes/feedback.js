const express = require('express');
const feedbackController = require('../controllers/feedback');
const router = express.Router();
const { userMiddleware } = require('../middlewares/user');

router.post('/:submission_id',userMiddleware, feedbackController.createFeedback);
router.get('/:submission_id', feedbackController.getFeedback);
router.patch('/:submission_id', feedbackController.updateFeedback);

module.exports = router;