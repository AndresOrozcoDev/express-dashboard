const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const filesRoutes = require('./routes/files');

// Configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Information',
    },
    servers: [
      {
        url: 'http://localhost:80',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configuración de rutas
app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/', filesRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));