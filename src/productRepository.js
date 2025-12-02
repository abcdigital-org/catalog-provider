'use strict';

let seededProducts = [
  {
    id: 1,
    name: 'Coffee Machine',
    description: 'Freshly brewed coffee every morning',
    price: 3199.999,
    inStock: true,
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    description: 'Noise cancelling over-ear headphones',
    price: 3249.5,
    inStock: true,
  },
];

let products = [...seededProducts];

const getAll = () => products;

const getById = (id) => products.find((product) => product.id === Number(id)) || null;

const setProducts = (nextProducts) => {
  products = [...nextProducts];
};

const reset = () => {
  products = [...seededProducts];
};

module.exports = {
  getAll,
  getById,
  setProducts,
  reset,
  seededProducts,
};
