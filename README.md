# Catalog Provider

Standalone Pact provider repository that verifies contracts for `ProductCatalogService`.

## Scripts

- `npm start` – run the catalog API locally on port `4001`.
- `npm test` / `npm run test:provider` – execute Pact provider verification tests located inside `__tests__/`.

## Local Verification Flow

1. Pull the latest pact JSONs from the contracts repository into `pacts/`. The GitHub workflow handles this automatically, but locally you can clone `contracts-repo` and copy `pacts/catalog-service/*.json` into this directory.
2. Install dependencies with `npm install`.
3. Run `npm test`.

## Required GitHub Secrets

| Secret | Purpose |
| --- | --- |
| `CONTRACT_PAT` | Personal access token with `repo` scope used to fetch the contracts repository PR branch created by consumer workflows. |
| `STATUS_PAT` | Personal access token used to publish commit status updates back to the originating consumer repository. |

## Automation Overview

Consumer repositories fire a `repository_dispatch` event (`verify-pact`) that includes the contracts PR branch and consumer commit SHA. The workflow defined in `.github/workflows/pact-provider.yml` pulls those contracts, runs verification, and posts the outcome back to the consumer commit.
