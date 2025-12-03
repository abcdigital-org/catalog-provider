'use strict';

const fs = require('fs');
const path = require('path');
const { Verifier } = require('@pact-foundation/pact');
const { start, DEFAULT_PORT } = require('../src/server');
const stateHandlers = require('../src/stateHandlers');

const pactDir = path.resolve(process.cwd(), 'pacts');

const catalogPacts = () =>
  fs
    .readdirSync(pactDir)
    .filter((file) => file.endsWith('-CatalogService.json'))
    .map((file) => path.join(pactDir, file));

describe('Catalog provider Pact verification', () => {
  let serverInstance;

  beforeAll(async () => {
    serverInstance = await start(DEFAULT_PORT);
  });

  afterAll(async () => {
    if (serverInstance && serverInstance.server) {
      await new Promise((resolve, reject) => {
        serverInstance.server.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  });

  it('satisfies all consumer expectations for CatalogService', async () => {
    const pactFiles = catalogPacts();

    if (pactFiles.length === 0) {
      throw new Error('No pact files found for CatalogService. Ensure consumer workflow attached pact artifacts.');
    }

    const verifier = new Verifier({
      provider: 'CatalogService',
      logLevel: 'info',
      providerBaseUrl: `http://localhost:${DEFAULT_PORT}`,
      pactUrls: pactFiles,
      stateHandlers,
    });

    await verifier.verifyProvider();
  });
});
