const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /:
 *   get:
 *     summary: Read Root
 *     operationId": read_root__get
 *     description: Returns a welcome message
 *     tags: [default]
 *     responses:
 *       200:
 *         description: Successful Response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Hello World from ExpressJS
 */
router.get('/', (req, res) => {
  res.send('Hello World from ExpressJS');
});

module.exports = router;