const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'ExpressJS',
      version: '0.1.0',
      description: 'HTTP services for managing and administering FILES and COUNTRIES.',
      contact: {
        name: 'Andres Orozco',
        email: 'andres.orozco.dev@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Local server',
      },
    ],
    tags: [
      {
        name: 'default',
        description: 'Endpoints for the index routes',
      },
      {
        name: 'files',
        description: 'Endpoints for managing files',
      },
      {
        name: 'countries',
        description: 'Endpoints for managing countries',
      },
      {
        name: 'states',
        description: 'Endpoints for managing staes',
      },
      {
        name: 'cities',
        description: 'Endpoints for managing cities',
      }
    ],
    components: {
      schemas: {
        Response: {
          type: 'object',
          properties: {
            status_code: { type: 'integer' },
            message: { type: 'string' },
            data: { 
              type: 'array',
              items: { type: 'object' }
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
