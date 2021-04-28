const express = require('express');
const HistoryYmlController = require('../controllers/history-yml-controller');


const router = express.Router();

router.post('/upload', HistoryYmlController.uploadYml);

module.exports = router;
