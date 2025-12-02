'use strict';

const repository = require('./productRepository');

const baseProducts = [...repository.seededProducts];

module.exports = {
  'products exist': async () => {
    repository.setProducts(baseProducts);
  },
  'product with ID 2 exists': async () => {
    repository.setProducts(baseProducts);
  },
  'product with ID 999 does not exist': async () => {
    repository.setProducts(baseProducts.filter((product) => product.id !== 999));
  },
};
