const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Root
 *     description: Returns a welcome message
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

module.exports = router;