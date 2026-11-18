# AreBelong roster

**One JSON file. An open character roster.**

[AreBelong](https://www.arebelong.com) is building a MOBA and sharing its characters
for creators to download and use with credit. This repository is where you can
propose new characters and improvements to existing ones.

## Make a contribution

1. Publish and pin your character package to IPFS, with `manifest.json` at its root.
2. Fork this repository. Edit **[roster.json](roster.json)** to add a hero ID and
   package CID, or replace the CID for an existing hero.
3. Open a pull request to `main` with a summary, asset authors/credit, reuse terms
   and known limitations. A maintainer reviews the package before merging.

Read **[the contribution guide](CONTRIBUTING.md)** for the full process and
**[the package reference](PACKAGE.md)** for the content the website understands.

`heroes` order controls the gallery and inspector. `featured` selects three
curated homepage heroes. The most recently appended hero appears first as
**Latest arrival**. Each appears once, for up to four stages. Append new hero IDs
and update revised CIDs in place. Character assets and metadata live in IPFS.
The schema is [roster.schema.json](roster.schema.json).

## Validate locally

Use Node 24; there are no dependencies to install:

```sh
node scripts/validate-roster.mjs
node --test test/*.test.mjs
```

GitHub Actions runs these checks on pull requests and pushes to `main`. These are
offline checks; reviewers also verify the IPFS package and asset reuse terms.

## Website publication

The site uses a reviewed snapshot of this repository. After merge, a maintainer
imports the commit and deploys the website. A merge does not publish immediately.
See the [deployed roster](https://www.arebelong.com/roster.json) and its
[source commit record](https://www.arebelong.com/roster-source.json).

Individual assets retain their authorship and package-specific reuse terms.
Submitting a CID does not transfer ownership or establish rights to third-party assets.
