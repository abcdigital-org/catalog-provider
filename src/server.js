'use strict';

const express = require('express');
const repository = require('./productRepository');

const DEFAULT_PORT = process.env.PORT ? Number(process.env.PORT) : 4001;

const createServer = () => {
  const app = express();

  app.get('/products', (req, res) => {
    res.json(repository.getAll());
  });

  app.get('/products/:id', (req, res) => {
    const product = repository.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  });

  return app;
};

const start = (port = DEFAULT_PORT) =>
  new Promise((resolve) => {
    repository.reset();
    const app = createServer();
    const server = app.listen(port, () => {
      resolve({ app, server });
    });
  });

if (require.main === module) {
  start().then(({ server }) => {
    const address = server.address();
    const boundPort = typeof address === 'string' ? address : address.port;
    process.stdout.write(`Provider API running on port ${boundPort}\n`);
  });
}

module.exports = {
  createServer,
  start,
  DEFAULT_PORT,
};
