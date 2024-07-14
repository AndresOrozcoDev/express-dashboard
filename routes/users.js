const express = require('express');
const router = express.Router();

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get users list
 *     description: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Users list"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */


router.get('/users', (req, res) => {
  try {
    // Lógica de la ruta
    const response = {
      status_code: 200,
      message: "Users list",
      data: users
    };
    res.status(200).json(response);
  } catch (error) {
    const response = {
      status_code: 500,
      message: "Internal server error",
      data: []
    };
    res.status(500).json(response);
  }
});


module.exports = router;