// Importa Express y el sistema de archivos (fs)
const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

// Ruta al archivo JSON
const jsonFilePath = path.join(__dirname, '..', 'mocks', 'countries.json');

// Función para cargar el archivo JSON
const loadCountries = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(jsonFilePath, 'utf8', (err, jsonData) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(jsonData));
      }
    });
  });
};


/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Get countries list
 *     description: Retrieve a paginated list of countries
 *     tags: [countries]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of countries per page.
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *           example: 10
 *     responses:
 *       '200':
 *         description: Successful response with the paginated list of countries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Country ID.
 *                       name:
 *                         type: string
 *                         description: Country name.
 *                 status_code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of items available.
 *               required:
 *                 - data
 *                 - status_code
 *                 - message
 *                 - totalItems
 *       '400':
 *         description: Invalid request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalItems:
 *                   type: integer
 *                   description: Always zero on error.
 *               required:
 *                 - status_code
 *                 - message
 *                 - data
 *                 - totalItems
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: integer
 *                   description: HTTP status code.
 *                 message:
 *                   type: string
 *                   description: Response message.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 totalItems:
 *                   type: integer
 *                   description: Always zero on error.
 *               required:
 *                 - status_code
 *                 - message
 *                 - data
 *                 - totalItems
 */


// Ruta GET con paginación
router.get('/countries', async (req, res) => {
    try {
      const countries = await loadCountries();
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
  
      // Calcular los índices para la paginación
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
  
      // Obtener los datos para la página actual
      const resultCountries = countries.slice(startIndex, endIndex);
  
      // Crear la respuesta
      const response = {
        data: resultCountries,
        status_code: 200,
        message: 'Success',
        totalItems: countries.length
      };
  
      // Enviar la respuesta
      res.json(response);
    } catch (err) {
      res.status(500).json({
        status_code: 500,
        message: err.message,
        data: [],
        totalItems: 0
      });
    }
  });

module.exports = router;