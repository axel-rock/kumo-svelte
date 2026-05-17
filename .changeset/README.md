# Changesets

This repo uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelog entries.

## When is a changeset required?

| Package source                          | Changeset Required?            | Why                               |
| --------------------------------------- | ------------------------------ | --------------------------------- |
| `packages/kumo-svelte/`, `pnpm-lock.yaml` | **Yes** (enforced by pre-push) | Published to npm as `kumo-svelte` |

The pre-push hook (`lefthook.yml`) **only enforces** changesets for package source changes.

### How `pnpm changeset version` works

When you run `pnpm changeset version`, it updates the `kumo-svelte` package version based on changeset entries.

## Creating a changeset

```bash
pnpm changeset
```

Then:

- Select the package(s) you changed
- Choose the appropriate bump type (patch/minor/major)
- Write a short description of why the change matters

Commit the generated `.md` file in this folder.

## Why this file exists

If `.changeset/config.json` is missing, `pnpm changeset` fails with an `ENOENT` error. Keeping the config committed prevents that.
