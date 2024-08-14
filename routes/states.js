const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');

// Ruta al archivo JSON
const jsonFilePath = path.join(__dirname, '..', 'mocks', 'states.json');

// Función para cargar el archivo JSON
const loadStates = () => {
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
 * /states:
 *   get:
 *     summary: Get states list
 *     description: Retrieve a paginated list of states
 *     tags: [states]
 *     responses:
 *       '200':
 *         description: Lista de estados obtenida exitosamente.
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
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: '001'
 *                       state:
 *                         type: string
 *                         example: 'California'
 *       '500':
 *         description: Error al cargar los estados.
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
 *                   example: Error loading states
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       state:
 *                         type: string
 * 
 * /cities/{id}:
 *   get:
 *     summary: Get cities list by state code
 *     description: Retrieve a paginated list of cities for a given state
 *     tags: [cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del estado para el cual se desean obtener las ciudades.
 *     responses:
 *       '200':
 *         description: Lista de ciudades obtenida exitosamente.
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
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: '1001'
 *                       city:
 *                         type: string
 *                         example: 'Los Angeles'
 *       '500':
 *         description: Error al cargar las ciudades.
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
 *                   example: Error loading cities
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       city:
 *                         type: string
 */


// Ruta GET con los states
router.get('/states', async (req, res) => {
    try {
        const municipios = await loadStates();
        const states = municipios.data.map(item => ({ id: item.state_dane_id, state: item.state }));
        res.json({
            status_code: 200,
            message: "success",
            data: states
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error loading states',
            data: []
        });
    }
});

// Ruta GET con el parámetro id del estado
router.get('/cities/:id', async (req, res) => {
    const stateId = req.params.id;
    try {
        const municipios = await loadStates();
        const cities = municipios.data.filter(item => item.state_dane_id === stateId).map(item => ({ id: item.city_dane_id, city: item.city }));
        res.json({
            status_code: 200,
            message: "success",
            data: cities
        });
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: 'Error loading states',
            data: []
        });
    }
});

module.exports = router;