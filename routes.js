const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('*', function(req, res) {
	res.send("hi");
});
module.exports = router;
