
global.__basedir = __dirname;


const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const indexRoutes = require('./routes/index');
const filesRoutes = require('./routes/files');
const countriesRoutes = require('./routes/countries');
const swaggerDocs = require('./swagger');


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get('/openapi.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});


const corsOptions = {
  origin: ['http://localhost:4200','http://localhost:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};


app.use(cors(corsOptions));
app.use(express.json());
app.options('*', cors(corsOptions));


app.use('/', indexRoutes);
app.use('/', filesRoutes);
app.use('/', countriesRoutes);


const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  console.log(`OpenAPI JSON available at http://localhost:${PORT}/openapi.json`);
});