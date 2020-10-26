import * as express from "express";
const swaggerRouter = express.Router();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default swaggerRouter;