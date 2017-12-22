import express from 'express';

import middleware from './middleware.mjs';
import routes from './routes.mjs';

const server = express();

server.use(middleware());
server.use(routes);

export default server;
