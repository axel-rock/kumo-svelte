#!/bin/bash
set -euo pipefail

# Kumo Svelte Staging Deployment Script
# Deploys the Worker to staging on merge to main

echo "Starting kumo-svelte staging deployment..."

# Verify Cloudflare credentials
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required"
  exit 1
fi

echo "Building kumo-svelte..."
pnpm build

echo "Deploying to staging..."
pnpm --filter kumo-svelte exec wrangler deploy --env staging

echo "Kumo Svelte staging deployment complete!"
