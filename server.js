
global.__basedir = __dirname;

const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const filesRoutes = require('./routes/files');
const countriesRoutes = require('./routes/countries');

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

// Configurar CORS para permitir solicitudes desde http://localhost:4200
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000'], // Permitir solo este origen
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Encabezados permitidos
};

app.use(cors(corsOptions));

// Tu middleware y rutas
app.use(express.json());

// Manejar solicitudes preflight
app.options('*', cors(corsOptions));

// Configuración de rutas
app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/', filesRoutes);
app.use('/', countriesRoutes);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));